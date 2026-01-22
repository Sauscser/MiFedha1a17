import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

const MyAccount = props => {
  const navigation = useNavigation();

  const Section = ({ title, options }) => (
    <View style={styles.clientsView}>
      <Text style={styles.salesText}>{title}</Text>
      <View style={styles.viewForClientsAndTitle}>
        {options.map(({ label, onPress, style }, index) => (
          <Pressable key={index} onPress={onPress} style={style || styles.viewForClientsPressables}>
            <LinearGradient
              colors={['#FF8C00', '#00BFFF']} // Orange to Sky Blue gradient
              start={{ x: 0, y: 0 }} // Gradient starts from the top left (vertical direction)
              end={{ x: 1, y: 1 }}   // Gradient ends at the bottom right (vertical and horizontal)
              style={styles.clientsPressableGradient}
            >
              <Text style={styles.salesPressableText}>{label}</Text>
            </LinearGradient>
          </Pressable>
        ))}
      </View>
    </View>
  );
  



  const PayPalDposit = () => {
    navigation.navigate('PayPalDposit');
  };

  const Mpesa = () => {
    navigation.navigate('Mpesa');
  };

  const PaystackTNC = () => {
    navigation.navigate('PaystackTNC');
  };

  

  return (
    <SafeAreaView>
      <ScrollView>
      <LinearGradient
            colors={['#FF8C00', 'skyblue', 'white']} // Linear gradient for orange hues
            start={{ x: 0, y: 0 }} // Gradient starts from the top left (vertical direction)
            end={{ x: 1, y: 1 }}
            style={styles.clientsPressableGradient}
          >
            
        <Section 
          title="Proceed"
          options={[
            
         /*   { label: 'PayPal',onPress: PayPalDposit, style: styles.ClientsPressables },  */
            
            { label: 'MPesa/Airtel/Cards', onPress: PaystackTNC, style: styles.ClientsPressables },
           
          ]}
        />



        

        

</LinearGradient>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default MyAccount;