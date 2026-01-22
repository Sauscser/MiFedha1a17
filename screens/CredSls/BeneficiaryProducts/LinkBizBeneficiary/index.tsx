import React, {useEffect, useState} from 'react';
import { createBenProd2, createLinkBeneficiary2} from '../../../../src/graphql/mutations';
import { getBenProd2, getBizna, getSMAccount, listPersonels,   } from '../../../../src/graphql/queries';
import {Auth,  graphqlOperation, API} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  
  
  TextInput,
  ScrollView,
  StyleSheet,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

export type UserReg = {
  usr:String;
  
}

const CreateChama = (props:UserReg) => {

  const{usr} = props;

  


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
const [nationalId, setNationalid] = useState('');
    const[eml, setEml] =useState("");
  
    
    
    const [saRegNo, setSARegNo] = useState('');
    const [BkName, setBkName] = useState('');
    const [BkAcNu, setBkAcNu] = useState('');
    const[lat, setLat] = useState('');
    const[twn, settwn] = useState("");
    const[lon, setLon] = useState("");

  const WorkerID = ChmDesc+ChmRegNo
  const route = useRoute();
const ProdId = route.params.id

    
      const ChckUsrExistence = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
        const ProdIDX = ChmRegNo+ProdId+ChmNm
      
        try {
          const UsrDtls:any = await API.graphql(
            graphqlOperation(getSMAccount, { awsemail:userInfo.attributes.email}),
                        
          )  
          const usrDtlxs = UsrDtls.data.getSMAccount;     
          const pwsz = UsrDtls.data.getSMAccount.pw;

          const ChckPhnUse = async () => {
                      try {
                        const UsrDtlss:any = await API.graphql(
                          graphqlOperation(listPersonels,
                            { filter: {
                                
                              phoneKontact: { eq: userInfo.attributes.email},
                              BusinessRegNo:{eq: ChmRegNo}
                                            
                              }}
                          )
                        )

                        const PckBenProdDtls = async () => {
                         
                          try {
                            const BznaDtlsx:any = await API.graphql(
                              graphqlOperation(getBenProd2, { id:route.params.id}),
                                          
                            )

                            const prodDescz = BznaDtlsx.data.getBenProd2.prodDesc;
              const prodCostz = BznaDtlsx.data.getBenProd2.prodCost;
              const prodNamez = BznaDtlsx.data.getBenProd2.prodName;
              /*
              ProdCreatorAc
              */
          const benefactorPhone = BznaDtlsx.data.getBenProd2.benefactorPhone;
          const ProdCreatorName = BznaDtlsx.data.getBenProd2.creatorName;
          
          const PckBeneficiaryDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
              const BznaDtlsx:any = await API.graphql(
                graphqlOperation(getBizna, { BusKntct:ChmNm}),
                            
              )

              const busNamex = BznaDtlsx.data.getBizna.busName;

              const PckBiznaDtls = async () => {
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try {
                  const BznaDtls:any = await API.graphql(
                    graphqlOperation(getBizna, { BusKntct:ChmRegNo}),
                                
                  )
    
              const pws = BznaDtls.data.getBizna.pw;
              const ownerz = BznaDtls.data.getBizna.owner;
              const BiznaNames = BznaDtls.data.getBizna.busName;
              const Admin1 = BznaDtls.data.getBizna.Admin1;
              const Admin2 = BznaDtls.data.getBizna.Admin2;
              const Admin3 = BznaDtls.data.getBizna.Admin3;
              const Admin4 = BznaDtls.data.getBizna.Admin4;
              const Admin5 = BznaDtls.data.getBizna.Admin5;
              const Admin6 = BznaDtls.data.getBizna.Admin6;
              const Admin7 = BznaDtls.data.getBizna.Admin7;
              const Admin8 = BznaDtls.data.getBizna.Admin8;
              const Admin9 = BznaDtls.data.getBizna.Admin9;
              const Admin10 = BznaDtls.data.getBizna.Admin10;
              const Admin11 = BznaDtls.data.getBizna.Admin11;
              const Admin12 = BznaDtls.data.getBizna.Admin12;
              const Admin13 = BznaDtls.data.getBizna.Admin13;
              const Admin14 = BznaDtls.data.getBizna.Admin14;
              const Admin15 = BznaDtls.data.getBizna.Admin15;
              const Admin16 = BznaDtls.data.getBizna.Admin16;
              const Admin17 = BznaDtls.data.getBizna.Admin17;
              const Admin18 = BznaDtls.data.getBizna.Admin18;
              const Admin19 = BznaDtls.data.getBizna.Admin19;
              const Admin20 = BznaDtls.data.getBizna.Admin20;
              const Admin21 = BznaDtls.data.getBizna.Admin21;
              const Admin22 = BznaDtls.data.getBizna.Admin22;
              const Admin23 = BznaDtls.data.getBizna.Admin23;
              const Admin24 = BznaDtls.data.getBizna.Admin24;
              const Admin25 = BznaDtls.data.getBizna.Admin25;
              const Admin26 = BznaDtls.data.getBizna.Admin26;
              const Admin27 = BznaDtls.data.getBizna.Admin27;
              const Admin28 = BznaDtls.data.getBizna.Admin28;
              const Admin29 = BznaDtls.data.getBizna.Admin29;
              const Admin30 = BznaDtls.data.getBizna.Admin30;
              const Admin31 = BznaDtls.data.getBizna.Admin31;
              const Admin32 = BznaDtls.data.getBizna.Admin32;
              const Admin33 = BznaDtls.data.getBizna.Admin33;
              const Admin34 = BznaDtls.data.getBizna.Admin34;
              const Admin35 = BznaDtls.data.getBizna.Admin35;
              const Admin36 = BznaDtls.data.getBizna.Admin36;
              const Admin37 = BznaDtls.data.getBizna.Admin37;
              const Admin38 = BznaDtls.data.getBizna.Admin38;
              const Admin39 = BznaDtls.data.getBizna.Admin38;
              const Admin40 = BznaDtls.data.getBizna.Admin40;
              const Admin41 = BznaDtls.data.getBizna.Admin41;
              const Admin42 = BznaDtls.data.getBizna.Admin42;
              const Admin43 = BznaDtls.data.getBizna.Admin43;
              const Admin44 = BznaDtls.data.getBizna.Admin44;
              const Admin45 = BznaDtls.data.getBizna.Admin45;
              const Admin46 = BznaDtls.data.getBizna.Admin46;
              const Admin47 = BznaDtls.data.getBizna.Admin47;
              const Admin48 = BznaDtls.data.getBizna.Admin48;
              const Admin49 = BznaDtls.data.getBizna.Admin49;
              const Admin50 = BznaDtls.data.getBizna.Admin50;
              
              
      const onCreateNewSMAc = async () => {
        
        try {
         const resp = await API.graphql(
          graphqlOperation(createLinkBeneficiary2, {
          input: {

            
            beneficiaryID: ProdIDX,
            prodID: route.params.id,
            benefitsID: ProdId,    
benefactorAc: ChmRegNo,
/*ProdCreatorAc*/
benefactorPhone: benefactorPhone,
/*Beneficiary Account*/
beneficiaryAc:ChmNm,
/*Beneficiary Name*/
beneficiaryPhone:busNamex,
creatorEmail: userInfo.attributes.email,
prodName: prodNamez,
/*Benefactor Name */
creatorName: BiznaNames,
owner: usrDtlxs.name,
prodCost: prodCostz,
benefitsAmount: 0,
/*ProdCreatorName */
beneficiaryType: "Biz",
prodDesc: prodDescz,
benefitStatus: "Active",
amount: 0
            
                  },
                }),
              );
              if (resp?.data?.createLinkBeneficiary2)
              {
                Alert.alert("Beneficiary linked successfully")
              }
            } catch (error) {
              console.log(error)
              if (error){
                Alert.alert("Error! retry or update App!")
                return
              }
            
            }
            
            
          };
          if (pwsz!==pword){
            Alert.alert("Wrong password")
          }

           

          else if (ownerz === userInfo.attributes.sub 
            ||
            Admin1 === userInfo.attributes.email
            ||
            Admin2 === userInfo.attributes.email 
            ||
            Admin3 === userInfo.attributes.email
            ||
            Admin4 === userInfo.attributes.email 
            ||
            Admin5 === userInfo.attributes.email
            ||
            Admin6 === userInfo.attributes.email 
            ||
            Admin7 === userInfo.attributes.email
            ||
            Admin8 === userInfo.attributes.email 
            ||
            Admin9 === userInfo.attributes.email
            ||
            Admin10 === userInfo.attributes.email 
            ||
            Admin11 === userInfo.attributes.email
            ||
            Admin12 === userInfo.attributes.email 
            ||
            Admin13 === userInfo.attributes.email
            ||
            Admin14 === userInfo.attributes.email 
            ||
            Admin14 === userInfo.attributes.email
            ||
            Admin15 === userInfo.attributes.email 
            ||
            Admin16 === userInfo.attributes.email
            ||
            Admin17 === userInfo.attributes.email 
            ||
            Admin18 === userInfo.attributes.email
            ||
            Admin19 === userInfo.attributes.email 
            ||
            Admin20 === userInfo.attributes.email
            ||
            Admin21 === userInfo.attributes.email 
            ||
            Admin22 === userInfo.attributes.email
            ||
            Admin23 === userInfo.attributes.email 
            ||
            Admin24 === userInfo.attributes.email
            ||
            Admin25 === userInfo.attributes.email 
            ||
            Admin26 === userInfo.attributes.email
            ||
            Admin27 === userInfo.attributes.email 
            ||
            Admin28 === userInfo.attributes.email
            ||
            Admin29 === userInfo.attributes.email 
            ||
            Admin30 === userInfo.attributes.email
            ||
            Admin31 === userInfo.attributes.email 
            ||
            Admin32 === userInfo.attributes.email
            ||
            Admin33 === userInfo.attributes.email 
            ||
            Admin34 === userInfo.attributes.email
            ||
            Admin35 === userInfo.attributes.email 
            ||
            Admin36 === userInfo.attributes.email
            ||
            Admin37 === userInfo.attributes.email 
            ||
            Admin38 === userInfo.attributes.email
            ||
            Admin39 === userInfo.attributes.email 
            ||
            Admin40 === userInfo.attributes.email
            ||
            Admin41 === userInfo.attributes.email 
            ||
            Admin42 === userInfo.attributes.email
            ||
            Admin43 === userInfo.attributes.email 
            ||
            Admin44 === userInfo.attributes.email
            ||
            Admin45 === userInfo.attributes.email 
            ||
            Admin46 === userInfo.attributes.email
            ||
            Admin47 === userInfo.attributes.email 
            ||
            Admin48 === userInfo.attributes.email
            ||
            Admin49 === userInfo.attributes.email 
            ||
            Admin50 === userInfo.attributes.email 
            ){
             await onCreateNewSMAc();
          }
          else{
         
            Alert.alert("You are Neither the Creator/Admin of this business")
          }
      } catch (error) {
        
        if (error){Alert.alert("Error! Create a business first!")
      return}
      }
     
    }

    await PckBiznaDtls();

  } catch (error) {
        
    if (error){Alert.alert("Error! Create a business first!")
  return}
  }
 
}

await PckBeneficiaryDtls();

  } catch (error) {
        
    if (error){Alert.alert("Error! Create a business first!")
  return}
  }
      
}

await PckBenProdDtls();
      
  } catch (error) {
        
    if (error){Alert.alert("Error! Create a business first!")
  return}
  }
    
}

await ChckPhnUse(); 

    } catch (e) {
      console.error(e);

      if (e){Alert.alert("Error! Access denied!")
    return}
    }

    setIsLoading(false)
              setChmPhn('');
              setPW('');
              
              setChmDesc("")
              setChmNm("")
              setChmRegNo("")
              setMmbaID("")
              setSign2Phn("");
              setNationalid('');
                            
                  setPW('');
                  setName('');
                  setEml("");
                  setLat("");
                  setLon("");
                  setBkAcNu("");
                  setBkName("");
                  setPhoneContact('');
                  setSARegNo('');
                  settwn("")
  }

  useEffect(() =>{
          const BkNames=BkName
            if(!BkNames && BkNames!=="")
            {
              setBkName("");
              return;
            }
            setBkName(BkNames);
            }, [BkName]
             );
      
             useEffect(() =>{
              const BkAcNus=BkAcNu
                if(!BkAcNus && BkAcNus!=="")
                {
                  setBkAcNu("");
                  return;
                }
                setBkAcNu(BkAcNus);
                }, [BkAcNu]
                 );
      
                 useEffect(() =>{
                  const natId=nationalId
                    if(!natId && natId!=="")
                    {
                      setNationalid("");
                      return;
                    }
                    setNationalid(natId);
                    }, [nationalId]
                     );
      
             useEffect(() =>{
              const twns=twn
                if(!twns && twns!=="")
                {
                  settwn("");
                  return;
                }
                settwn(twns);
                }, [twn]
                 );
        
             useEffect(() =>{
              const pws=pword
                if(!pws && pws!=="")
                {
                  setPW("");
                  return;
                }
                setPW(pws);
                }, [pword]
                 );
        
                 useEffect(() =>{
                  const phn=phoneContact
                    if(!phn && phn!=="")
                    {
                      setPhoneContact("");
                      return;
                    }
                    setPhoneContact(phn);
                    }, [phoneContact]
                     );
        
                     useEffect(() =>{
                      const name=nam
                        if(!name && name!=="")
                        {
                          setName("");
                          return;
                        }
                        setName(name);
                        }, [nam]
                         );
      
                         useEffect(() =>{
                          const email=eml
                            if(!email && email!=="")
                            {
                              setEml("");
                              return;
                            }
                            setEml(email);
                            }, [eml]
                             );
                        
                             useEffect(() =>{
                              const lati=lat
                                if(!lati && lati!=="")
                                {
                                  setLat("");
                                  return;
                                }
                                setLat(lati);
                                }, [lat]
                                 );
                        
                                 useEffect(() =>{
                                  const long=lon
                                    if(!long && long!=="")
                                    {
                                      setLon("");
                                      return;
                                    }
                                    setLon(long);
                                    }, [lon]
                                     );
                        
                                     
                          
                                         useEffect(() =>{
                                          const saRN=saRegNo
                                            if(!saRN && saRN!=="")
                                            {
                                              setSARegNo("");
                                              return;
                                            }
                                            setSARegNo(saRN);
                                            }, [saRegNo]
                                             );
    
      useEffect(() =>{
        const MmbaIDs=MmbaID
          if(!MmbaIDs && MmbaIDs!=="")
          {
            setMmbaID("");
            return;
          }
          setMmbaID(MmbaIDs);
          }, [MmbaID]
           );
           
           useEffect(() =>{
        const ChmRegNos=ChmRegNo
          if(!ChmRegNos && ChmRegNos!=="")
          {
            setChmRegNo("");
            return;
          }
          setChmRegNo(ChmRegNos);
          }, [ChmRegNo]
           );
           
           

      useEffect(() =>{
        const ChmNms=ChmNm
          if(!ChmNms && ChmNms!=="")
          {
            setChmNm("");
            return;
          }
          setChmNm(ChmNms);
          }, [ChmNm]
           );

           useEffect(() =>{
            const ChmDescs=ChmDesc
              if(!ChmDescs && ChmDescs!=="")
              {
                setChmDesc("");
                return;
              }
              setChmDesc(ChmDescs);
              }, [ChmDesc]
               );

useEffect(() =>{
  const ChmPhns=ChmPhn
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [ChmPhn]
     );

     useEffect(() =>{
      const pws=pword
        if(!pws && pws!=="")
        {
          setPW("");
          return;
        }
        setPW(pws);
        }, [pword]
         );

         useEffect(() =>{
          const Sign2Phns=Sign2Phn
            if(!Sign2Phns && Sign2Phns!=="")
            {
              setSign2Phn("");
              return;
            }
            setSign2Phn(Sign2Phns);
            }, [Sign2Phn]
             );

        
          return (
                        <LinearGradient
                          colors={['#e58d29', 'skyblue']}
                          start={[0, 0]}
                          end={[1, 1]}
                          style={{ flex: 1 }}
                        >
                          <View style={styles.container}>
                            <ScrollView>
        
                  <View style={styles.formContainer}>
                  <TextInput
                     placeholder="Benefactor Business Number"
                      value={ChmRegNo}
                      onChangeText={setChmRegNo}
                      style={styles.input}
                      editable={true}></TextInput>
                      
                      <TextInput
                     placeholder="Beneficiary Business Number"
                      value={ChmNm}
                      onChangeText={setChmNm}
                      style={styles.input}
                      editable={true}></TextInput>
                    
                  

                   <View style={styles.passwordContainer}>
                                                                 <TextInput
                                                                   placeholder="Admin Main Account Password"
                                                               style={styles.passwordInput}
                                                                                                    
                                                               value={pword}
                                                               onChangeText={setPW}
                                                               secureTextEntry={!isPasswordVisible}
                                                               placeholderTextColor="#ccc"
                                                                       />
                                                               <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                                              <Ionicons name={isPasswordVisible ? 'eye' : 'eye-off'} size={24} color="gray" />
                                                               </TouchableOpacity>
                                                               </View>
                     
                                                              
                  <TouchableOpacity
                    onPress={ChckUsrExistence}
                    style={styles.button}>
                    {isLoading ? (
                                              <ActivityIndicator color="#fff" />
                                            ) : (
                                              <Text style={styles.locationText}>Submit</Text>
                                            )}
                                          </TouchableOpacity>
                                        </View>
                                      </ScrollView>
                                    </View>
                                  </LinearGradient>
                                );
                              };
                              
                              const styles = StyleSheet.create({
                                  gradient: {
                                    flex: 1,
                                  },
                                  container: {
                                    flex: 1,
                                    padding: 20,
                                  },
                                  loanTitleView: {
                                    marginBottom: 20,
                                    alignItems: 'center',
                                  },
                                  title: {
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                  },
                                  formContainer: {
                                    backgroundColor: '#ffffff',
                                    borderRadius: 10,
                                    padding: 20,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 4,
                                    elevation: 5,
                                  },
                                  input: {
                                    height: 45,
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    marginBottom: 15,
                                    borderRadius: 5,
                                    paddingLeft: 10,
                                  },
                                  button: {
                                    backgroundColor: '#e58d29',
                                    paddingVertical: 12,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    marginTop: 20,
                                  },
                                  locationContainer: {
                                    marginVertical: 10,
                                  },
                                  locationText: {
                                    fontSize: 16,
                                    color: '#333',
                                  },
                                  passwordContainer: { flexDirection: 'row', alignItems: 'center', 
                                      backgroundColor: '#fff', borderRadius: 8, marginBottom: 10, height:50 },
                              passwordInput: { flex: 1, padding: 12 },
                                });
        
        export default CreateChama;