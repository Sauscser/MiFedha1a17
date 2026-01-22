import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/MyAc/ReadPayPalTNC";
import styles from './styles';
import { getCompany, getExRates, getSMAccount, listCompanies, listExRates, listSMAccounts } from '../../../../src/graphql/queries';
import { useNavigation } from '@react-navigation/native';

const FetchSMNonCovLns = props => {

  const[LneePhn, setLneePhn] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Loanees, setLoanees] = useState([]);
  const [sellingPrice, setsellingPrice] = useState([]);
  const [Recom, setRecom] = useState();
  const [Cur, setCur] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const PyPlDpst = () => {
      navigation.navigate("PayPalDposit");
    }

    const PyPlDpst2 = () => {
      navigation.navigate("Homeie");
    }
    

    const fetchLoanees = async () => {
      setLoading(true);
      const userInfo = await Auth.currentAuthenticatedUser();
      try {
        const Lonees:any = await API.graphql(graphqlOperation(listSMAccounts, 
          { filter: {
              and: {
                awsemail: { eq: userInfo.attributes.email},
               
              }
            }}
            ));
        setLoanees(Lonees.data.listSMAccounts.items);

        const gtExchangeRt = async () =>{
          if(isLoading){
              return;
          }
          setIsLoading(true)
          try{
            const compDtlsz:any = await API.graphql(
            graphqlOperation(getSMAccount,{awsemail:userInfo.attributes.email})
              );
              const nationality = compDtlsz.data.getSMAccount.nationality; 
console.log (nationality)

                
                      
                        const gtCompDtls = async () =>{
                          if(isLoading){
                            return;
                          }
                          setIsLoading(true);
                          try{
                            const compDtlszx:any= await API.graphql(
                              graphqlOperation(listCompanies,{ filter: {
                                and: {
                                  AdminId: { eq: "BaruchHabaB'ShemAdonai2"},
                                 
                                }
                              }})
                              );
                              
                              setRecom(compDtlszx.data.listCompanies.items);
                        
  
                            } catch (error) {
                              console.log(error)
                          if (error){Alert.alert("Retry or update app or call customer care")
                                  return;}
                            }
                            setIsLoading(false);
                            };    
                
                            await gtCompDtls(); 
  
              



              } catch (error) {
                  console.log(error)
              if (error){Alert.alert("Retry or update app or call customer care")
                      return;}
                }
                setIsLoading(false);
                };    
    
                await gtExchangeRt(); 

        


      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        
    };
  }
    


useEffect(() => {
fetchLoanees();
}, [])   
  return (
   

<View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recom}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            <Text>
              Please swipe to reload terms and conditions before proceeding
            </Text>
            
          </>
        )}
      />

</View>
  );
};

export default FetchSMNonCovLns;