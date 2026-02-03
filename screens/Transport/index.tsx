import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, FlatList, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
const MyAccount = (props: any) => {
  const navigation = useNavigation<any>();
  const Section = ({
    title,
    options
  }: { title: string; options: any[] }) => <View style={styles.clientsView}>
      <Text style={styles.salesText}>{title}</Text>
      <View style={styles.viewForClientsAndTitle}>
        {options.map(({
        label,
        onPress,
        style
      }, index: number) => <Pressable key={index} onPress={onPress} style={style || styles.viewForClientsPressables}>
            <LinearGradient colors={['#FF8C00', '#00BFFF']} // Orange to Sky Blue gradient
        start={{
          x: 0,
          y: 0
        }} // Gradient starts from the top left (vertical direction)
        end={{
          x: 1,
          y: 1
        }} // Gradient ends at the bottom right (vertical and horizontal)
        style={styles.clientsPressableGradient}>
              <Text style={styles.salesPressableText}>{label}</Text>
            </LinearGradient>
          </Pressable>)}
      </View>
    </View>;
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
  const goToSMASndnonln = () => {
    navigation.navigate('Vw2SelectChmBeneficiary');
  };
  const AcceptRideRequest = () => {
    navigation.navigate('AcceptRideRequest');
  };
  const PassengerRequestRide = () => {
    navigation.navigate('PassengerRequestRide');
  };
  const VwTransportAccount = () => {
    navigation.navigate('VwTransportAccount');
  };
  const VwBiz2DispatchDelivery = () => {
    navigation.navigate('VwBiz2DispatchDelivery');
  };
  const ReceiveDelivery = () => {
    navigation.navigate('ReceiveDelivery2');
  };
  const AcceptTransportRequest = () => {
    navigation.navigate('AcceptTransportRequest');
  };
  const VwSalesDtls4Transport = () => {
    navigation.navigate('VwSalesDtls4Transport');
  };
  const RegisterTransport = () => {
    navigation.navigate('RegisterTransport');
  };

  const nav: any = navigation;
  nav.navigate("Homes", { screen: "RegisterTransport" });

  return <SafeAreaView>
      <ScrollView>
      <LinearGradient colors={['#FF8C00', 'skyblue', 'white']} // Linear gradient for orange hues
      start={{
        x: 0,
        y: 0
      }} // Gradient starts from the top left (vertical direction)
      end={{
        x: 1,
        y: 1
      }} style={styles.clientsPressableGradient}>
            
        <Section title="Account" options={[
        /*  { label: 'Deposit Money', onPress: DepositOptions, style: styles.ClientsPressables },
        */
        {
          label: 'Register Transport - Transporter',
          onPress: RegisterTransport,
          style: (styles as any).ClientsPressables
        }, {
          label: 'View Account: Reset Location, Delete Account, Share Revenue, View Transport Revenue earnings and shares - Transporter',
          onPress: VwTransportAccount,
          style: styles.ClientsPressables
        }, {
          label: 'Ask for Transport - Buyer',
          onPress: VwSalesDtls4Transport,
          style: styles.ClientsPressables
        }, {
          label: 'View Transport Requests to: Accept - Transporter',
          onPress: AcceptTransportRequest,
          style: styles.ClientsPressables
        }, {
          label: 'View Transport Requests to: Receive Delivery, Cancel Delivery Request, change delivery Location - Buyer',
          onPress: ReceiveDelivery,
          style: styles.ClientsPressables
        }, {
          label: 'View Transport Requests to: Dispatch Delivery - Seller',
          onPress: VwBiz2DispatchDelivery,
          style: styles.ClientsPressables
        }, {
          label: 'Customer/Passenger',
          onPress: PassengerRequestRide,
          style: styles.ClientsPressables
        }, {
          label: 'Rider',
          onPress: AcceptRideRequest,
          style: styles.ClientsPressables
        }]} />

      </LinearGradient>
      </ScrollView>
      
    </SafeAreaView>;
};
export default MyAccount;