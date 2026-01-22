import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import styles from '../WithdrawalOptions/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyAccount = props => {
  const navigation = useNavigation();

  const SMDpsitsss = () => {
    navigation.navigate('ElimDpstss');
  };

  const ViewNonLnsRecs = () => {
    navigation.navigate('ViewNonLnsRecs');
  };

  const ViewNonLnsSents = () => {
    navigation.navigate('ViewNonLnsSents');
  };

  const Vw2DelLnReqs = () => {
    navigation.navigate('Vw2DelLnReqs');
  };

  const SearchUser = () => {
    navigation.navigate('VwMakeLnReq');
  };

  const goToCreateSMAc = () => {
    navigation.navigate('CreateSMAc');
  };

  const SMWthdrwlsss = () => {
    navigation.navigate('WithdrwFundsOptions');
  };

  const goWithdrwMny = () => {
    navigation.navigate('SMWthdFm');
  };

  const goToSMASndnonln = () => {
    navigation.navigate('Vw2SelectChmBeneficiary');
  };

  const UpdateSMPWss = () => {
    navigation.navigate('UpdateSMPWs');
  };

  const ViewSmAcss = () => {
    navigation.navigate('ElimAcs');
  };

  const LoanAds = () => {
    navigation.navigate('LoanAds');
  };

  const UpdateMainAc = () => {
    navigation.navigate('UpdateMainAc');
  };

  const PayPalDposit = () => {
    navigation.navigate('VwAcBfDpst');
  };

  const VwPlLn2Remove = () => {
    navigation.navigate('VwPlLn2Remove');
  };

  return (
    <SafeAreaView>
      <View
        
        style={styles.image}>



        
          <View style={styles.viewForSalesPressables}>
            
            

            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Withdrawal Options</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={goWithdrwMny} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>MFNdogo</Text>
            </Pressable>
            <Pressable onPress={SMWthdrwlsss} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Equity</Text>
            </Pressable>
            </View>
            </View>

           
          
        </View>


      </View>
    </SafeAreaView>
  );
};

export default MyAccount;