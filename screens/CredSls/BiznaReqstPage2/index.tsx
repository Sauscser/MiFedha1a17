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
            
            


            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal2Pal</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={CrdSlPlaceLnReq} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Request</Text>
            </Pressable>
            <Pressable onPress={CrdSlVw2DelLnReqs} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>View</Text>
            </Pressable>
            </View>
            </View>

            <View style={styles.acPressables}>
            <View >
            <Text style={styles.acPressableText}>Pal2Company</Text>
            </View>
            <View style = {{flexDirection:"row"}}>
            <Pressable onPress={CrdSlPlaceLnReq} style={styles.acNonLnsPressables}>
              <Text style={styles.acPressableText}>Request</Text>
            </Pressable>
            <Pressable onPress={CrdSlVw2DelLnReqs} style={styles.acNonLnsPressables}>
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