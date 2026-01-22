import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Linking,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { API, graphqlOperation, Auth } from "aws-amplify";
import {
  BytransprtOwnrEmail,
  getSMAccount,
  getTransportOrder,
} from "../../../src/graphql/queries";
import { getDistance } from 'geolib';
import {
  updateSMAccount,
  updateTransportOrder,
} from "../../../src/graphql/mutations";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const TransportMapScreen = () => {
  const [registerData, setRegisterData] = useState([]);
  const [transporterCoords, setTransporterCoords] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [loadingType, setLoadingType] = useState<"accept" | "view" | null>(null);
  const [distanceMeters, setDistanceMeters] = useState<number>(0);

  const navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    fetchRegisterData();
    getTransporterLocation();
    const interval = setInterval(getTransporterLocation, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchRegisterData = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser();
      const res = await API.graphql(
        graphqlOperation(BytransprtOwnrEmail, {
          transportOwnerEmail: userInfo.attributes.email,
          sortDirection: "DESC",
          filter: { transportRequest: { eq: "transportRequestYes" },
      },
        })
      );
      setRegisterData(res.data.BytransprtOwnrEmail.items);
    } catch (error) {
      console.error("Error fetching transport registers:", error);
    }
  };

  const getTransporterLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "Location permission is required.");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setTransporterCoords(location.coords);
  };

  const handleAcceptDelivery = async (item) => {
    setLoadingItemId(item.id);
    setLoadingType("accept");
    try {
      const user = await Auth.currentAuthenticatedUser();
      const orderDtlRes = await API.graphql(graphqlOperation(getTransportOrder, { id: item.id }));
      const orderDtlz = orderDtlRes.data.getTransportOrder;

      if (item.engagementStatus === "TransportEngaged") {
        Alert.alert("Error", "This delivery has already been accepted.");
        return;
      }

      const userDtlsRes = await API.graphql(graphqlOperation(getSMAccount, { awsemail: user.attributes.email }));
      const userDtlsz = userDtlsRes.data.getSMAccount;

      const buyerDtlsRes = await API.graphql(graphqlOperation(getSMAccount, { awsemail: item.customerEmail }));
      const buyerDtlsz = buyerDtlsRes.data.getSMAccount;

      const orderCost = parseFloat(orderDtlz.orderCost);
      const deliveryCost = parseFloat(orderDtlz.deliveryCost);
      const userBalance = parseFloat(userDtlsz.balance);
      const buyerBalance = parseFloat(buyerDtlsz.balance);

let computedDistance = 0;

if (
  orderDtlz.sellerLatitude &&
  orderDtlz.sellerLongitude &&
  orderDtlz.deliveryLatitude &&
  orderDtlz.deliveryLongitude &&
  !isNaN(Number(orderDtlz.sellerLatitude)) &&
  !isNaN(Number(orderDtlz.sellerLongitude)) &&
  !isNaN(Number(orderDtlz.deliveryLatitude)) &&
  !isNaN(Number(orderDtlz.deliveryLongitude))
) {
  const rawDistance = getDistance(
    {
      latitude: Number(orderDtlz.sellerLatitude),
      longitude: Number(orderDtlz.sellerLongitude),
    },
    {
      latitude: Number(orderDtlz.deliveryLatitude),
      longitude: Number(orderDtlz.deliveryLongitude),
    }
  );
  setDistanceMeters(rawDistance);
  computedDistance = rawDistance / 1000; // convert to km
}


      if (deliveryCost > buyerDtlsz.balance) {
        Alert.alert("Sorry", "The buyer cannot cover the delivery cost.");
        return;
      } 

     

                  else if (orderDtlz.customerEmail === user.attributes.email)
                  {
                    Alert.alert("Sorry", "You cannot be the client and the transporter.");
                    return;
                  }
      
      else if (orderCost > userBalance) {
        navigation.navigate("ViewChama2CommitTransport", { id: item.id });
        return;
      }

      // Deduct balances
      await API.graphql(graphqlOperation(updateSMAccount, {
        input: {
          awsemail: user.attributes.email,
          balance: userBalance - orderCost,
        },
      }));

      await API.graphql(graphqlOperation(updateSMAccount, {
        input: {
          awsemail: item.customerEmail,
          balance: buyerBalance - deliveryCost,
        },
      }));

      // Update order
      const updateResult = await API.graphql(graphqlOperation(updateTransportOrder, {
        input: {
          id: item.id,
          engagementStatus: "TransportEngaged",
          UsrAcCommitment: orderDtlz.orderCost,
          deliveryStart: Date.now(),
          distance: computedDistance
        },
      }));

      if (updateResult?.data?.updateTransportOrder) {
        Alert.alert("Success", "Delivery accepted!");
        Linking.openURL(`sms:${orderDtlz.buyerContact}?body=${encodeURIComponent(
          `${orderDtlz.transportName} has accepted your transport request from ${orderDtlz.sellerName}. You may contact them through ${orderDtlz.transportkntct}`
        )}`);
      }

      fetchRegisterData(); // refresh list
    } catch (err) {
      console.error("Accept error:", err);
      Alert.alert("Error", "Could not accept delivery.");
    } finally {
      setLoadingItemId(null);
      setLoadingType(null);
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
    const item = registerData[index];
    if (item) {
      mapRef.current?.animateToRegion({
        latitude: Number(item.deliveryLatitude),
        longitude: Number(item.deliveryLongitude),
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }, 1000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!transporterCoords ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#e58d29" />
          <Text style={{ marginTop: 10 }}>Getting your location...</Text>
        </View>
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: transporterCoords.latitude,
            longitude: transporterCoords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker
            coordinate={transporterCoords}
            title="You (Transporter)"
            pinColor="green"
          />
          {registerData.map((item) => (
            <React.Fragment key={item.id}>
              <Marker
                coordinate={{
                  latitude: Number(item.sellerLatitude),
                  longitude: Number(item.sellerLongitude),
                }}
                title={`Seller: ${item.sellerName}`}
                pinColor="blue"
              />
              <Marker
                coordinate={{
                  latitude: Number(item.deliveryLatitude),
                  longitude: Number(item.deliveryLongitude),
                }}
                title={`Buyer: ${item.buyerName}`}
                pinColor="orange"
              />
            </React.Fragment>
          ))}
        </MapView>
      )}

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <FlatList
          horizontal
          pagingEnabled
          data={registerData}
          keyExtractor={(item) => item.id}
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={[styles.card, index === activeIndex && styles.activeCard]}>
              <Text style={styles.cardTitle}>
                {item.sellerName} to {item.buyerName} || Aerial Distance: {item.distance} Km ||
                Ksh. {item.orderCost} || Contact: {item.buyerContact} || {item.transportRequest} 
                || {item.engagementStatus}
              </Text>
              <Text numberOfLines={2} ellipsizeMode="tail">
                Order Description: {item.deliveryDesc}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    setLoadingItemId(item.id);
                    setLoadingType("accept");
                    handleAcceptDelivery(item);
                  }}
                  style={[
                    styles.acceptBtn,
                    { opacity: loadingItemId === item.id && loadingType === "accept" ? 0.7 : 1 },
                  ]}
                  disabled={loadingItemId === item.id && loadingType === "accept"}
                >
                  {loadingItemId === item.id && loadingType === "accept" && (
                    <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
                  )}
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {loadingItemId === item.id && loadingType === "accept" ? "Processing..." : "Accept Delivery"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setLoadingItemId(item.id);
                    setLoadingType("view");
                    navigation.navigate("VwTransprtReqDtls", { id: item.id });
                    setLoadingItemId(null);
                    setLoadingType(null);
                  }}
                  style={[
                    styles.acceptBtn,
                    { opacity: loadingItemId === item.id && loadingType === "view" ? 0.7 : 1 },
                  ]}
                  disabled={loadingItemId === item.id && loadingType === "view"}
                >
                  {loadingItemId === item.id && loadingType === "view" && (
                    <ActivityIndicator size="small" color="#fff" style={{ marginRight: 6 }} />
                  )}
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {loadingItemId === item.id && loadingType === "view" ? "Processing..." : "View Details"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = {
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    position: "absolute",
    bottom: 60,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 10,
    width: screenWidth * 0.9,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    padding: 10,
  },
  activeCard: {
    borderColor: "#e58d29",
    borderWidth: 2,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  acceptBtn: {
    backgroundColor: "#e58d29",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
};

export default TransportMapScreen;
