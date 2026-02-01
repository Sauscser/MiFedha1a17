/* Amplify Params - DO NOT EDIT
    API_MIFEDHA1A_GRAPHQLAPIENDPOINTOUTPUT
    API_MIFEDHA1A_GRAPHQLAPIIDOUTPUT
    API_MIFEDHA1A_NOTIFICATIONTABLE_ARN
    API_MIFEDHA1A_NOTIFICATIONTABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const secretsManager = new AWS.SecretsManager();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getFirebaseCredentials() {
  const secretName = "MiFedhaRidesKey";
  console.log("Fetching Firebase credentials from Secrets Manager:", secretName);

  const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();

  if ('SecretString' in data) {
    console.log("Firebase credentials retrieved successfully (SecretString).");
    return JSON.parse(data.SecretString);
  } else {
    console.log("Firebase credentials retrieved successfully (SecretBinary).");
    const buff = Buffer.from(data.SecretBinary, 'base64');
    return JSON.parse(buff.toString('ascii'));
  }
}

exports.handler = async (event) => {
  try {
    console.log("Incoming event:", JSON.stringify(event, null, 2));

    // 1. Retrieve Firebase credentials
    let firebaseCreds = await getFirebaseCredentials();
    if (typeof firebaseCreds["mifedha/FirebaseServiceAccount"] === "string") {
      console.log("Secret appears double-encoded, parsing inner string...");
      firebaseCreds = JSON.parse(firebaseCreds["mifedha/FirebaseServiceAccount"]);
    }

    // 2. Get riderEmail and notification details
    const riderEmail = event.arguments?.riderEmail;
    const title = event.arguments?.title || "MiFedha Notification";
    const body = event.arguments?.body || "";
    if (!riderEmail) throw new Error("Missing riderEmail");

    // 3. Query DynamoDB for FCM token
    const tableName = process.env.API_MIFEDHA1A_NOTIFICATIONTABLE_NAME;
    const result = await dynamoDB.get({
      TableName: tableName,
      Key: { awsemail: riderEmail }
    }).promise();

    const fcmToken = result.Item?.firebaseKey;
    if (!fcmToken) throw new Error("No FCM token found for rider");

    // 4. Generate access token
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: firebaseCreds.client_email,
      scope: "https://www.googleapis.com/auth/firebase.messaging",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600
    };
    const privateKey = firebaseCreds.private_key.replace(/\\n/g, '\n');
    const jwtToken = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    const res = await axios.post("https://oauth2.googleapis.com/token", {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwtToken
    });
    const accessToken = res.data.access_token;

    // 5. Send notification via FCM (include both notification + data)
    const message = {
      message: {
        token: fcmToken,
        notification: { title, body },
        data: {
          title,
          body,
          riderEmail
        }
      }
    };

    console.log("Sending FCM message:", JSON.stringify(message, null, 2));

    await axios.post(
      `https://fcm.googleapis.com/v1/projects/${firebaseCreds.project_id}/messages:send`,
      message,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    console.log("Notification sent successfully to:", riderEmail);
    return { success: true, message: "Notification sent successfully" };
  } catch (err) {
    console.error("Error sending notification:", err);
    return { success: false, error: err.message };
  }
};