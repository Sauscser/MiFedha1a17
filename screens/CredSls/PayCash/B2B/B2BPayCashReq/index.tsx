import React, { useEffect, useState } from 'react';
import Communications from 'react-native-communications';
import { createBizSlsReq } from '../../../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listPersonels, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
const client = generateClient();
const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
  const [amounts, setAmount] = useState("");
  const [Desc, setDesc] = useState("");
  const [AttendAdmin, setAttendAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps");
  };
  const fetchSenderUsrDtls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const accountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: SenderNatId
        }
      });
      const SenderUsrBal = accountDtl.data.getBizna.netEarnings;
      const bizBeneficiaryz = accountDtl.data.getBizna.bizBeneficiary;
      const SenderbizType = accountDtl.data.getBizna.bizType;
      const name = accountDtl.data.getBizna.busName;
      const ownerz = accountDtl.data.getBizna.owner;
      const SenderAcstatus = accountDtl.data.getBizna.status;
      const pw = accountDtl.data.getBizna.pw;
      const noBL = accountDtl.data.getBizna.noBL;
      const Admins = [accountDtl.data.getBizna.Admin1, accountDtl.data.getBizna.Admin2, accountDtl.data.getBizna.Admin3, accountDtl.data.getBizna.Admin4, accountDtl.data.getBizna.Admin5, accountDtl.data.getBizna.Admin6, accountDtl.data.getBizna.Admin7, accountDtl.data.getBizna.Admin8, accountDtl.data.getBizna.Admin9, accountDtl.data.getBizna.Admin10, accountDtl.data.getBizna.Admin11, accountDtl.data.getBizna.Admin12, accountDtl.data.getBizna.Admin13, accountDtl.data.getBizna.Admin14, accountDtl.data.getBizna.Admin15, accountDtl.data.getBizna.Admin16, accountDtl.data.getBizna.Admin17, accountDtl.data.getBizna.Admin18, accountDtl.data.getBizna.Admin19, accountDtl.data.getBizna.Admin20, accountDtl.data.getBizna.Admin21, accountDtl.data.getBizna.Admin22, accountDtl.data.getBizna.Admin23, accountDtl.data.getBizna.Admin24, accountDtl.data.getBizna.Admin25, accountDtl.data.getBizna.Admin26, accountDtl.data.getBizna.Admin27, accountDtl.data.getBizna.Admin28, accountDtl.data.getBizna.Admin29, accountDtl.data.getBizna.Admin30, accountDtl.data.getBizna.Admin31, accountDtl.data.getBizna.Admin32, accountDtl.data.getBizna.Admin33, accountDtl.data.getBizna.Admin34, accountDtl.data.getBizna.Admin35, accountDtl.data.getBizna.Admin36, accountDtl.data.getBizna.Admin37, accountDtl.data.getBizna.Admin38, accountDtl.data.getBizna.Admin39, accountDtl.data.getBizna.Admin40, accountDtl.data.getBizna.Admin41, accountDtl.data.getBizna.Admin42, accountDtl.data.getBizna.Admin43, accountDtl.data.getBizna.Admin44, accountDtl.data.getBizna.Admin45, accountDtl.data.getBizna.Admin46, accountDtl.data.getBizna.Admin47, accountDtl.data.getBizna.Admin48, accountDtl.data.getBizna.Admin49, accountDtl.data.getBizna.Admin50];
      const userInfo = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const UsrDtls: any = await client.graphql({
        query: listPersonels,
        variables: {
          filter: {
            phoneKontact: {
              eq: AttendAdmin
            },
            BusinessRegNo: {
              eq: SenderNatId
            }
          }
        }
      });
      const RecAccountDtl: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: RecNatId
        }
      });
      const RecUsrBal = RecAccountDtl.data.getBizna.netEarnings;
      const bizBeneficiary = RecAccountDtl.data.getBizna.bizBeneficiary;
      const RecBizType = RecAccountDtl.data.getBizna.bizType;
      const namess = RecAccountDtl.data.getBizna.busName;
      const RecAcstatus = RecAccountDtl.data.getBizna.status;
      const accountDtl7: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: AttendAdmin
        }
      });
      const phonecontactxsc = accountDtl7.data.getSMAccount.phonecontact;
      const namexs = accountDtl7.data.getSMAccount.name;
      const accountDtl7b: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const namezx = accountDtl7b.data.getSMAccount.name;
      const pwszsx = accountDtl7b.data.getSMAccount.pw;
      const phonecontactzx = accountDtl7b.data.getSMAccount.phonecontact;
      async function sendSMNonLn() {
        await client.graphql({
          query: createBizSlsReq,
          variables: {
            input: {
              recPhn: RecNatId,
              senderPhn: SenderNatId,
              amount: parseFloat(amounts).toFixed(0),
              description: Desc,
              RecName: namess,
              SenderName: name,
              status: "cashSales",
              owner: ownerz,
              attendingAdmin: AttendAdmin
            }
          }
        });
        Alert.alert("Request Successful");
        Communications.textWithoutEncoding(SenderNatId, 'MiFedha. Greetings ' + name + ", " + namexs + ' working at your business has requested to pay Ksh. ' + amounts + ' to ' + namess + ' business. ' + '. Please call customer care if it is not a valid transaction ' + ' as per your business policies. For clarification reach the personnel through ' + phonecontactzx + '. Thank you.');
      }

      // Conditional checks preserved
      if (RecAcstatus === "AccountInactive") {
        Alert.alert('Receiver account is inactive');
      } else if (SnderPW !== pwszsx) {
        Alert.alert('Wrong Main Account Password');
      } else if (SenderNatId === RecNatId) {
        Alert.alert('This business cannot buy from itself');
      } else if (SenderAcstatus === "AccountInactive") {
        Alert.alert('Sender account is inactive');
      } else if (UsrDtls.data.listPersonels.items.length < 1) {
        Alert.alert("You dont work here");
      } else if (!Admins.includes(AttendAdmin)) {
        Alert.alert("This Admin does not belong to this Business");
      } else {
        await sendSMNonLn();
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Retry, update app or call customer care");
    } finally {
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      setAttendAdmin("");
      setDesc("");
      setSnderPW("");
    }
  };
  return <LinearGradient colors={['#e58d29', 'skyblue']} start={[0, 0]} end={[1, 1]} style={{
    flex: 1
  }}>
                          <View style={styles.container}>
                            <ScrollView>
        
                  <View style={styles.formContainer}>
                    <TextInput placeholder="Purchasing Business Phone Number" value={SenderNatId} onChangeText={setSenderNatId} style={styles.input} editable={true}></TextInput>
                    
                    <TextInput placeholder="Selling Business Phone Number" value={RecNatId} onChangeText={setRecNatId} style={styles.input} editable={true}></TextInput>

          <TextInput placeholder="Attending Admin Email" value={AttendAdmin} onChangeText={setAttendAdmin} style={styles.input} editable={true}></TextInput>
                    
                    
                   
                 
                    <TextInput placeholder="Item/Sale Request Description" value={Desc} onChangeText={setDesc} style={styles.input} editable={true} multiline={true} // Enables multi-line input
          textAlignVertical="top">
                        
                      </TextInput>
                    
                    <TextInput placeholder="Enter Item Cost" value={amounts} onChangeText={setAmount} keyboardType={"decimal-pad"} style={styles.input} editable={true}></TextInput>
                   

                   <View style={styles.passwordContainer}>
                                                                 <TextInput placeholder="Personnel Main Account Password" style={styles.passwordInput} value={SnderPW} onChangeText={setSnderPW} secureTextEntry={!isPasswordVisible} placeholderTextColor="#ccc" />
                                                               <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                               </TouchableOpacity>
                                                               </View>
                     
                                                              
                  <TouchableOpacity onPress={fetchSenderUsrDtls} style={styles.button}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.locationText}>Submit</Text>}
                                          </TouchableOpacity>
                                        </View>
                                      </ScrollView>
                                    </View>
                                  </LinearGradient>;
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20
  },
  loanTitleView: {
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#e58d29',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  locationContainer: {
    marginVertical: 10
  },
  locationText: {
    fontSize: 16,
    color: '#333'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    height: 50
  },
  passwordInput: {
    flex: 1,
    padding: 12
  }
});
export default SMASendNonLns;