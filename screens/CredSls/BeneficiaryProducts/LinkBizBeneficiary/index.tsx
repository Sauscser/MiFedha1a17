import React, { useState } from 'react';
import { createLinkBeneficiary2 } from '../../../../src/graphql/mutations';
import { getBenProd2, getBizna, getSMAccount, listPersonels } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export type UserReg = {
  usr: String;
};
const client = generateClient();
const CreateChama = (props: UserReg) => {
  const {
    usr
  } = props;
  const navigation = useNavigation();
  const route = useRoute();
  const [ChmPhn, setChmPhn] = useState('');
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // restored toggle

  const ProdId = route.params.id;
  const ProdIDX = ChmRegNo + ProdId + ChmNm;
  const ChckUsrExistence = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const userInfo = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    try {
      const UsrDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const usrDtlxs = UsrDtls.data.getSMAccount;
      const pwsz = usrDtlxs.pw;
      const UsrDtlss: any = await client.graphql({
        query: listPersonels,
        variables: {
          filter: {
            phoneKontact: {
              eq: attributes.email
            },
            BusinessRegNo: {
              eq: ChmRegNo
            }
          }
        }
      });
      const BznaDtlsx: any = await client.graphql({
        query: getBenProd2,
        variables: {
          id: route.params.id
        }
      });
      const prodDescz = BznaDtlsx.data.getBenProd2.prodDesc;
      const prodCostz = BznaDtlsx.data.getBenProd2.prodCost;
      const prodNamez = BznaDtlsx.data.getBenProd2.prodName;
      const benefactorPhone = BznaDtlsx.data.getBenProd2.benefactorPhone;
      const BznaDtlsx2: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: ChmNm
        }
      });
      const busNamex = BznaDtlsx2.data.getBizna.busName;
      const BznaDtls: any = await client.graphql({
        query: getBizna,
        variables: {
          BusKntct: ChmRegNo
        }
      });
      const pws = BznaDtls.data.getBizna.pw;
      const ownerz = BznaDtls.data.getBizna.owner;
      const BiznaNames = BznaDtls.data.getBizna.busName;

      // Collect Admin1..Admin50 into an array
      const admins = Array.from({
        length: 50
      }, (_, i) => BznaDtls.data.getBizna[`Admin${i + 1}`]);
      const onCreateNewSMAc = async () => {
        try {
          const resp = await client.graphql({
            query: createLinkBeneficiary2,
            variables: {
              input: {
                beneficiaryID: ProdIDX,
                prodID: route.params.id,
                benefitsID: ProdId,
                benefactorAc: ChmRegNo,
                benefactorPhone,
                beneficiaryAc: ChmNm,
                beneficiaryPhone: busNamex,
                creatorEmail: attributes.email,
                prodName: prodNamez,
                creatorName: BiznaNames,
                owner: usrDtlxs.name,
                prodCost: prodCostz,
                benefitsAmount: 0,
                beneficiaryType: 'Biz',
                prodDesc: prodDescz,
                benefitStatus: 'Active',
                amount: 0
              }
            }
          });
          if (resp?.data?.createLinkBeneficiary2) {
            Alert.alert('Beneficiary linked successfully');
          }
        } catch (error) {
          console.log(error);
          Alert.alert('Error! retry or update App!');
        }
      };
      if (pwsz !== pword) {
        Alert.alert('Wrong password');
      } else if (ownerz === userInfo.userId || admins.includes(attributes.email)) {
        await onCreateNewSMAc();
      } else {
        Alert.alert('You are Neither the Creator/Admin of this business');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error! Access denied!');
    }
    setIsLoading(false);
    setChmPhn('');
    setPW('');
    setChmDesc('');
    setChmNm('');
    setChmRegNo('');
    setSign2Phn('');
  };
  return <LinearGradient colors={['#e58d29', 'skyblue']} start={[0, 0]} end={[1, 1]} style={{
    flex: 1
  }}>
                          <View style={styles.container}>
                            <ScrollView>
        
                  <View style={styles.formContainer}>
                  <TextInput placeholder="Benefactor Business Number" value={ChmRegNo} onChangeText={setChmRegNo} style={styles.input} editable={true}></TextInput>
                      
                      <TextInput placeholder="Beneficiary Business Number" value={ChmNm} onChangeText={setChmNm} style={styles.input} editable={true}></TextInput>
                    
                  

                   <View style={styles.passwordContainer}>
                                                                 <TextInput placeholder="Admin Main Account Password" style={styles.passwordInput} value={pword} onChangeText={setPW} secureTextEntry={!isPasswordVisible} placeholderTextColor="#ccc" />
                                                               <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                               </TouchableOpacity>
                                                               </View>
                     
                                                              
                  <TouchableOpacity onPress={ChckUsrExistence} style={styles.button}>
                    {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.locationText}>Submit</Text>}
                                          </TouchableOpacity>
                                        </View>
                                      </ScrollView>
                                    </View>
                                  </LinearGradient>;
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20
  },
  loanTitleView: {
    marginBottom: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center'
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#e58d29',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
  },
  locationContainer: {
    marginVertical: 10
  },
  locationText: {
    fontSize: 16,
    color: '#333'
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    height: 50
  },
  passwordInput: {
    flex: 1,
    padding: 12
  }
});
export default CreateChama;