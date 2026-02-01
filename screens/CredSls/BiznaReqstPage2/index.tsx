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
            <View style={styles.acPressables}>
              <Text style={styles.acPressableText}>Pal2Pal</Text>
              <View style={{
              flexDirection: "row"
            }}>
                <Pressable onPress={() => goToScreen('CrdSlPlaceLnReq')} style={styles.acNonLnsPressables}>
                  <Text style={styles.acPressableText}>Request</Text>
                </Pressable>
                <Pressable onPress={() => goToScreen('CrdSlVw2DelLnReqs')} style={styles.acNonLnsPressables}>
                  <Text style={styles.acPressableText}>View</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.acPressables}>
              <Text style={styles.acPressableText}>Pal2Company</Text>
              <View style={{
              flexDirection: "row"
            }}>
                <Pressable onPress={() => goToScreen('CrdSlPlaceLnReq')} style={styles.acNonLnsPressables}>
                  <Text style={styles.acPressableText}>Request</Text>
                </Pressable>
                <Pressable onPress={() => goToScreen('CrdSlVw2DelLnReqs')} style={styles.acNonLnsPressables}>
                  <Text style={styles.acPressableText}>View</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>;
};
export default MyAccount;