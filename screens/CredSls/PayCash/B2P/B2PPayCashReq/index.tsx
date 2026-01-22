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

import {
  View,
  Text,
  Linking,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


const SMASendNonLns = props => {
  const [SenderNatId, setSenderNatId] = useState('');
  const [RecNatId, setRecNatId] = useState('');
  const [SnderPW, setSnderPW] = useState("");
 
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");
  const [AttendAdmin, setAttendAdmin] = useState("");
 
  const[isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()

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
                  
                phoneKontact: { eq: userInfo.attributes.email},
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
                    graphqlOperation(getSMAccount, {awsemail: RecNatId}),
                    );
                    
                    const namess =RecAccountDtl.data.getSMAccount.name;
                    const RecAcstatus =RecAccountDtl.data.getSMAccount.status;

                    const fetchSenderBizUsrDtls = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(false);
                      try {
                        const accountDtl7:any = await API.graphql(
                          graphqlOperation(getSMAccount, {awsemail: AttendAdmin}),
                        );
                  
                        const phonecontactxs =accountDtl7.data.getSMAccount.phonecontact;
                        const namexs =accountDtl7.data.getSMAccount.name;

                        const fetchRecBizUsrDtls = async () => {
                          if(isLoading){
                            return;
                          }
                          setIsLoading(false);
                          try {
                            const accountDtl7:any = await API.graphql(
                              graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
                            );
                      
                            const namezx =accountDtl7.data.getSMAccount.name;
                            const phonecontactzx =accountDtl7.data.getSMAccount.phonecontact;
                            const pwscx =accountDtl7.data.getSMAccount.pw;
                    
                    
                  
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
                      Communications.textWithoutEncoding(phonecontactxs,'MiFedha. Hi '+ namexs 
                          + ', ' +namezx + ' of '+ name + ' business has requested to send Ksh. '
                          + amounts +' to ' + namess 
                          + '. Please proceed to authorise if it is a legitimate transaction '
                          + ' as per your business policies. For clarification reach the personnel through '
                        + phonecontactzx +'. Thank you.');
                    };

                    
                                          
                    if(
                    UsrDtls.data.listPersonels.items.length < 1)
                    {Alert.alert ("You dont work here")}
                    
                    else if(RecAcstatus === "AccountInactive")
                      {Alert.alert('Receiver account is inactive');}
                    else if(SnderPW !== pwscx)
                      {Alert.alert('Wrong Password');}
                    else if(SenderAcstatus === "AccountInactive"){Alert.alert('Sender account is inactive');}
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
                      Admin50 !== AttendAdmin )
                   
                  {Alert.alert ("The admin is not an admin in this business")}
                     else {
                      sendSMNonLn();
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
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="Sending Business Phone"
              value={SenderNatId}
              onChangeText={setSenderNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Sending Business Phone</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="Receiving Person Email"
              value={RecNatId}
              onChangeText={setRecNatId}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Receiving Person Email</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            placeholder="AttendingAdminEmail"
              value={AttendAdmin}
              onChangeText={setAttendAdmin}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Attending Admin Email</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            keyboardType={"decimal-pad"}
              value={amounts}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
              editable={true}
              ></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Sent</Text>
          </View>


          <View style={styles.sendAmtView}>
            <TextInput
              value={SnderPW}
              onChangeText={setSnderPW}
              secureTextEntry = {true}
              style={styles.sendAmtInput}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Main Account PassWord</Text>
          </View>


          <View style={styles.sendAmtViewDesc}>
            <TextInput
              multiline={true}
              value={Desc}
              onChangeText={setDesc}
              style={styles.sendAmtInputDesc}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>

          <TouchableOpacity
            onPress={fetchSenderUsrDtls}
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Send</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default SMASendNonLns;