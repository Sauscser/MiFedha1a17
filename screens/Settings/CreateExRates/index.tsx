import React, {useEffect, useState} from 'react';

import {createCompany, createExRates} from '../../../src/graphql/mutations';
import { getCompany} from '../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
 
} from 'react-native';
import styles from './styles';



const AdminSignIn = (props) => {  
  const navigation = useNavigation();

  const [PWOnes, setPWOne] = useState("");
  const [PWTwos, setPWTwo] = useState(""); 
  const [PWThree, setPWThree] = useState("");
  const [PWFour, setPWFour] = useState(""); 
  const [ownr, setownr] = useState(null);  
 

  const fetchUser = async () => {
    const userInfo = await Auth.currentAuthenticatedUser();
    
    
    setownr(userInfo.attributes.sub);
    
  };

  

  useEffect(() => {
      fetchUser();
    }, []);

  
    
      const fetchExDtls = async () => {
        try {
                const ExDtls: any = await API.graphql(
                    graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                ),);
                const ownersss = ExDtls.data.getCompany.owner;


                const CompCreation = async () => {
                  try {
                    await API.graphql(
                      graphqlOperation(createExRates, {
                        input: {
                          cur: PWOnes,
                          sellingPrice: PWTwos,
                          buyingPrice:PWThree,
                          symbol:PWFour
                         
                        },
                      }),
                    );
              
                  } catch (error) {
                    console.log(error)
                   
                    if(error) {await fetchExDtls ()}
              
                    else {await fetchExDtls ()}
                  }
                                   
                    };
              
                if(ownersss === ownr)
                {              
                  CompCreation();
              }
              else{
                Alert.alert("Access Denied");
              }
            }

            catch (e)
            {
              
                if (e){Alert.alert("Check internet; unauthorised access")}
            }    
            setPWOne("");
            setPWTwo("");
            setPWThree("");
            setPWFour("");
      
    
             }



             useEffect(() =>{
              const pw1=PWOnes
                if(!pw1 && pw1!=="")
                {
                  setPWOne("");
                  return;
                }
                setPWOne(pw1);
                }, [PWOnes]
                 );
  
                 useEffect(() =>{
                  const pw2=PWTwos
                    if(!pw2 && pw2!=="")
                    {
                      setPWTwo("");
                      return;
                    }
                    setPWTwo(pw2);
                    }, [PWTwos]
                     );

                     useEffect(() =>{
                      const pw3=PWThree
                        if(!pw3 && pw3!=="")
                        {
                          setPWThree("");
                          return;
                        }
                        setPWThree(pw3);
                        }, [PWThree]
                         );
          
                         useEffect(() =>{
                          const pw4=PWFour
                            if(!pw4 && pw4!=="")
                            {
                              setPWFour("");
                              return;
                            }
                            setPWFour(pw4);
                            }, [PWFour]
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
                      value={PWOnes}
                      onChangeText={setPWOne}
                      
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Nationality</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={PWTwos}
                      onChangeText={setPWTwo}
                    
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Selling Price</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={PWThree}
                      onChangeText={setPWThree}
                     
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Buying Price</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={PWFour}
                      onChangeText={setPWFour}
                     
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Currency</Text>
                  </View>
        
                  <TouchableOpacity
                    onPress={fetchExDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Sign In
                    </Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default AdminSignIn;