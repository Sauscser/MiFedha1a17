import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, FlatList, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
const MyAccount = props => {
  const navigation = useNavigation();
  const Section = ({
    title,
    options
  }) => <View style={styles.clientsView}>
      <Text style={styles.salesText}>{title}</Text>
      <View style={styles.viewForClientsAndTitle}>
        {options.map(({
        label,
        onPress,
        style
      }, index) => <Pressable key={index} onPress={onPress} style={style || styles.viewForClientsPressables}>
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
  const Auditor = () => {
    navigation.navigate('Auditor');
  };
  const FunderClearBill = () => {
    navigation.navigate('FunderClearBill');
  };
  const consumerApproveVoucher = () => {
    navigation.navigate('consumerApproveVoucher');
  };
  const Vw2GenerateVoucher = () => {
    navigation.navigate('Vw2GenerateVoucher');
  };
  const Vw2LinkSeller = () => {
    navigation.navigate('Vw2LinkSeller');
  };
  const CreateCOMBContract = () => {
    navigation.navigate('CreateCOMBContract');
  };
  const AddCOMBPersonel = () => {
    navigation.navigate('AddCOMBPersonel');
  };
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
          label: 'Register COMB Officer - Institution Owner',
          onPress: AddCOMBPersonel,
          style: styles.ClientsPressables
        }, {
          label: 'Create COMB Contract - Funder',
          onPress: CreateCOMBContract,
          style: styles.ClientsPressables
        }, {
          label: 'Link Seller - Consumer',
          onPress: Vw2LinkSeller,
          style: styles.ClientsPressables
        }, {
          label: 'Generate COMB Voucher - Seller',
          onPress: Vw2GenerateVoucher,
          style: styles.ClientsPressables
        }, {
          label: 'Approve COMB Voucher - Consumer',
          onPress: consumerApproveVoucher,
          style: styles.ClientsPressables
        }, {
          label: 'Clear COMB Bills - Funder',
          onPress: FunderClearBill,
          style: styles.ClientsPressables
        }, {
          label: 'Audit COMB Contracts - Auditor',
          onPress: Auditor,
          style: styles.ClientsPressables
        }]} />

      </LinearGradient>
      </ScrollView>
      
    </SafeAreaView>;
};
export default MyAccount;