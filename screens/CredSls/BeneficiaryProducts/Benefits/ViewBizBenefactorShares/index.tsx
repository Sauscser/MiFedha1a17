import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/CredSales/BenProd2/ViewBizBenefactorShares";
import CustomAlert from '../../../../../components/CustomAlert/CustomAlert'; // adjust the path


import { listBenefitContributions2s, listBenefitShare2s,
     listLinkBeneficiary2s, listPersonels, listSMAccounts } from '../../../../../src/graphql/queries';
import * as Clipboard from 'expo-clipboard';  


const FetchSMNonCovLns = props => {
    const [Loanees, setLoanees] = useState([]);
    const [UsrDtls, setUsrDtls] = useState([]);  // Stores fetched accounts
    const [filteredLoanees, setFilteredLoanees] = useState([]); // Stores filtered results
    const [loading, setLoading] = useState(false);
    const [awsEmail, setAWSEmail] = useState("");
    const [awsEmail2, setAWSEmail2] = useState("");
    const [awsEmail3, setAWSEmail3] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

     

    const ChckPersonnelDtls = async () => {
          
        setIsLoading(true)
        const userInfo = await Auth.currentAuthenticatedUser();
          try {
            const UsrDtlsz:any = await API.graphql(
              graphqlOperation(listPersonels,
                { filter: {
                    
                    BusinessRegNo: { eq: awsEmail},
                    email:{contains: userInfo.attributes.email}
                    
                                
                  }}
              )
            )
            const personelDtls = UsrDtlsz.data.listPersonels.items 

           

    const fetchLoanees = async () => {
        
        try {
            
            const Lonees = await API.graphql(
                graphqlOperation(listLinkBeneficiary2s, {
                    filter: 
                    { 
                    benefactorAc:{eq: awsEmail},
                    beneficiaryPhone:{contains: awsEmail3}
                    
                     }
                })
            );

            const contribution = Lonees.data.listLinkBeneficiary2s.items
            setLoanees(contribution);

            if (contribution.length < 1)
                {
                    setModalMessage("You have not linked this beneficiary. "
                        + "Otherwise ensure you have entered details correctly even paying attention to caps.");
setModalVisible(true);
                }
            

        } catch (e) {
            console.error("Error fetching accounts:");
        } 
    };

    if (personelDtls.length < 1)
    {
        setModalMessage("Either you do not own this business/company or you do" 
            +" not work here or you have incorrectly entered the business number. You have entered this number: "
            + awsEmail + ". If you are sure it is the one please call customer care");
        setModalVisible(true);
         return;
    }

   
    else{
        await fetchLoanees();
    }


}
    
              catch(e){
              console.log(e)
              if(e){
              Alert.alert("Error! Access denied")
              return;
              }
              }
                setIsLoading(false)
                setAWSEmail("")
                setAWSEmail2("")  
                setAWSEmail3("")    
                            
                };
    
    // Dynamic Filtering based on input
    
    
    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="My Business full number..."
                        value={awsEmail}
                        onChangeText={setAWSEmail}
                        style={styles.searchInput}
                    />


                    <TextInput
                        placeholder="Beneficiary Name...even partial"
                        value={awsEmail3}
                        onChangeText={setAWSEmail3}
                        style={styles.searchInput}
                    />
                </View>

                {/* Results */}
                
                    <FlatList
                        style={{ flex: 1 }}
                        data={Loanees}
                        renderItem={({ item }) => (
                           
                                <LnerStts SMAc={item} />
                           
                        )}
                        keyExtractor={(item, index) => 
                            index.toString()}
                            onRefresh={ChckPersonnelDtls}
                            refreshing={loading}
                            showsVerticalScrollIndicator={false}
                            ListHeaderComponentStyle
                            ={{alignItems: 'center'}}
                            ListHeaderComponent={() => (
                              <>
               
                    <Text style={styles.placeholderText}>
                        Swipe down to load or refresh.
                    </Text>
                    </>
                )}
                />
            </View>

            <CustomAlert
  visible={modalVisible}
  message={modalMessage}
  onClose={() => setModalVisible(false)}
/>

            
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

export default FetchSMNonCovLns;