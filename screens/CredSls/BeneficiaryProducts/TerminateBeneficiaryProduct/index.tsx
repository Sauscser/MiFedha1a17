import React, { useEffect, useState } from 'react';
import { createBenProd2, createBizna, createChamaMembers, createGroup, createLinkBeneficiary2, createPersonel, updateCompany } from '../../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount } from '../../../../src/graphql/queries';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { generateClient } from 'aws-amplify/api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
export type UserReg = {
  usr: String;
};
const client = generateClient();
const CreateChama = (props: UserReg) => {
  const {
    usr
  } = props;
  const navigation = useNavigation();
  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState('');
  const [phoneContact, setPhoneContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const WorkerID = ChmDesc + ChmRegNo;
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
      const pwsz = UsrDtls.data.getSMAccount.pw;
      const userDtls = UsrDtls.data.getSMAccount;
      const PckBiznaDtls = async () => {
        if (isLoading) return;
        setIsLoading(true);
        try {
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
            if (isLoading) return;
            setIsLoading(true);
            try {
              await client.graphql({
                query: createBenProd2,
                variables: {
                  input: {
                    benefactorAc: ChmRegNo,
                    benefactorPhone: ChmRegNo,
                    creatorEmail: attributes.email,
                    prodName: ChmPhn,
                    creatorName: BiznaNames,
                    owner: userDtls.name,
                    prodCost: Sign2Phn,
                    benefitsAmount: 0,
                    prodDesc: 'Product created by ' + BiznaNames + '. ' + ChmDesc,
                    prodStatus: 'AccountActive'
                  }
                }
              });
              Alert.alert('Product created successfully');
            } catch (error) {
              console.log(error);
              Alert.alert('Error! Access denied!');
              return;
            }
            setIsLoading(false);
          };
          if (pwsz !== pword) {
            Alert.alert('Wrong Admin password');
          } else if (ownerz === userInfo.userId || admins.includes(attributes.email)) {
            await onCreateNewSMAc();
          } else {
            Alert.alert('You are Neither the Creator/Admin of this business');
          }
        } catch (error) {
          Alert.alert('Error! Create a business first!');
          return;
        }
        setIsLoading(false);
      };
      await PckBiznaDtls();
    } catch (e) {
      console.error(e);
      Alert.alert('Error! Access denied!');
      return;
    }
    setIsLoading(false);
    setChmPhn('');
    setPW('');
    setChmDesc('');
    setChmNm('');
    setChmRegNo('');
    setMmbaID('');
    setSign2Phn('');
  };
  return <LinearGradient colors={['#e58d29', 'skyblue']} start={[0, 0]} end={[1, 1]} style={{
    flex: 1
  }}>
                          <View style={styles.container}>
                            <ScrollView>
        
                  <View style={styles.formContainer}>
                    <TextInput placeholder="Business Phone Number" value={ChmRegNo} onChangeText={setChmRegNo} style={styles.input} editable={true}></TextInput>
                    
                    <TextInput placeholder="Product Name" value={ChmPhn} onChangeText={setChmPhn} style={styles.input} editable={true}></TextInput>
                   
                 
                    <TextInput placeholder="Product Description" value={ChmDesc} onChangeText={setChmDesc} style={styles.input} editable={true} multiline={true} // Enables multi-line input
          textAlignVertical="top">
                        
                      </TextInput>
                    
                    <TextInput placeholder="Enter Product Cost" value={Sign2Phn} onChangeText={setSign2Phn} keyboardType={"decimal-pad"} style={styles.input} editable={true}></TextInput>
                   

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