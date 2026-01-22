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

  const PlaceLnReqB2P = () => {
    navigation.navigate('PlaceLnReqB2P');
  };

  const PlaceLnReqP2P = () => {
    navigation.navigate('PlaceLnReqP2P');
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

  const Vw2DelLnReqsBiz = () => {
    navigation.navigate('Vw2DelLnReqsBiz');
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
          <Text style={styles.accountText}>Request </Text>

          <View style={styles.viewForSalesPressables}>
           


            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Company</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={PlaceLnReqB2P} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Request</Text>
            </Pressable>

            <Pressable onPress={Vw2DelLnReqsBiz} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>View</Text>
            </Pressable>
            
            </View>
            </View>
            

            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={PlaceLnReqP2P} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Request</Text>
            </Pressable>

            <Pressable onPress={Vw2DelLnReqs} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>View</Text>
            </Pressable>
            
            </View>
            </View>
           
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default MyAccount;