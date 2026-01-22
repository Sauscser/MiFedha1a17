import React from 'react';
import { SafeAreaView, ScrollView, View, Text, Pressable } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';

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



const MyLoanAccount = () => {

  const navigation = useNavigation()



  const VwAsBeneficiary = () => {
    navigation.navigate('VwAsBeneficiary');
  };


  const ViewBizBenefactorShares = () => {
    navigation.navigate('ViewBizBenefactorShares');
  };

 
  const VwAsBenefactors = () => {
    navigation.navigate('VwAsBenefactors');
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
          title="Benefit Shares"
          options={[
            
            { label: 'Benefactor', onPress: VwAsBenefactors, style: styles.ClientsPressables },
            { label: 'Beneficiary', onPress: VwAsBeneficiary, style: styles.ClientsPressables },
            
          ]}
        />
        
        

</LinearGradient>
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default MyLoanAccount;
