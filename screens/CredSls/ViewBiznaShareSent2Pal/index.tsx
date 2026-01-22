import React, {useState, useEffect} from 'react';
import {View, Text,   FlatList, Alert,
  StyleSheet, Platform,KeyboardAvoidingView, TextInput
} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../components/MyAc/ViewSentNonLns";

import { getBizna, getCompany, getSMAccount,   listNonLoans } from '../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';
import { useRoute } from '@react-navigation/native';

const FetchSMNonLnsSnt = props => {

    
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const route = useRoute();
    const [awsEmail, setAWSEmail] = useState("")

    

        const fetchUsrDtls = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();              
      
          try {
                  const MFNDtls: any = await API.graphql(
                      graphqlOperation(getBizna, 
                        {BusKntct: awsEmail}
                  ),);
    
                   const owner = MFNDtls.data.getBizna.owner;
                  
                  
                  const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listNonLoans, 
              {                     
                   
                      filter:{status:{eq:"BiznaShareCash"},
                      senderPhn:{eq:awsEmail}}
                    }
               
                  ));
                  setRecvrs(Lonees.data.listNonLoans.items);

                  
                            
                            const fetchCompDtls = async () => {
                              try {
                                      const MFNDtls1: any = await API.graphql(
                                          graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                                      ),);
                      
                                      const companyEarningBals = MFNDtls1.data.getCompany.companyEarningBal;
                                      const companyEarnings = MFNDtls1.data.getCompany.companyEarning;
                                      const enquiryFees = MFNDtls1.data.getCompany.enquiryFee;
                                      
                                      
                            
                              }
                          catch (e)
                          {
                            console.log(e)
                            if(e){
                              
                              Alert.alert("Retry or update app or call customer care");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                  
                           }
                           await fetchCompDtls();
              
                          }
              
                          catch (e)
                          {
                            console.log(e)
                            if(e){
                              Alert.alert("Retry or update app or call customer care");
                              return;
                            }
                              
                             
                              
                          }    
              
                          
                           }
                           if (userInfo.attributes.sub !== owner)
                           {Alert.alert ("This is not your Business");
                            return;
                           }
                           
                           else{
                                                  await fetchLoanees();}
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
            setAWSEmail("");
          };
        
          

          return (
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.container}>
                    {/* Search Bar */}
                    <View style={styles.searchBar}>
                        <TextInput
                            placeholder="Company/Biz Phone Number..."
                            value={awsEmail}
                            onChangeText={setAWSEmail}
                            style={styles.searchInput}
                        />
                        <Text style={styles.placeholderText}>
                            Swipe down to load or refresh.
                        </Text>
                    </View>
    
                    {/* Results */}
                    
                        <FlatList
                            style={{ flex: 1 }}
                            data={Recvrs}
                            renderItem={({ item }) => (
                                <View>
                                    <NonLnSent SMAc={item} />
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            onRefresh={fetchUsrDtls}
                            refreshing={loading}
                            keyboardShouldPersistTaps="handled"
                        />
                    
                        
                    
                </View>
            </KeyboardAvoidingView>
        );
    };
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f5f5f5',
            padding: 10,
        },
        searchBar: {
            marginBottom: 10,
        },
        searchInput: {
            borderWidth: 1,
            borderColor: '#ddd',
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#fff',
        },
        placeholderText: {
            textAlign: 'center',
            color: '#aaa',
            marginTop: 20,
        },
    });


export default FetchSMNonLnsSnt;