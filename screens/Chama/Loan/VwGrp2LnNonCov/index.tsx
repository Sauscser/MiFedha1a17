import React, {useState, useRef,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Chama/LnReq/Vw2Grp2LnNonCov";
import styles from './styles';
import {  listGroups, listRafikiLnAds, listReqLoanChamas, listSMAccounts } from '../../../../src/graphql/queries';

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

  const [itemPrys, setitemPrys] = useState('');
  const [itemTwn, setitemTwn] = useState('0');
  const [lnPrsntg, setlnPrsntg] = useState('0');
  const [rpymntPrd, setrpymntPrd] = useState('0');

  
  


        const fetchLoanees = async () => {
            setLoading(true);
            const userInfo = await Auth.currentAuthenticatedUser();
            try {

              const Lonees:any = await API.graphql(graphqlOperation(listGroups, 
                { 
                    
                  filter: {
                  
                    SignatoryEmail: { eq: userInfo.attributes.email},
                    status:{eq:"AccountActive"}
                }
                }
                  ));
              setLoanees(Lonees.data.listGroups.items);
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

          useEffect(() => {
            fetchLoanees();
          }, []);
          
          
  return (
   

    <View style={styles.image}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Swipe down to refresh</Text>
            <Text style={styles.label2}> (Select Group to proceed)</Text>
          </>
        )}
      />

</View>

  );
};

export default FetchSMNonCovLns;