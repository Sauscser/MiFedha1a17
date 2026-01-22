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
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyAccount = props => {
  const navigation = useNavigation();

  const PlaceLnReq = () => {
    navigation.navigate('PlaceLnReq');
  };

  const PlaceLnReq2 = () => {
    navigation.navigate('PlaceLnReq2');
  };

  const PlaceLnReq3 = () => {
    navigation.navigate('PlaceLnReq3');
  };

  

  const PlaceLnReq4 = () => {
    navigation.navigate('PlaceLnReq4');
  };

  const goToCreateSMAc = () => {
    navigation.navigate('CreateSMAc');
  };

  const SMWthdrwlsss = () => {
    navigation.navigate('ElimWthdrwlss');
  };

  const goWithdrwMny = () => {
    navigation.navigate('SMWthdFm');
  };

  const goToSMASndnonln = () => {
    navigation.navigate('SendNonLnss');
  };

  const UpdateSMPWss = () => {
    navigation.navigate('UpdateSMPWs');
  };

  const CrdSlVw2DelLnReqs = () => {
    navigation.navigate('CrdSlVw2DelLnReqs');
  };

  const CrdSlPlaceLnReq = () => {
    navigation.navigate('CrdSlPlaceLnReq');
  };

  const ChamaVw2DelLnReqs = () => {
    navigation.navigate('ChamaVw2DelLnReqs');
  };

  const ChamaPlaceLnReq = () => {
    navigation.navigate('ChamaPlaceLnReq');
  };

  const Vw2DelLnReqs = () => {
    navigation.navigate('Vw2DelLnReqs');
  };

  const VwMakeLnReq = () => {
    navigation.navigate('PlaceLnReq');
  };

  

  return (
    <SafeAreaView>
      <View
        
        style={styles.image}>


        <View style={styles.accountView}>
          <Text style={styles.accountText}>Request Loans</Text>

          <View style={styles.viewForSalesPressables}>
            
            

            

            



            <Pressable onPress={PlaceLnReq} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Biz2Pal</Text>
            </View>
            
            </Pressable>

            <Pressable onPress={PlaceLnReq2} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Biz2Biz</Text>
            </View>
            
            </Pressable>

            <Pressable onPress={PlaceLnReq3} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal2Biz</Text>
            </View>
            
            </Pressable>

            <Pressable onPress={PlaceLnReq4} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal2Pal</Text>
            </View>
            
            </Pressable>
           
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default MyAccount;