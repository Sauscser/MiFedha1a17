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

  const SMDpsitsss = () => {
    navigation.navigate('ElimDpstss');
  };

  const ViewNonLnsRecs = () => {
    navigation.navigate('ViewNonLnsRecs');
  };

  const ViewNonLnsSents = () => {
    navigation.navigate('ViewNonLnsSents');
  };

  

  const SearchUser = () => {
    navigation.navigate('VwMakeLnReq');
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

  const BiznaReqstPage1 = () => {
    navigation.navigate('BiznaReqstPage1');
  };

  const BiznaReqstPage2 = () => {
    navigation.navigate('BiznaReqstPage2');
  };

  const PalProdsRequest = () => {
    navigation.navigate('PalProdsRequest');
  };

  


  const CrdSlPlaceLnReq = () => {
    navigation.navigate('BiznaReqstPage1');
  };

  const ChamaVw2DelLnReqs = () => {
    navigation.navigate('ChamaVw2DelLnReqs');
  };

  const ChamaPlaceLnReq = () => {
    navigation.navigate('Vw2SelectChm2Req');
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
          <Text style={styles.accountText}>Requests</Text>

          <View style={styles.viewForSalesPressables}>
            
            

          <Pressable onPress={PalProdsRequest} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal Requests</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            
            </View>
            </Pressable>

            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Group(Chama)</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={ChamaPlaceLnReq} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Request</Text>
            </Pressable>

            <Pressable onPress={ChamaVw2DelLnReqs} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>View</Text>
            </Pressable>
            
            </View>
            </View>



            <Pressable onPress={BiznaReqstPage1} style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>CredSale</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            
            </View>
            </Pressable>

            
           
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default MyAccount;