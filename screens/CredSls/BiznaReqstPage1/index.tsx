import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import styles from './styles';
const MyAccount = () => {
  const navigation = useNavigation();
  const goToScreen = (screen: string) => {
    navigation.navigate(screen);
  };
  return <SafeAreaView style={{
    flex: 1
  }}>
      <View style={styles.image}>
        <View style={styles.accountView}>
          <Text style={styles.accountText}>Request Loans</Text>

          <View style={styles.viewForSalesPressables}>
            <Pressable onPress={() => goToScreen('PlaceLnReq')} style={styles.acPressables}>
              <Text style={styles.acPressableText}>Biz2Pal</Text>
            </Pressable>

            <Pressable onPress={() => goToScreen('PlaceLnReq2')} style={styles.acPressables}>
              <Text style={styles.acPressableText}>Biz2Biz</Text>
            </Pressable>

            <Pressable onPress={() => goToScreen('PlaceLnReq3')} style={styles.acPressables}>
              <Text style={styles.acPressableText}>Pal2Biz</Text>
            </Pressable>

            <Pressable onPress={() => goToScreen('PlaceLnReq4')} style={styles.acPressables}>
              <Text style={styles.acPressableText}>Pal2Pal</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>;
};
export default MyAccount;