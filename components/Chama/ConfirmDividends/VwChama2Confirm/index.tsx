import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './styles';

export interface ChamaMmbrshpInfo {
  ChamaMmbrshpDtls: {
    
    groupContact: string;
   
    memberName: string;
    groupName: string;
   
  };
}

const ChmMbrShpInfo = (props: ChamaMmbrshpInfo) => {
  const {
    ChamaMmbrshpDtls: {

      groupContact,
      groupName,
     
      memberName,
     
    },
  } = props;

  

  const navigation = useNavigation();
  const Vw2Confirm = () => navigation.navigate('ChamaRemts', { groupContact });
  
  return (
    <View style={styles.pageContainer}>
      <Pressable onPress={Vw2Confirm} style={styles.card}>
        <Text style={styles.prodName}>{memberName}</Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Group Name:</Text> {groupName}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Member Name:</Text> {memberName}
        </Text>
        <Text style={styles.prodInfo}>
          <Text style={styles.label}>Click to proceed:</Text>
        </Text>
        
      </Pressable>

   
    </View>
  );
};

export default ChmMbrShpInfo;
