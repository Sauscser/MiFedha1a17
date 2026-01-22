import React, {useEffect, useState} from 'react';

import {createCompany, createCompanyUrls} from '../../src/graphql/mutations';
import { getCompany} from '../../src/graphql/queries';
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
import styles from './styles'



const AdminSignIn = (props) => {  
  const navigation = useNavigation();

  const [PWOnes, setPWOne] = useState("");
  const [PWTwos, setPWTwo] = useState(""); 
  const [ownr, setownr] = useState(null);  
 
 
  const CompCreation = async () => {
    try {
      await API.graphql(
        graphqlOperation(createCompanyUrls, {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2Ulr",
            Url1: "String",
  Url2: "String",
  Url3: "String",
  Url4: "String",
  Url5: "String",
  Url6: "String",
  Url7: "String",
  Url8: "String",
  Url9: "String",
  Url10: "String",
  
  Url11: "String",
  Url12: "String",
  Url13: "String",
  Url14:"String",
  Url15:"String",
  Url16:"String",
  Url17:"String",

  Url18: "String",
  Url19: "String",
  Url20: "String",
  Url21: "String",
  Url22: "String",
  Url23: "String",
  Url24: "String",
  Url25: "String",
  Url26: "String",
  Url27: "String",
  
  Url28: "String",
  Url29: "String",
  Url30: "String",
  
  Url31: "String",
  Url32: "String",
  Url33: "String",
  Url34: "String",
  Url35: "String",
  Url36: "String",
  Url37: "String",
  Url38: "String",
  Url39: "String",
  Url40: "String",
  
  Url41: "String",
  Url42: "String",
  Url43: "String",
  Url44:"String",
  Url45:"String",
  Url46:"String",
  Url47:"String",

  Url48: "String",
  Url49: "String",
  Url50: "String",
  Url51: "String",
  Url52: "String",
  Url53: "String",
  Url54: "String",
  Url55: "String",
  Url56: "String",
  Url57: "String",
  
  Url58: "String",
  Url59: "String",
  Url60: "String",

  Url61: "String",
  Url62: "String",
  Url63: "String",
  Url64: "String",
  Url65: "String",
  Url66: "String",
  Url67: "String",
  Url68: "String",
  Url69: "String",
  Url70: "String",
  
  Url71: "String",
  Url72: "String",
  Url73: "String",
  Url74:"String",
  Url75:"String",
  Url76:"String",
  Url77:"String",

  Url78: "String",
  Url79: "String",
  Url80: "String",
  Url81: "String",
  Url82: "String",
  Url83: "String",
  Url84: "String",
  Url85: "String",
  Url86: "String",
  Url87: "String",
  
  Url88: "String",
  Url89: "String",
  Url90: "String",
  
  Url91: "String",
  Url92: "String",
  Url93: "String",
  Url94:"String",
  Url95:"String",
  Url96:"String",
  Url97:"String",

  Url98: "String",
  Url99: "String",
  Url100: "String"
          },
        }),
      );

      
      
    } catch (error) {
      console.log(error)
     
     
    }

       
      };

   



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


         return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
                
        
                
                  <TouchableOpacity
                    onPress={CompCreation}
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