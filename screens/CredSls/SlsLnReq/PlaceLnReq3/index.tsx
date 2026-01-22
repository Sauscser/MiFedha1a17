import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {createReqLoanChama, createReqLoanCredSl, updateCompany} from '../../../../src/graphql/mutations';
import { getAdvocate, getBizna, getCompany, getSMAccount, listPersonels  } from '../../../../src/graphql/queries';
import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';


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
import { createReqLoan } from '../../../../src/graphql/mutations';



const CreateBiz = (props) => {

  

  const [ChmPhn, setChmPhn] = useState('');
 
  
  const [awsEmail, setAWSEmail] = useState("");
  const [awsEmail2, setAWSEmail2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
 
  const [Sign2Phn, setSign2Phn] = useState("");

  const [itemPrys, setitemPrys] = useState('');
  const [itemTwn, setitemTwn] = useState('');
  const [lnPrsntg, setlnPrsntg] = useState('');
  const [rpymntPrd, setrpymntPrd] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [InstAmt, setInstAmt] = useState("");
  const [InstFreq, setInstFreq] = useState("");
  const route = useRoute();


  



      const gtBizna = async () =>{
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
        try{
          const compDtls :any= await API.graphql(
            graphqlOperation(getSMAccount,{awsemail: awsEmail})
            );
            
            const phonecontacts = compDtls.data.getSMAccount.phonecontact;
            const name = compDtls.data.getSMAccount.name;
            
            

            const gtPersonelMainAc = async () =>{
              if(isLoading){
                return;
              }
              setIsLoading(true);
              const userInfo = await Auth.currentAuthenticatedUser();
              try{
                const compDtls3 :any= await API.graphql(
                  graphqlOperation(getSMAccount,{awsemail: userInfo.attributes.email})
                  );
                  const pws = compDtls3.data.getSMAccount.pw;
                  
                  
                  
            

            const gtComp = async () =>{
              if(isLoading){
                return;
              }
              setIsLoading(true);
              const userInfo = await Auth.currentAuthenticatedUser();
              try{
                const compDtls :any= await API.graphql(
                  graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                  );
                  const maxDefaultPen = compDtls.data.getCompany.maxDfltPen;

                  const RecomDfltPnltyRate = (parseFloat(lnPrsntg)*maxDefaultPen) / 100;
                  const DfltPnltyRate = (parseFloat(MmbaID)*maxDefaultPen) / 100;

                  
           
                  const gtBiznaInfo2 = async () =>{
                    if(isLoading){
                      return;
                    }
                    setIsLoading(true);
                    const userInfo = await Auth.currentAuthenticatedUser();
                    try{
                      const compDtlsx :any= await API.graphql(
                        graphqlOperation(getBizna,{BusKntct:awsEmail2})
                        );
                        const pwsz = compDtlsx.data.getBizna.pw;
                        const busNames = compDtlsx.data.getBizna.busName;

                        const ChckPersonelExistence = async () => {
                          try {
                            const UsrDtls:any = await API.graphql(
                              graphqlOperation(listPersonels,
                                { filter: {
                                    
                                  phoneKontact: { eq: userInfo.attributes.email},
                                  BusinessRegNo:{eq: awsEmail2}
                                                
                                  }}
                              )
                            )
                        
                            const amtrpayable = parseFloat(itemPrys) * 
                            ((Math.pow(1 + parseFloat(lnPrsntg)/36500, 0)))
                            
                            const ExpInstmnt = amtrpayable/parseFloat(rpymntPrd)

            const CreateNewSMAc2 = async () => {
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try {
                await API.graphql(
                graphqlOperation(createReqLoanCredSl, {
                input: {
                 
                  loaneeEmail:awsEmail2,
                  businessNo:awsEmail,
                  loaneeName: busNames,
                  loaneePhone:awsEmail2,
                  amount: parseFloat(itemPrys).toFixed(2),
                  repaymentAmt: parseFloat(lnPrsntg).toFixed(2),
                  repaymentPeriod:rpymntPrd,
                  itemName:ChmDesc,
                  status: "AwaitingResponse",
                  owner: userInfo.attributes.sub,
                  statusNumber: 0,
                  AdvEmail: "None",
                  lnType:"Pal2Biz",
                  advLicNo:"None",
                  dfltDeadLn:0,
                  loanerName: name,
                  loanerPhone: phonecontacts,
                  description: ChmNm,
                  defaultPenalty: MmbaID,
                  installmentAmount:InstAmt,
                  paymentFrequency:InstFreq
                        },
                      })
                      
                      ,
                    );
      
                    
      
                    
                  } catch (error) {
                    console.log(error)
                    if(error){
                      Alert.alert("Please enter details correctly")
                      return;
                  } 
                  
                  }
                  Alert.alert("Loan Request Successful")    ;
                  Communications.textWithoutEncoding(phonecontacts,
         
                    "MiFedha. " + busNames + ' has requested '
                              + ' you to loan the business goods/services worth Ksh. '
                              + itemPrys + '. Please go to your MiFedha'
                              + ' app to view the loan details and thereafter'
                              +' grant me the request. Thank you.');       
                  
                };

                
            const gtAdv = async () =>{
              if(isLoading){
                return;
              }
              setIsLoading(true);
              const userInfo = await Auth.currentAuthenticatedUser();
              try{
                const compDtls6 :any= await API.graphql(
                  graphqlOperation(getAdvocate,{advregnu:Sign2Phn})
                  );
                  const email = compDtls6.data.getAdvocate.email;
                  const phonecontact = compDtls6.data.getAdvocate.phonecontact;


                  

      const CreateNewSMAc = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          await API.graphql(
          graphqlOperation(createReqLoanCredSl, {
          input: {
           
            loaneeEmail:awsEmail2,
            businessNo:awsEmail,
            loaneeName: busNames,
            loaneePhone:awsEmail2,
            amount: parseFloat(itemPrys).toFixed(2),
            repaymentAmt: parseFloat(lnPrsntg).toFixed(2),
            repaymentPeriod:rpymntPrd,
            itemName:ChmDesc,
            status: "AwaitingResponse",
            owner: userInfo.attributes.sub,
            statusNumber: 0,
            dfltDeadLn:0,
            AdvEmail: email,
            advLicNo:Sign2Phn,
            lnType:"Pal2Biz",
            loanerName: name,
            loanerPhone: phonecontacts,
            description: ChmNm,
            defaultPenalty: MmbaID,
            installmentAmount:InstAmt,
                        paymentFrequency:InstFreq
                  },
                })
                
                ,
              );

              

              
            } catch (error) {
              console.log(error)
              if(error){
                Alert.alert("Please enter details correctly")
                return;
            } 
            
            }
            Alert.alert("Loan Request Successful")    ;
            Communications.textWithoutEncoding(phonecontact,'MiFedha. Greetings! '
            + 'We ' + busNames + ', the loanee Business and ' + name + ', the Loaner' +  
            ', request that you witness our loan contract on MiFedha app amounting to Ksh. '+
            itemPrys + ' repayable with ' + lnPrsntg + '% interest by the end of ' +rpymntPrd + 
            ' days. Default penalty is Ksh. '+ MmbaID + '. You can reach my loaner through '+ phonecontacts +
             '. You can also reach us through ' + awsEmail2 +'. Thank you.');       
            
          };

          
          CreateNewSMAc();

        } catch (e) {
          if(e){Alert.alert("Error! Please enter advocate license correctly")}
          console.error(e);
        }
        setIsLoading(false);
      }
      if (pws !== pword)
          {Alert.alert("Wrong User Main Account password");
        
      } 
      
      

      else if (UsrDtls.data.listPersonels.items.length < 1) {
        Alert.alert("Business doesnt exist or You do not work here");
        return;
        
      }

      else if (awsEmail === awsEmail2){
              Alert.alert("This business cannot buy from itself")
            }
            
      else if (parseFloat(rpymntPrd) < 1){
        Alert.alert("Enter repayment Period greater than 1 day")
      }
       else if (parseFloat(lnPrsntg) > 100){
        Alert.alert("Interest exploits you; enter lesser repayment amount")
      }
      else if (ExpInstmnt > parseFloat(InstAmt)){
        Alert.alert("Enter Installment greater than "+(ExpInstmnt+1).toFixed(0))
      }
      else if (Sign2Phn != "")
      {
      
      await gtAdv();
    
    }

    else {CreateNewSMAc2();}

  } catch (e) {
    if(e){Alert.alert("Error! Update app or contact customer care")}
    console.error(e);
  }
  setIsLoading(false);
      
}

await ChckPersonelExistence();
      
          
  } catch (e) {
    if(e){Alert.alert("Error! Update app or contact customer care")}
    console.error(e);
  }
  setIsLoading(false);
      
}

await gtBiznaInfo2();



} catch (e) {
  if(e){Alert.alert("Error! Update app or contact customer care")}
  console.error(e);
}
setIsLoading(false);
    
}

await gtComp();

} catch (e) {
  if(e){Alert.alert("Error! Update app or contact customer care")}
  console.error(e);
}
setIsLoading(false);
    
}

await gtPersonelMainAc();

} catch (e) {
          if(e){Alert.alert("Error! Update app or contact customer care")}
          console.error(e);
        }
        setIsLoading(false);
            setChmPhn('');
            setPW('');
            setAWSEmail("")
            setAWSEmail2("")
            setChmDesc("")
            setChmNm("")
            setChmRegNo("")
            setMmbaID("")
            setSign2Phn("");
            setrpymntPrd("");
            setlnPrsntg("");
            setitemTwn("");
            setitemPrys("");
            setInstAmt("");
            setInstFreq("")
      }
          
    
      useEffect(() =>{
        const InstAmts=InstAmt
          if(!InstAmts && InstAmts!=="")
          {
            setInstAmt("");
            return;
          }
          setInstAmt(InstAmts);
          }, [InstAmt]
           );
           
           useEffect(() =>{
            const InstFreqs=InstFreq
              if(!InstFreqs && InstFreqs!=="")
              {
                setInstFreq("");
                return;
              }
              setInstFreq(InstFreqs);
              }, [InstFreq]
               );
               
          
    
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
            const awsEmails2=awsEmail2
              if(!awsEmails2 && awsEmails2 !=="")
              {
                setAWSEmail2("");
                return;
              }
              setAWSEmail2(awsEmails2);
              }, [awsEmail2]
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
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                    placeholder='Email Address'
                      value={awsEmail}
                      onChangeText={setAWSEmail}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Email Address of Loaner</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                    placeholder='Business Phone'
                      value={awsEmail2}
                      onChangeText={setAWSEmail2}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loanee Business Phone</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                    placeholder='Advocate License Number (Optional)'
                      value={Sign2Phn}
                      onChangeText={setSign2Phn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Advocate License Number</Text>
                  </View>
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                    placeholder='Item Name'
                      value={ChmDesc}
                      onChangeText={setChmDesc}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Service/Item Name</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    
                    placeholder='Loan Description (Optional)'
                      value={ChmNm}
                      multiline = {true}
                      onChangeText={setChmNm}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Service/Item Description</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                     keyboardType='decimal-pad'
                     
                      value={itemPrys}
                      onChangeText={setitemPrys}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Loan Amount</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    keyboardType='decimal-pad'
                    placeholder='Example: 8% write 8'
                      value={lnPrsntg}
                      onChangeText={setlnPrsntg}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Monthly Interest rate</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    keyboardType='decimal-pad'
                    placeholder='Enter number of Days'
                      value={rpymntPrd}
                      onChangeText={setrpymntPrd}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Repayment Period</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder='Payment Frequency (Days)'
                     keyboardType='decimal-pad'
                     
                      value={InstFreq}
                      onChangeText={setInstFreq}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    
                  </View>         
                  
                    <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder='Installment Amount'
                     keyboardType='decimal-pad'
                     
                      value={InstAmt}
                      onChangeText={setInstAmt}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    
                  </View>

                          
                  
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                     keyboardType='decimal-pad'
                     
                      value={MmbaID}
                      onChangeText={setMmbaID}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Default Penalty</Text>
                  </View>


                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}> User Main Ac PassWord</Text>
                  </View>

                  <TouchableOpacity
                    onPress={gtBizna}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Request 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default CreateBiz;