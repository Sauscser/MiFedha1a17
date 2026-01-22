import React, {useState, useRef,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/MyAc/LoanReq/Vw2GrantPal2Pal";
import styles from './styles';
import { getSMAccount, listReqLoans } from '../../../../../src/graphql/queries';



const FetchSMNonCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [UsrEmail, setUsrEmail] = useState(null);
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');

  const [itemPrys, setitemPrys] = useState('0');
  const [itemTwn, setitemTwn] = useState('0');
  const [lnPrsntg, setlnPrsntg] = useState('0');
  const [rpymntPrd, setrpymntPrd] = useState('0');

  

  const fetchUsrDtls = async () => {

    const userInfo = await Auth.currentAuthenticatedUser();
    try {
            const MFNDtls: any = await API.graphql(
                graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
            ),);

            const balances = MFNDtls.data.getSMAccount.balance;
            const owner = MFNDtls.data.getSMAccount.owner;
            
            const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try {

            

              const Lonees:any = await API.graphql(graphqlOperation(listReqLoans, 
                { 
                    
                  filter: {
                  
                    loanerEmail: { eq: userInfo.attributes.email},
                    status:{eq:"AwaitingResponse"}
                               
                }
                }
                  ));
              setLoanees(Lonees.data.listReqLoans.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
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
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Swipe to filter</Text>
            <Text style={styles.label2}> (Select to Loan)</Text>
          </>
        )}
      />

</View>


  );
};

export default FetchSMNonCovLns;