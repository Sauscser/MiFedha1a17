import React, {useEffect, useState} from 'react';

import { createBizna, createChamaMembers, createGroup,   createRafikiLnAd,   updateCompany} from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listChamasRegConfirms, vwViaPhonss,  } from '../../../src/graphql/queries';
import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  
  
  TextInput,
  ScrollView,
  
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';



const CreateBiz = (props) => {

  

  const [ChmPhn, setChmPhn] = useState('');
  const [UsrEmail, setUsrEmail] = useState(null);
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');

  const [itemPrys, setitemPrys] = useState('');
  const [itemTwn, setitemTwn] = useState('');
  const [lnPrsntg, setlnPrsntg] = useState('');
  const [rpymntPrd, setrpymntPrd] = useState('');




      const gtUzr = async () =>{
        if(isLoading){
          return;
        }
        setIsLoading(true);
              const userInfo = await Auth.currentAuthenticatedUser();

        try{
          const compDtls :any= await API.graphql(
            graphqlOperation(getSMAccount,{awsemail:UsrEmail})
            );
            const pws = compDtls.data.getSMAccount.pw;
            const phonecontacts = compDtls.data.getSMAccount.phonecontact;
            const owner = compDtls.data.getSMAccount.owner;
            const namez = compDtls.data.getSMAccount.name;
            

      const CreateNewSMAc = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          await API.graphql(
          graphqlOperation(createRafikiLnAd, {
          input: {
            rafikiName: namez,
            rafikicntct:awsEmail,
            rafikiEmail: UsrEmail,
            rafikiamnt: parseFloat(itemPrys),
            rafikidesc:ChmDesc,
            AdvEmail: "ChmNm",
            advLicNo: "ChmRegNo",
            defaultPenalty:0,
            rafikiprcntg: parseFloat(lnPrsntg),
           
            rafikirpymntperiod: rpymntPrd,
            
            owner: userInfo.attributes.sub,
                  },
                })
                
                ,
              );

             

              
            } catch (error) {
              console.log(error)
              if(error){
                Alert.alert("Error! Access denied")
                return;
            } 
            
            }
            
            Alert.alert("Advert successfully Published")
            
          };

          if (pword !== pws)
          {Alert.alert("Wrong User password");
        
      } 

      else if (owner !== userInfo.attributes.sub)
      {Alert.alert("Please first create main account")}
      else if (parseFloat(lnPrsntg) >=36){
        Alert.alert("Cancelled: Exploitative Annual Interest Rate")
      }

      else if (parseFloat(rpymntPrd) < 60){
        Alert.alert("Repayment period must be greater than 60 days")
      }
      
      
      else {
        CreateNewSMAc();
      }

          

        } catch (e) {
          if(e){Alert.alert("Error! Access denied")}
          console.error(e);
        }
        setIsLoading(false);
            setChmPhn('');
            setPW('');
            setAWSEmail("")
            setChmDesc("")
            setChmNm("")
            setChmRegNo("")
            setMmbaID("")
            setSign2Phn("");
            setrpymntPrd("");
            setlnPrsntg("");
            setitemTwn("");
            setitemPrys("");
      }
          
    
          useEffect(() =>{
            const itemPryss=itemPrys
              if(!itemPryss && itemPryss!=="")
              {
                setitemPrys("");
                return;
              }
              setitemPrys(itemPryss);
              }, [itemPrys]
               );
               
               useEffect(() =>{
                const itemTwns=itemTwn
                  if(!itemTwns && itemTwns!=="")
                  {
                    setitemTwn("");
                    return;
                  }
                  setitemTwn(itemTwns);
                  }, [itemTwn]
                   );
                   
                   useEffect(() =>{
                    const lnPrsntgs=lnPrsntg
                      if(!lnPrsntgs && lnPrsntgs!=="")
                      {
                        setlnPrsntg("");
                        return;
                      }
                      setlnPrsntg(lnPrsntgs);
                      }, [lnPrsntg]
                       );
                       
                       useEffect(() =>{
                        const rpymntPrds=rpymntPrd
                          if(!rpymntPrds && rpymntPrds!=="")
                          {
                            setrpymntPrd("");
                            return;
                          }
                          setrpymntPrd(rpymntPrds);
                          }, [rpymntPrd]
                           );
                           
                           
                           useEffect(() =>{
        const MmbaIDs=MmbaID
          if(!MmbaIDs && MmbaIDs!=="")
          {
            setMmbaID("");
            return;
          }
          setMmbaID(MmbaIDs);
          }, [MmbaID]
           );
           
           useEffect(() =>{
        const ChmRegNos=ChmRegNo
          if(!ChmRegNos && ChmRegNos!=="")
          {
            setChmRegNo("");
            return;
          }
          setChmRegNo(ChmRegNos);
          }, [ChmRegNo]
           );
           
           useEffect(() =>{
        const awsEmails=awsEmail
          if(!awsEmails && awsEmails!=="")
          {
            setAWSEmail("");
            return;
          }
          setAWSEmail(awsEmails);
          }, [awsEmail]
           );

      useEffect(() =>{
        const ChmNms=ChmNm
          if(!ChmNms && ChmNms!=="")
          {
            setChmNm("");
            return;
          }
          setChmNm(ChmNms);
          }, [ChmNm]
           );

           useEffect(() =>{
            const ChmDescs=ChmDesc
              if(!ChmDescs && ChmDescs!=="")
              {
                setChmDesc("");
                return;
              }
              setChmDesc(ChmDescs);
              }, [ChmDesc]
               );

useEffect(() =>{
  const ChmPhns=ChmPhn
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [ChmPhn]
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
          const Sign2Phns=Sign2Phn
            if(!Sign2Phns && Sign2Phns!=="")
            {
              setSign2Phn("");
              return;
            }
            setSign2Phn(Sign2Phns);
            }, [Sign2Phn]
             );

        
          return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Ad Details Below</Text>
                  </View>
        
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={awsEmail}
                      onChangeText={setAWSEmail}
                      
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loaner Phone</Text>
                  </View>
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                     keyboardType='decimal-pad'                     
                      value={itemPrys}
                      onChangeText={setitemPrys}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Amount</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                     keyboardType='decimal-pad'
                     
                      value={rpymntPrd}
                      onChangeText={setrpymntPrd}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Repayment Period in days</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                     keyboardType='decimal-pad'
                     
                      value={lnPrsntg}
                      onChangeText={setlnPrsntg}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Annual Percentage Rate</Text>
                  </View>

                  <View style={styles.sendAmtViewDesc}>
                    <TextInput
                      value={ChmDesc}
                      multiline={true}
                      onChangeText={setChmDesc}
                      style={styles.sendAmtInputDesc}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loan Desc</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loaner PassWord</Text>
                  </View>

                  <TouchableOpacity
                    onPress={gtUzr}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Advertise
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default CreateBiz;