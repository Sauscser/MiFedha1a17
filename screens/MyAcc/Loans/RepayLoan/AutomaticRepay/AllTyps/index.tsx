import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList} from 'react-native';
import { listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds, listSMLoansNonCovereds } from '../../../../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCvSM";
import AutoNCVSM from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoNCVSM";
import AutoChmCovLn from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoChmCovLn";
import AutoChmNonCov from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoChmNonCov";
import AutoCrdSlCv from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCrdSlCv";
import AutoCredSlNCV from "../../../../../../components/MyAc/RepyLn/AutomaticRepay/AutoCredSlNCV";
import styles from './styles';
import { useRoute } from '@react-navigation/core';
import { SafeAreaView } from 'react-native-safe-area-context';

const FetchSMCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [Loaneess, setLoaneess] = useState([]);
    const [Loanees3, setLoanees3] = useState([]);
    const [Loanees4, setLoanees4] = useState([]);
    const [Loanees5, setLoanees5] = useState([]);
    const [Loanees6, setLoanees6] = useState([]);
    const combined = (Loanees[0] + Loaneess[0]);
    const route = useRoute();

   
        const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
              
   
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listSMLoansCovereds, 
                { 
                              
                  filter: {
                    and: {
                      loaneeEmail: { eq:  userInfo.attributes.email},
                        lonBala:{gt:0},
                        
                        status:{eq:"LoanBL"}
                      
                    }
                  },
                  
                }
                  ));

                  
              setLoanees(Lonees.data.listSMLoansCovereds.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };

          useEffect(() => {
            fetchLoanees();
          }, []);


         

          const fetchLoanees3 = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try {
              const Lonees3:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { 
                  
                                
                  filter: {                    
                    loaneePhn: {eq: userInfo.attributes.email},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees3(Lonees3.data.listCvrdGroupLoans.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees3();
          }, []);

          

          const fetchLoanees5 = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try {
              const Lonees5:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                { 
                 
                              
                  filter: {                    
                    buyerContact: {eq: userInfo.attributes.email},
                      lonBala:{gt:0},                      
                      status:{eq:"LoanBL"}                      
                    
                  },
                
                  
                }
                  ));
                  

              setLoanees5(Lonees5.data.listCovCreditSellers.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
          useEffect(() => {
            fetchLoanees5();
          }, []);

          

          


  return (
    <SafeAreaView style = {{ marginBottom:"120%"}} >
    <View style={styles.image}>


<Text style={styles.label}> Please first repay these Debts</Text>
<Text style={styles.label2}> (Please swipe down to load)</Text>


<View style={styles.loanTitleView}>
<View style={styles.root}>
<FlatList
style= {{width:"100%"}}
data={Loanees}
renderItem={({item}) => <LnerStts Loanee={item} />}
keyExtractor={(item, index) => index.toString()}
onRefresh={fetchLoanees}
refreshing={loading}
showsVerticalScrollIndicator={false}
ListHeaderComponentStyle={{alignItems: 'center'}}
ListHeaderComponent={() => (
<>
<Text style={styles.label}> Pal Loans Loans</Text>

</>
)}

/>
</View>

</View>

<View style={styles.loanTitleView}>
<View style={styles.root}>
<FlatList
style= {{width:"100%"}}
data={Loanees3}
renderItem={({item}) => <AutoChmCovLn ChamaMmbrshpDtls={item} />}
keyExtractor={(item, index) => index.toString()}
onRefresh={fetchLoanees}
refreshing={loading}
showsVerticalScrollIndicator={false}
ListHeaderComponentStyle={{alignItems: 'center'}}
ListHeaderComponent={() => (
<>

<Text style={styles.label}> Group Loans</Text>
</>
)}
/>
</View>



</View>

<View style={styles.loanTitleView}>
<View style={styles.root}>
<FlatList
style= {{width:"100%"}}
data={Loanees5}
renderItem={({item}) => <AutoCrdSlCv Loanee={item} />}
keyExtractor={(item, index) => index.toString()}
onRefresh={fetchLoanees}
refreshing={loading}
showsVerticalScrollIndicator={false}
ListHeaderComponentStyle={{alignItems: 'center'}}
ListHeaderComponent={() => (
<>
<Text style={styles.label}> Business Loans</Text>

</>
)}
/>
</View>

</View>






    </View>
    
    </SafeAreaView>
  );
};

export default FetchSMCovLns;