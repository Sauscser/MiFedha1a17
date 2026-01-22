import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateBizna,
  createBizSlsReq,
  
} from '../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getBizna,
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listPersonels,
  listSMLoansCovereds,
 
} from '../../../../../src/graphql/queries';

import {useNavigation} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  
  
  TextInput,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';


const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
 
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  const [AttendAdmin, setAttendAdmin] = useState("");
 
  const[isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const SndChmMmbrMny = () => {
    navigation.navigate("AutomaticRepayAllTyps")
 }


  const fetchSenderUsrDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(false);
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getBizna, {BusKntct: SenderNatId}),
      );

      const SenderUsrBal =accountDtl.data.getBizna.netEarnings;                    
      const bizBeneficiaryz =accountDtl.data.getBizna.bizBeneficiary; 
      const SenderbizType =accountDtl.data.getBizna.bizType;
      const name =accountDtl.data.getBizna.busName;
      const ownerz =accountDtl.data.getBizna.owner;
      const SenderAcstatus =accountDtl.data.getBizna.status;
      const pw =accountDtl.data.getBizna.pw;
      const noBL =accountDtl.data.getBizna.noBL;
      const Admin1 = accountDtl.data.getBizna.Admin1;
              const Admin2 = accountDtl.data.getBizna.Admin2;
              const Admin3 = accountDtl.data.getBizna.Admin3;
              const Admin4 = accountDtl.data.getBizna.Admin4;
              const Admin5 = accountDtl.data.getBizna.Admin5;
              const Admin6 = accountDtl.data.getBizna.Admin6;
              const Admin7 = accountDtl.data.getBizna.Admin7;
              const Admin8 = accountDtl.data.getBizna.Admin8;
              const Admin9 = accountDtl.data.getBizna.Admin9;
              const Admin10 = accountDtl.data.getBizna.Admin10;
              const Admin11 = accountDtl.data.getBizna.Admin11;
              const Admin12 = accountDtl.data.getBizna.Admin12;
              const Admin13 = accountDtl.data.getBizna.Admin13;
              const Admin14 = accountDtl.data.getBizna.Admin14;
              const Admin15 = accountDtl.data.getBizna.Admin15;
              const Admin16 = accountDtl.data.getBizna.Admin16;
              const Admin17 = accountDtl.data.getBizna.Admin17;
              const Admin18 = accountDtl.data.getBizna.Admin18;
              const Admin19 = accountDtl.data.getBizna.Admin19;
              const Admin20 = accountDtl.data.getBizna.Admin20;
              const Admin21 = accountDtl.data.getBizna.Admin21;
              const Admin22 = accountDtl.data.getBizna.Admin22;
              const Admin23 = accountDtl.data.getBizna.Admin23;
              const Admin24 = accountDtl.data.getBizna.Admin24;
              const Admin25 = accountDtl.data.getBizna.Admin25;
              const Admin26 = accountDtl.data.getBizna.Admin26;
              const Admin27 = accountDtl.data.getBizna.Admin27;
              const Admin28 = accountDtl.data.getBizna.Admin28;
              const Admin29 = accountDtl.data.getBizna.Admin29;
              const Admin30 = accountDtl.data.getBizna.Admin30;
              const Admin31 = accountDtl.data.getBizna.Admin31;
              const Admin32 = accountDtl.data.getBizna.Admin32;
              const Admin33 = accountDtl.data.getBizna.Admin33;
              const Admin34 = accountDtl.data.getBizna.Admin34;
              const Admin35 = accountDtl.data.getBizna.Admin35;
              const Admin36 = accountDtl.data.getBizna.Admin36;
              const Admin37 = accountDtl.data.getBizna.Admin37;
              const Admin38 = accountDtl.data.getBizna.Admin38;
              const Admin39 = accountDtl.data.getBizna.Admin38;
              const Admin40 = accountDtl.data.getBizna.Admin40;
              const Admin41 = accountDtl.data.getBizna.Admin41;
              const Admin42 = accountDtl.data.getBizna.Admin42;
              const Admin43 = accountDtl.data.getBizna.Admin43;
              const Admin44 = accountDtl.data.getBizna.Admin44;
              const Admin45 = accountDtl.data.getBizna.Admin45;
              const Admin46 = accountDtl.data.getBizna.Admin46;
              const Admin47 = accountDtl.data.getBizna.Admin47;
              const Admin48 = accountDtl.data.getBizna.Admin48;
              const Admin49 = accountDtl.data.getBizna.Admin49;
              const Admin50 = accountDtl.data.getBizna.Admin50;


      const ChckPersonelExistence = async () => {

        if(isLoading){
          return;
        }
        setIsLoading(true);
      
        const userInfo = await Auth.currentAuthenticatedUser();
      
        try {
          const UsrDtls:any = await API.graphql(
            graphqlOperation(listPersonels,
              { filter: {
                  
                phoneKontact: { eq: AttendAdmin},
                BusinessRegNo:{eq: SenderNatId}
                              
                }}
            )
          )

                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: RecNatId}),
                    );
                    const RecUsrBal =RecAccountDtl.data.getBizna.netEarnings;                    
                    const bizBeneficiary =RecAccountDtl.data.getBizna.bizBeneficiary; 
                    const RecBizType =RecAccountDtl.data.getBizna.bizType;
                    const namess =RecAccountDtl.data.getBizna.busName;
                    const RecAcstatus =RecAccountDtl.data.getBizna.status;

                    const fetchSenderBizUsrDtls = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(false);
                      try {
                        const accountDtl7:any = await API.graphql(
                          graphqlOperation(getSMAccount, {awsemail: AttendAdmin}),
                        );
                  
                        const phonecontactxsc =accountDtl7.data.getSMAccount.phonecontact;
                        const namexs =accountDtl7.data.getSMAccount.name;
                       

                        const fetchRecBizUsrDtls = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          try {
                            const accountDtl7b:any = await API.graphql(
                              graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
                            );
                      
                            const namezx =accountDtl7b.data.getSMAccount.name;
                            const pwszsx =accountDtl7b.data.getSMAccount.pw;
                            const phonecontactzx =accountDtl7b.data.getSMAccount.phonecontact;

                    
                    
                  
                    const sendSMNonLn = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true)
                      try {
                        await API.graphql(
                          graphqlOperation(createBizSlsReq, {
                            input: {
                              recPhn: RecNatId,
                              senderPhn: SenderNatId,                                  
                              amount: parseFloat(amounts).toFixed(0),                              
                              description: Desc,
                              RecName:namess,
                              SenderName:name,
                              status: "cashSales",
                              owner: ownerz,
                              attendingAdmin: AttendAdmin
                            },
                          }),
                        );


                      } catch (error) {
                        if (error){
                          Alert.alert("Sending unsuccessful; Retry")
                          return
                        }
                      }
                      setIsLoading(false);

                      Alert.alert("Request Successful")
                      Communications.textWithoutEncoding(SenderNatId,'MiFedha. Greetings '+ name + ", "+ 
                        namexs +' working at your business has requested to pay Ksh. '
                          + amounts +' to ' + namess + ' business. '
                          + '. Please call customer care if it is not a valid transaction '
                          + ' as per your business policies. For clarification reach the personnel through '
                        + phonecontactzx +'. Thank you.');
                    };
                      
                    if(RecAcstatus === "AccountInactive"){Alert.alert('Receiver account is inactive');}
                    else if(SnderPW !== pwszsx){Alert.alert('Wrong Main Account Password');}
                    
                    else if(SenderNatId === RecNatId){Alert.alert('This business cannot buy from itself');}
                    
                    else if(SenderAcstatus === "AccountInactive"){Alert.alert('Sender account is inactive');}
                    else if (UsrDtls.data.listPersonels.items.length < 1)
                    {Alert.alert("You dont work here")}
                    
                    else if ( Admin1 !== AttendAdmin
                      &&
                      Admin2 !== AttendAdmin 
                      &&
                      Admin3 !== AttendAdmin
                      &&
                      Admin4 !== AttendAdmin 
                      &&
                      Admin5 !== AttendAdmin
                      &&
                      Admin6 !== AttendAdmin 
                      &&
                      Admin7 !== AttendAdmin
                      &&
                      Admin8 !== AttendAdmin 
                      &&
                      Admin9 !== AttendAdmin
                      &&
                      Admin10 !== AttendAdmin 
                      &&
                      Admin11 !== AttendAdmin
                      &&
                      Admin12 !== AttendAdmin 
                      &&
                      Admin13 !== AttendAdmin
                      &&
                      Admin14 !== AttendAdmin 
                      &&
                      Admin14 !== AttendAdmin
                      &&
                      Admin15 !== AttendAdmin 
                      &&
                      Admin16 !== AttendAdmin
                      &&
                      Admin17 !== AttendAdmin 
                      &&
                      Admin18 !== AttendAdmin
                      &&
                      Admin19 !== AttendAdmin 
                      &&
                      Admin20 !== AttendAdmin
                      &&
                      Admin21 !== AttendAdmin 
                      &&
                      Admin22 !== AttendAdmin
                      &&
                      Admin23 !== AttendAdmin 
                      &&
                      Admin24 !== AttendAdmin
                      &&
                      Admin25 !== AttendAdmin 
                      &&
                      Admin26 !== AttendAdmin
                      &&
                      Admin27 !== AttendAdmin 
                      &&
                      Admin28 !== AttendAdmin
                      &&
                      Admin29 !== AttendAdmin 
                      &&
                      Admin30 !== AttendAdmin
                      &&
                      Admin31 !== AttendAdmin 
                      &&
                      Admin32 !== AttendAdmin
                      &&
                      Admin33 !== AttendAdmin 
                      &&
                      Admin34 !== AttendAdmin
                      &&
                      Admin35 !== AttendAdmin 
                      &&
                      Admin36 !== AttendAdmin
                      &&
                      Admin37 !== AttendAdmin 
                      &&
                      Admin38 !== AttendAdmin
                      &&
                      Admin39 !== AttendAdmin 
                      &&
                      Admin40 !== AttendAdmin
                      &&
                      Admin41 !== AttendAdmin 
                      &&
                      Admin42 !== AttendAdmin
                      &&
                      Admin43 !== AttendAdmin 
                      &&
                      Admin44 !== AttendAdmin
                      &&
                      Admin45 !== AttendAdmin 
                      &&
                      Admin46 !== AttendAdmin
                      &&
                      Admin47 !== AttendAdmin 
                      &&
                      Admin48 !== AttendAdmin
                      &&
                      Admin49 !== AttendAdmin 
                      &&
                      Admin50 !== AttendAdmin 
                    
                    
                  )
                   
                  {Alert.alert ("This Admin does not belong to this Business")}
                     else {
                      await sendSMNonLn();
                    }                                                
                 
                  }       
                  catch(e) {   
                    console.log(e)  
                    if (e){Alert.alert("Reciever does not exist")
    return;}                 
                  }
                  setIsLoading(false);
                  }                    
                    await fetchRecBizUsrDtls();
                  
                  }       
                  catch(e) {   
                    console.log(e)  
                    if (e){Alert.alert("Reciever does not exist")
    return;}                 
                  }
                  setIsLoading(false);
                  }                    
                    await fetchSenderBizUsrDtls();
                  
                  }       
                catch(e) {   
                  console.log(e)  
                  if (e){Alert.alert("Reciever does not exist")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchRecUsrDtls();
    
    
    }     
    catch (e) {
      console.log(e)
      if (e){Alert.alert("Retry, update app or call customer care")
      return;}
         
    }   
    setIsLoading(false);
    };
    
    await ChckPersonelExistence();
  

}     
catch (e) {
  console.log(e)
  if (e){Alert.alert("Retry, update app or call customer care")
  return;}
     
}   

    
  
      setIsLoading(false);
      setSenderNatId('');
      setAmount("");
      setRecNatId('');
      setAttendAdmin("");
      setDesc("");
      setSnderPW("");
      
}

useEffect(() =>{
  const AttendAdmins=AttendAdmin
    if(!AttendAdmins && AttendAdmins!=="")
    {
      setAttendAdmin("");
      return;
    }
    setAttendAdmin(AttendAdmins);
    }, [AttendAdmin]
     );


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
                     placeholder="Purchasing Business Phone Number"
                      value={SenderNatId}
                      onChangeText={setSenderNatId}
                      style={styles.input}
                      editable={true}></TextInput>
                    
                    <TextInput
                     placeholder="Selling Business Phone Number"
                      value={RecNatId}
                      onChangeText={setRecNatId}
                     
                      style={styles.input}
                      editable={true}></TextInput>

<TextInput
                     placeholder="Attending Admin Email"
                      value={AttendAdmin}
                      onChangeText={setAttendAdmin}
                      style={styles.input}
                      editable={true}></TextInput>
                    
                    
                   
                 
                    <TextInput
                     placeholder="Item/Sale Request Description"
                      value={Desc}
                      onChangeText={setDesc}
                      style={styles.input}
                      editable={true}
                      multiline={true}  // Enables multi-line input
                textAlignVertical="top">
                        
                      </TextInput>
                    
                    <TextInput
                    placeholder="Enter Item Cost"
                      value={amounts}
                      onChangeText={setAmount}
                      keyboardType={"decimal-pad"}
                      style={styles.input}
                      editable={true}></TextInput>
                   

                   <View style={styles.passwordContainer}>
                                                                 <TextInput
                                                                   placeholder="Personnel Main Account Password"
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
                    onPress={fetchSenderUsrDtls}
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