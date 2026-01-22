import React, {useEffect, useState} from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import {createAgent, updateCompany, updateSAgent, updateSMAccount} from '../../../src/graphql/mutations';

import {Auth,  graphqlOperation, API} from 'aws-amplify';


import { Alert, View, Text, TextInput, ScrollView, 
  TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location'; // Importing Expo Location
import { Ionicons } from '@expo/vector-icons';

import { getCompany, getSAgent,  getSMAccount,  listSMAccounts } from '../../../src/graphql/queries';

  const RegisterKFNdgAcForm = props => {
  const [nationalId, setNationalid] = useState('');
  const [nam, setName] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const[eml, setEml] =useState("");

  
  const [pword, setPW] = useState('');
  const [saRegNo, setSARegNo] = useState('');
  const [BkName, setBkName] = useState('');
  const [BkAcNu, setBkAcNu] = useState('');
  const[lat, setLat] = useState('');
  const[twn, settwn] = useState("");
  const[lon, setLon] = useState("");
  const[isLoading, setIsLoading]=useState(false);
  const [latitudez, setLatitude] = useState('');
  const [longitudez, setLongitude] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


   // Fetch user attributes and location on component mount
   useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        // Fetch user attributes
        

        // Fetch location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
          setIsLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude.toString());
        setLongitude(location.coords.longitude.toString());
      } catch (error) {
        Alert.alert('Error', 'Failed to initialize data. Please try again.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);
  
  
   const gtMFKDtsl = async () =>{
     if(isLoading){
       return;
     }
     setIsLoading(true);
     const userInfo = await Auth.currentAuthenticatedUser();   
    
    try{
    const MFKb:any = await API.graphql(
    graphqlOperation(getSAgent, {saPhoneContact:saRegNo})
    );
    const actvMFNdogs = MFKb.data.getSAgent.actvMFNdog;
    const names = MFKb.data.getSAgent.name
    const mfnTtl = MFKb.data.getSAgent.mfnTtl;
    const offerStatus = MFKb.data.getSAgent.offerStatus
    

    const gtCompDtls = async () =>{
      if(isLoading){
        return;
      }
      setIsLoading(true);
      try{
          const compDtls :any= await API.graphql(
            graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
          );
          const actvNdg = compDtls.data.getCompany.ttlKFNdgActv
          const maxMFNdogoss = compDtls.data.getCompany.maxMFNdogos

          const ChckPhnUse = async () => {
            try {
              const UsrDtlss:any = await API.graphql(
                graphqlOperation(listSMAccounts,
                  { filter: {
                      
                    awsemail: { eq: phoneContact}
                                  
                    }}
                )
              )
  
              const ChckUsrExistence = async () => {
                try {
                  const UsrDtls:any = await API.graphql(
                    graphqlOperation(getSMAccount, 
                      { 
                        awsemail:userInfo.attributes.email
                      }
                    )
                  )
                  const owner = UsrDtls.data.getSMAccount.owner
                  const nationalidssss = UsrDtls.data.getSMAccount.nationalid
                  const TtlClrdLonsAmtByrCovs = UsrDtls.data.getSMAccount.TtlClrdLonsAmtByrCov

                  
                      
                 

          const createNewMFN = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
              await API.graphql(
                graphqlOperation(createAgent, {
                  input: {                    
                    phonecontact: phoneContact,
                    nationalid: nationalidssss,
                    name: nam,
                    ttlEarnings:0,
                    pw: pword,
                    email: eml,
                    sagentregno: saRegNo,
                    bankName:BkAcNu,
                    bkAcNo:BkName,
                    TtlFltIn: 0,
                    TtlFltOut: 0,
                    floatBal: 0,   
                    latitude: latitudez,
                    longitude: longitudez,              
                    agentEarningBal: 0,
                    MFNWithdrwlFee:0,
                    town:twn,      
                    owner:userInfo.attributes.sub,
                    status: 'AccountActive',

                  },
                }),
              );
        
              }
            
            catch (error) {
              if (error){
                Alert.alert("Application unsuccessful; Retry")
                return
              }
              
            }
            setIsLoading(false);
        await updtActAdm();
          }

          if (userInfo.attributes.sub !== owner)
                           {Alert.alert ("Please first create main account")}
                           else if(pword.length<8) {Alert.alert("Password is too short; at least eight characters");
        return;
      } 
      
      else if(0 >= TtlClrdLonsAmtByrCovs){
        Alert.alert("Please first purchase this account");
        return;
      } 

      else if (pword !== lat) {
        Alert.alert('Passwords do not match.');
        return;
      }

      
      else if((actvMFNdogs+1)>mfnTtl){
        Alert.alert("Exceeded MFNdogo slots; Open another MFKubwa account");
        return;
      }
      else{createNewMFN();}
          


          const updtActAdm = async()=>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
                await API.graphql(
                  graphqlOperation(updateCompany,{
                    input:{
                      AdminId:"BaruchHabaB'ShemAdonai2",
                      ttlKFNdgActv:parseFloat(actvNdg) + 1,
                    }
                  })
                )
            }
            catch(error){if (error) {
              console.log(error)
              Alert.alert("Retry or update app or call customer care")
            }}
            setIsLoading(false);
            await updtSA();
          }
          
          const updtSA = async()=>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
                await API.graphql(
                  graphqlOperation(updateSAgent,{
                    input:{
                      saPhoneContact:saRegNo,
                      actvMFNdog:parseFloat(actvMFNdogs) + 1,
                    }
                  })
                )
            }
            catch(error){if (error) {
              console.log(error)
              Alert.alert("Retry or update app or call customer care")
              return;
            }}
            
            setIsLoading(false)
            await updtSMAc();
          }   

          const updtSMAc = async()=>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
                await API.graphql(
                  graphqlOperation(updateSMAccount,{
                    input:{
                      awsemail:userInfo.attributes.email,
                      TtlClrdLonsAmtByrCov:parseFloat(TtlClrdLonsAmtByrCovs) - 1,
                    }
                  })
                )
            }
            catch(error){if (error) {
              console.log(error)
              Alert.alert("Retry or update app or call customer care")
              return;
            }}
            Alert.alert(" MFKubwa " +names+ " has registered MFNdogo "  +nam );
            setIsLoading(false)
          }   


          
        

  } catch (e) {
    if(e){Alert.alert("Retry or update app or call customer care")
  return}
    console.error(e);
  }
}


 if(UsrDtlss.data.listSMAccounts.items.length > 0){Alert.alert("This Phone number is in use in a Single Member Account")}
 else{
await ChckUsrExistence();}
    
    } catch (e) {
          if(e){Alert.alert("Retry or update app or call customer care")
        return}
          console.error(e);
        }
      }

      await ChckPhnUse();

      }
  
        catch(e){
          if (e){
            Alert.alert("Retry or update app or call customer care")
            return
          }
        
        }
        setIsLoading(false);
        };
        await gtCompDtls();       
  
      }
catch(e){
  console.log(e)
  if(e) {Alert.alert("Retry or update app or call customer care");
return;
}
}
    setNationalid('');
    setPW('');
    setName('');
    setEml("");
    setLat("");
    setLon("");
    setBkAcNu("");
    setBkName("");
    setPhoneContact('');
    setSARegNo('');
    settwn("")
  };

  useEffect(() =>{
    const BkNames=BkName
      if(!BkNames && BkNames!=="")
      {
        setBkName("");
        return;
      }
      setBkName(BkNames);
      }, [BkName]
       );

       useEffect(() =>{
        const BkAcNus=BkAcNu
          if(!BkAcNus && BkAcNus!=="")
          {
            setBkAcNu("");
            return;
          }
          setBkAcNu(BkAcNus);
          }, [BkAcNu]
           );

           useEffect(() =>{
            const natId=nationalId
              if(!natId && natId!=="")
              {
                setNationalid("");
                return;
              }
              setNationalid(natId);
              }, [nationalId]
               );

       useEffect(() =>{
        const twns=twn
          if(!twns && twns!=="")
          {
            settwn("");
            return;
          }
          settwn(twns);
          }, [twn]
           );
  
       useEffect(() =>{
        const pws=pword
          if(!pws && pws!=="")
          {
            setPW("");
            return;
          }
          setPW(pws);
          }, [pword]
           );
  
           useEffect(() =>{
            const phn=phoneContact
              if(!phn && phn!=="")
              {
                setPhoneContact("");
                return;
              }
              setPhoneContact(phn);
              }, [phoneContact]
               );
  
               useEffect(() =>{
                const name=nam
                  if(!name && name!=="")
                  {
                    setName("");
                    return;
                  }
                  setName(name);
                  }, [nam]
                   );

                   useEffect(() =>{
                    const email=eml
                      if(!email && email!=="")
                      {
                        setEml("");
                        return;
                      }
                      setEml(email);
                      }, [eml]
                       );
                  
                       useEffect(() =>{
                        const lati=lat
                          if(!lati && lati!=="")
                          {
                            setLat("");
                            return;
                          }
                          setLat(lati);
                          }, [lat]
                           );
                  
                           useEffect(() =>{
                            const long=lon
                              if(!long && long!=="")
                              {
                                setLon("");
                                return;
                              }
                              setLon(long);
                              }, [lon]
                               );
                  
                               
                    
                                   useEffect(() =>{
                                    const saRN=saRegNo
                                      if(!saRN && saRN!=="")
                                      {
                                        setSARegNo("");
                                        return;
                                      }
                                      setSARegNo(saRN);
                                      }, [saRegNo]
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
            placeholder="MFKubwa Phone number"
              value={saRegNo}
              onChangeText={setSARegNo}
              style={styles.input}
              editable={true}></TextInput>
            
          
            <TextInput
            placeholder={"MFNdogo Phone"}
              value={phoneContact}
              onChangeText={setPhoneContact}
              style={styles.input}
              editable={true}></TextInput>
           

          
            <TextInput
            placeholder={"MFNdogo Name"}
              value={nam}
              onChangeText={setName}
              style={styles.input}
              editable={true}></TextInput>
            
          
            <TextInput
            placeholder={"Bank Name"}
              value={BkAcNu}
              onChangeText={setBkAcNu}
              style={styles.input}
              editable={true}></TextInput>
            
          
            <TextInput
            placeholder={"Bank Account Number"}
              value={BkName}
              onChangeText={setBkName}
              style={styles.input}
              editable={true}></TextInput>
            

         
            <TextInput
            placeholder={"MFNdogo Email"}
              value={eml}
              onChangeText={setEml}
              style={styles.input}
              editable={true}></TextInput>
         
            <TextInput
            placeholder={"Nearby Town"}
              value={twn}
              onChangeText={settwn}
              style={styles.input}
              editable={true}></TextInput>
           

           <View style={styles.passwordContainer}>
                                                       <TextInput
                                                         placeholder="New MFNdogo Password"
                                                     style={styles.passwordInput}
                                                                                          
                                                     value={pword}
                                                     onChangeText={setPW}
                                                     secureTextEntry={!isPasswordVisible}
                                                     placeholderTextColor="#ccc"
                                                             />
                                                     <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                     </TouchableOpacity>
                                                     </View>
           
                                                     <View style={styles.passwordContainer}>
                                                       <TextInput
                                                         placeholder="Confirm Password"
                                                     style={styles.passwordInput}
                                                                                          
                                                     value={lat}
                                                     onChangeText={setLat}
                                                     secureTextEntry={!isPasswordVisible}
                                                     placeholderTextColor="#ccc"
                                                     />
                                                     <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                    <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                     </TouchableOpacity>
                                                    </View>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>Latitude: {latitudez || 'Fetching...'}</Text>
              <Text style={styles.locationText}>Longitude: {longitudez || 'Fetching...'}</Text>
            </View>
            <TouchableOpacity onPress={gtMFKDtsl} style={styles.button}>
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

  export default RegisterKFNdgAcForm;