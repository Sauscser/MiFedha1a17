import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import styles from './styles';

export interface SMAccount {
  SMAc: {
    id: string;
    sellerName: string;
    buyerName: string;
    distance: number;
    
    orderCost: number;
    buyerContact: string;
    transportRequest: string;
   deliveryDesc:string
   deliveryCost: number;
   engagementStatus: string;
    
  };
}

const ViewSMDeposts = ({ SMAc }: SMAccount) => {
  const {
    id,
    engagementStatus,
    sellerName,
    buyerName,
   deliveryCost,
    distance,
    orderCost,
    buyerContact,
    transportRequest,
    deliveryDesc
  
  } = SMAc;

  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <View style={styles.pageContainer}>
       

        <View style={styles.card}>
         
         <Text style={styles.prodInfo}> 
                         {sellerName} to {buyerName}
                         || Aerial Distance: {distance} Kilometer ||
                         Order Total Cost: Ksh. {orderCost} || TransportCost:
                          Ksh. {deliveryCost}
                         || Contact: {buyerContact} || {transportRequest} || {engagementStatus}
                       </Text>
                      
                       <Text style = {styles.prodDesc}>Order Desciption: {deliveryDesc}</Text>
         
             </View>
      </View>
    </ScrollView>
  );
};

export default ViewSMDeposts;
