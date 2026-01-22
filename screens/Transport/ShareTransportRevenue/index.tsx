import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateGroup,
  updateChamaMembers,
  createBenefitContributions2,
  updateMiFedhaBankAdmin,
  updateChamaControlTable,
  updateTransportRegister,
  
} from '../../.././src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Linking } from 'react-native';

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { getCompany, getSMAccount } from '../../../src/graphql/queries';
import { getTransportOrder, getTransportRegister } from '../../../src/graphql/queries';


const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
 
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
 
  const[isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const route = useRoute();
  const navigation = useNavigation()
  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }

 const grpDsNtExst = () => {
  navigation.navigate("SendNLBnftNone")
}
  
     const handleAcceptDelivery = async () => {
        setIsLoading(true);
       try {
         const user = await Auth.currentAuthenticatedUser();
         
       

            const transportDtls =  await API.graphql(graphqlOperation(getTransportRegister, { id: route.params.id}));
             const transportDtlz = transportDtls.data.getTransportRegister;

            console.log(route.params.id)
            
              const CompDtls:any = await API.graphql(
                         graphqlOperation(getCompany, {
                           AdminId: "BaruchHabaB'ShemAdonai2",
                         }),
                       );

                      
            const TransporterDtls = await API.graphql(graphqlOperation(getSMAccount, { awsemail: RecNatId}));
            const TransporterDtlsz = TransporterDtls.data.getSMAccount;

            const TransportOwner = await API.graphql(graphqlOperation(getSMAccount, { awsemail: transportDtlz.transportOwnerEmail}));
            const TransportOwnerz = TransportOwner.data.getSMAccount;

             
             console.log(transportDtlz);
             
             
               console.log(Date.now());   
        
   
             // Update the user's and buyer's account balances  
             

           if (TransportOwnerz.pw !== SnderPW)
   
           {
             Alert.alert("Sorry", "Wrong password.");
             return;
           }

           /*

          else if (orderDtlz.chmAcCommitmentStatus === "TransportChmCommitmentYes")
            {
              Alert.alert("Sorry", "Group Admin has cancelled your approval.");
              return;
            }
         
         else if (parseFloat(orderDtlz.orderCost) > parseFloat(userDtlsz.grpBal)) 
         {
           Alert.alert("Sorry!", "Your group's balance is less than the purchase cost: Ksh."
            + orderDtlz.orderCost )
             return;
         }
   
         else if (parseFloat(userDtlsz.grpBal ) >= parseFloat(orderDtlz.orderCost)) 
         
         */
        else{    

                           await API.graphql(
                           graphqlOperation(updateSMAccount, {
                           input: {
                             awsemail: RecNatId,
                             balance: parseFloat(TransporterDtlsz.balance) + parseFloat(amounts),
                             
                           }}))

                           await API.graphql(
                                                      graphqlOperation(createNonLoans, {
                                                      input: {
                                                        senderPhn: user.attributes.email,
                                                        recPhn: RecNatId,
                                                        RecName: TransporterDtlsz.name,
                                                        description: `Transport revenue share by `+ transportDtlz.transportName+" Transport Services",
                                                        SenderName: transportDtlz.transportName,
                                                        amount: parseFloat(amounts),
                                                        status: "SMNonLons",
                                                        owner: user.attributes.sub,
                                                      }}))
                          
         const TransportUpdate =  await API.graphql(
           graphqlOperation(updateTransportRegister, {
             input:
             {
             id: route.params.id,             
             Earnings: parseFloat(transportDtlz.Earnings) - parseFloat(amounts),
             
         }}));
         if (TransportUpdate?.data?.updateTransportRegister) {
         Alert.alert("Success", "Revenue shared!");
       // Send SMS notification
             const sendSMS = (phoneNumber: string, message: string) => {
         const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
         Linking.openURL(url);
       };
       
       // Example usage inside registerTransport or on button press:
       sendSMS(TransporterDtlsz.phonecontact, 
         transportDtlz.transportName +' transport services has shared with you revenue of ' 
         + "Ksh: " + amounts +'. '
        
         + ' You may contact them through '+ transportDtlz.transportkntct);}
       }
      


        
       } catch (err) {
         console.error("Accept error:", err);
         Alert.alert("Error", "Could not share revenue.");
       }
       finally {
       setIsLoading(false); 
       
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      
      setDesc("");
      setSnderPW("");
     }
     };

useEffect(() =>{
  const SnderNatIds=SenderNatId
    if(!SnderNatIds && SnderNatIds!=="")
    {
      setSenderNatId("");
      return;
    }
    setSenderNatId(SnderNatIds);
    }, [SenderNatId]
     );

     useEffect(() =>{
      const amt=amounts
        if(!amt && amt!=="")
        {
          setAmount("");
          return;
        }
        setAmount(amt);
        }, [amounts]
         );

         useEffect(() =>{
          const RecNatIds=RecNatId
            if(!RecNatIds && RecNatIds!=="")
            {
              setRecNatId("");
              return;
            }
            setRecNatId(RecNatIds);
            }, [RecNatId]
             );

             

                 

                     useEffect(() =>{
                      const descr=Desc
                        if(!descr && descr!=="")
                        {
                          setDesc("");
                          return;
                        }
                        setDesc(descr);
                        }, [Desc]
                         );

                         useEffect(() =>{
                          const SnderPWss=SnderPW
                            if(!SnderPWss && SnderPWss!=="")
                            {
                              setSnderPW("");
                              return;
                            }
                            setSnderPW(SnderPWss);
                            }, [SnderPW]
                             );
return (
<LinearGradient
                            colors={['#e58d29', 'skyblue']}
                            start={[0, 0]}
                            end={[1, 1]}
                            style={{ flex: 1 }}
                          >
                            <View style={styles.container}>
                              <ScrollView>
          
                    <View style={styles.formContainer}>
                      <TextInput
                       placeholder="Receiver Email"
                        value={RecNatId}
                        onChangeText={setRecNatId}
                        style={styles.input}
                        editable={true}>                          
                        </TextInput>

                        <TextInput
                       placeholder="Amount"
                        value={amounts}
                        onChangeText={setAmount}
                        style={styles.input}
                        editable={true}
                        keyboardType='decimal-pad'>                                                                         
                        </TextInput>   

                     
                     <View style={styles.passwordContainer}>
                                                                   <TextInput
                                                                     placeholder="My Main Account Password"
                                                                 style={styles.passwordInput}
                                                                                                      
                                                                 value={SnderPW}
                                                                 onChangeText={setSnderPW}
                                                                 secureTextEntry={!isPasswordVisible}
                                                                 placeholderTextColor="#ccc"
                                                                         />
                                                                 <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                                <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                                 </TouchableOpacity>
                                                                 </View>
                       
                                                                
                    <TouchableOpacity
                      onPress={handleAcceptDelivery}
                      style={styles.button}>
                      {isLoading ? (
                                                <ActivityIndicator color="#fff" />
                                              ) : (
                                                <Text style={styles.locationText}>Submit</Text>
                                              )}
                                            </TouchableOpacity>
                                          </View>
                                        </ScrollView>
                                      </View>
                                    </LinearGradient>
                                  );
                                };
                                
                                const styles = StyleSheet.create({
                                    gradient: {
                                      flex: 1,
                                    },
                                    container: {
                                      flex: 1,
                                      padding: 20,
                                    },
                                    loanTitleView: {
                                      marginBottom: 20,
                                      alignItems: 'center',
                                    },
                                    title: {
                                      fontSize: 24,
                                      fontWeight: 'bold',
                                      color: '#ffffff',
                                      textAlign: 'center',
                                    },
                                    formContainer: {
                                      backgroundColor: '#ffffff',
                                      borderRadius: 10,
                                      padding: 20,
                                      shadowColor: '#000',
                                      shadowOffset: { width: 0, height: 2 },
                                      shadowOpacity: 0.25,
                                      shadowRadius: 4,
                                      elevation: 5,
                                    },
                                    input: {
                                      height: 45,
                                      borderColor: '#ccc',
                                      borderWidth: 1,
                                      marginBottom: 15,
                                      borderRadius: 5,
                                      paddingLeft: 10,
                                    },
                                    button: {
                                      backgroundColor: '#e58d29',
                                      paddingVertical: 12,
                                      borderRadius: 5,
                                      alignItems: 'center',
                                      marginTop: 20,
                                    },
                                    locationContainer: {
                                      marginVertical: 10,
                                    },
                                    locationText: {
                                      fontSize: 16,
                                      color: '#333',
                                    },
                                    passwordContainer: { flexDirection: 'row', alignItems: 'center', 
                                        backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, height:50 },
                                passwordInput: { flex: 1, padding: 12 },
                                  });
        

export default SMASendNonLns;