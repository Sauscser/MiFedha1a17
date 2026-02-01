import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


import styles from './styles';



export interface SMAccount {
    SMAc: {
      sokokntct: string,
      
      id: string,
      sokoname:string,
      sokoprice: number,
      
    
      sokolnprcntg:number
      sokodesc:string,
      sokolpymntperiod:number,
              
    }}

const ViewSMDeposts = (props:SMAccount) => {
   const {
      SMAc: {
         
         sokokntct,  
         
         sokoname,
         sokoprice,
        
        id,
         sokodesc,  
         sokolnprcntg,
         sokolpymntperiod,

                 
   }} = props ;

   const navigation = useNavigation();
   const SndChmMmbrMny = () => {
      navigation.navigate ("DtldSalesInfo", {id})
   }
   
    return (
      <TouchableOpacity 
      onPress={SndChmMmbrMny}
      style = {styles.pageContainer}> 

      <Text style={styles.prodInfo}><Text style={styles.label}>Bizna Contact:</Text> {sokokntct}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Name:</Text> {sokoname}</Text>
           
            <Text style={styles.prodInfo}><Text style={styles.label}>Item Price:</Text> KES {sokoprice.toLocaleString()}</Text>
            <Text style={styles.prodInfo}><Text style={styles.label}>Discount Percentage:</Text> {sokolnprcntg.toLocaleString()}</Text>
           <Text style={styles.prodDesc}>{sokodesc}</Text>   

                    </TouchableOpacity>
    );
}; 

export default ViewSMDeposts