import React, {useState, useRef,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

export interface SMAccount {
  SMAc: {
    id: string;
    recPhn: string;
    senderPhn: string;
    amount: number;
    description:string;
    RecName: string;
    SenderName: string;
    status: string;

          // photo url

    owner: string;
  };
}

const ViewSMDeposts = 
({ SMAc }: SMAccount) => {
  const {
     id,
    senderPhn,
    amount,
    description,
    RecName,
    SenderName,
    status,

          // Item ID

    owner,
  } = SMAc;

  const [itemPhotoz, setitemPhotoz] = useState('');
  const [loading, setLoading] = useState(false);
  
  
  const navigation = useNavigation();
  
  const RequestTransport = () => {
      navigation.navigate ("RequestTransport", {id})
   } 

  
  return (
    <ScrollView contentContainerStyle={styles.pageContainer}>
      <TouchableOpacity style={styles.card} onPress={RequestTransport}>
       

        <View style={styles.infoSection}>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Seller Name:</Text> {RecName}
          </Text>
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Buyer Name:</Text> {SenderName}
          </Text>
          
          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Purchase Despription:</Text> {description}
          </Text>

          <Text style={styles.prodInfo}>
            <Text style={styles.label}>Purchase ID:</Text> {owner}
          </Text>
         
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ViewSMDeposts;
