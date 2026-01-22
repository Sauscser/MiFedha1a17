import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';

import { createFloatReduction, updateCompany, updateBizna } from '../../../../../src/graphql/mutations';
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { getBizna } from '../../../../../src/graphql/queries';

const PayPalPg = () => {
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const runFirst = 'amountsx = route.params.amounts;'
      
      true;// note: this is required, or you'll sometimes get silent failures
    
    
  const [progClr, setProgClr] = useState('#000');
  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    let Amts = payment.purchase_units[0]
    const Amountss = Amts.amount.value

    
    if (payment.status === 'COMPLETED') {

      const fetchAcDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
        try {
          const accountDtl = await API.graphql(
            graphqlOperation(getBizna, {BusKntct: route.params.itemPrys}),
          );
    
          const netEarnings = accountDtl.data.getBizna.netEarnings;      
          
    const fetchAcDtls2 = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
        try {
          const accountDtl2 = await API.graphql(
            graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
          );
    
          const nationality = accountDtl2.data.getSMAccount.nationality;      
          const usrTlDpst = accountDtl.data.getSMAccount.ttlDpstSM;
          const usrStts = accountDtl.data.getSMAccount.acStatus; 
          const depositLimits = accountDtl.data.getSMAccount.depositLimit;
          const names = accountDtl.data.getSMAccount.name;  
        
          const MaxAcBals = accountDtl.data.getSMAccount.MaxAcBal; 
          const phonecontact = accountDtl.data.getSMAccount.phonecontact;
          
         
              
              const gtCompDtls = async () =>{
                if(isLoading){
                    return;
                }
                setIsLoading(true)
                try{
                  const compDtls = await API.graphql(
                  graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                    );
                      const ttlUsrDpsts = compDtls.data.getCompany.ttlUsrDep
                      const agentFloatOuts = compDtls.data.getCompany.agentFloatOut

                      const gtExchangeRt = async () =>{
                        if(isLoading){
                            return;
                        }
                        setIsLoading(true)
                        try{
                          const compDtls1 = await API.graphql(
                          graphqlOperation(getExRates,{cur:nationality})
                            );
                              const buyingPrice = compDtls1.data.getExRates.buyingPrice
                              const symbol = compDtls1.data.getExRates.symbol

                              const Amtz = parseFloat(Amountss)*parseFloat(buyingPrice)
                              const WalCap = parseFloat(usrBala) + Amtz;


    
                      const CrtFltRed = async () => {
                        try {
                          await API.graphql(
                            graphqlOperation(createFloatReduction, {
                              input: {
                                
                                depositerid: userInfo.attributes.email,                    
                                agContact: "PayPal",
                                agentName:"PayPal",
                                userName:names,
                                amount: Amtz,
                                status: 'AccountActive',
                              },
                              
                            }),
                          );
                          
        
                } catch (error) {
                  if (error){
                    Alert.alert("Deposit unsuccessful; Retry")
                    return
                  }
                }
                setIsLoading(false);
                await onUpdtUsrBal();
                };  
    
                const onUpdtUsrBal = async () => {
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try {
                    await API.graphql(
                      graphqlOperation(updateBizna, {
                        input: {
                          BusKntct: route.params.itemPrys,
              
                          netEarnings: (parseFloat(netEarnings) + Amtz).toFixed(2),
                          
                        },
                      }),
                    );
                  }
    
                  catch (error) {
                    console.log(error)
                    if (error){Alert.alert("Check internet Connection")
                    return;}
                  }
                  setIsLoading(false);
                  await onUpdtCompBal();
                  }; 
    
                  
    
                    const onUpdtCompBal = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try {
                        await API.graphql(
                          graphqlOperation(updateCompany, {
                            input: {
                              AdminId:"BaruchHabaB'ShemAdonai2",
                  
                             
                              ttlUsrDep: parseFloat(ttlUsrDpsts) + Amtz,
                              agentFloatOut: parseFloat(agentFloatOuts) + Amtz,
                            },
                          }),
                        );
                      }
      
                      catch (error) {
                        console.log(error)
                        
                      }
                      Alert.alert(symbol + Amtz+" deposited in "+ names+ "'s ac ");
                      
                      setIsLoading(false);
                      }; 
                
                if (usrStts==="AccountInactive") {
                  Alert.alert("User Account is inactive")
                  return;
                } 
    
                
                
                else if(Amtz>parseFloat(depositLimits)) {
                  Alert.alert('Limit exceeded; call customer care for adjusment');
                  return;
                }
               
    
                else if ((WalCap) > parseFloat(MaxAcBals)) {
                  Alert.alert("Depositor call customer care to have wallet capacity adjusted")
                  return;
                } 
    
               
              
    
                else{CrtFltRed()}   
                
                
                } catch (error) {
                  console.log(error)
              if (error){Alert.alert("Retry or update app or call customer care")
                      return;}
                }
                setIsLoading(false);
                };    
    
                await gtExchangeRt();       
                
              } catch (error) {
                console.log(error)
            if (error){Alert.alert("Retry or update app or call customer care")
                    return;}
              }
              setIsLoading(false);
              };    
  
              await gtCompDtls();      
          
        
            }
    
            catch (e) {
              console.log(e)
              if (e){Alert.alert("Retry or update app or call customer care")
              return;}
                  
             }  
               
             setIsLoading(false);
          }; 
         
          fetchAcDtls2();
        
        }
    
        catch (e) {
          console.log(e)
          if (e){Alert.alert("Retry or update app or call customer care")
          return;}
              
         }  
           
         setIsLoading(false);
      }; 
     
      fetchAcDtls();
    } else {
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');
    }


  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setShowGateway(true)}>
            <Text style={styles.btnTxt}>Deposit Using PayPal</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                MiFedha
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri: 'https://dev.d1vm77kgq4pjrd.amplifyapp.com/'}}
              style={{flex: 1}}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              injectedJavaScript = {runFirst}
              
              onMessage={onMessage}
              
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});
export default PayPalPg;