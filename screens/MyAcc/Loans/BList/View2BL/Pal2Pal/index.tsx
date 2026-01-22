import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';
import { getSMAccount, listSMLoansCovereds, listSMLoansNonCovereds } from '../../../../../../src/graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../../components/MyAc/BL/Vw2BLCov";
import styles from './styles';
import { useRoute } from '@react-navigation/core';

const FetchSMCovLns = props => {

    const[LnerPhn, setLnerPhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [Loaneess, setLoaneess] = useState([]);
    const combined = (Loanees[0] + Loaneess[0]);
    const route = useRoute();

    const fetchUsrDtls = async () => {

      const userInfo = await Auth.currentAuthenticatedUser();
      try {
              const MFNDtls: any = await API.graphql(
                  graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
              ),);

              const balances = MFNDtls.data.getSMAccount.balance;
              const owner = MFNDtls.data.getSMAccount.owner;

              
              const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              console.log(daysUpToDate)

        const fetchLoanees = async () => {
            setLoading(true);

            
        
            try {
              

              const Lonees:any = await API.graphql(graphqlOperation(listSMLoansCovereds, 
                { filter: {
                    and: {
                      loanerEmail: { eq: userInfo.attributes.email},
                        lonBala:{gt:0},
                        
                        status:{ne:"LoanBL"},
                        timeExpBack:{le: daysUpToDate},
                          timeExpBack2:{le:daysUpToDate},
                        
                      
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
        
          if (userInfo.attributes.sub!==owner) {
            Alert.alert("Please first create a main account")
            return;
          }  else {
           await fetchLoanees();}
} catch (e) {
console.log(e);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchUsrDtls();
}, [])   
          

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts Loanee={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> My Loanees</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;