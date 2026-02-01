import React from 'react';
import {View, Text,    ScrollView, Pressable} from 'react-native';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export interface ChamaRemitInfo {
    ChamaRemitDtls: {
      groupContact: string,
      groupName: string,
      ChamaNMember:string,
      
    }}

const ChmRemitInfo = (props:ChamaRemitInfo) => {
   const {
      ChamaRemitDtls: {
         groupContact,
         ChamaNMember,
         groupName,
         
       
   }} = props ;

   
   const ContriToMmbr = props.ChamaRemitDtls;
   const navigation = useNavigation();

   

   const FetchGrpLonsSts = () => {
    navigation.navigate("VwChamaMembers", {groupContact});
  };
   
   
    return (
       /* <Pressable 
        onPress={go2Contri2Mbr}
        style = {styles.container}>       </Pressable>       
            */
            <Pressable 
        onPress={FetchGrpLonsSts} style = {styles.pageContainer}>
            <View style={styles.card}>
       
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Name: </Text> {groupName}</Text>
        <Text style={styles.prodInfo}><Text style={styles.label}>Group Number: </Text> {groupContact}</Text>
        
        <Text style={styles.prodDesc}>Click to Proceed</Text>
      </View>
                  
        </Pressable>
    );
}; 

export default ChmRemitInfo