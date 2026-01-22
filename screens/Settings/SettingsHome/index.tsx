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

const SettinsHm = props => {
  const navigation = useNavigation();

  const crtAdmin = () => {
    navigation.navigate('CrtAdmin');
  };

  const DeactAdmss = () => {
    navigation.navigate('DeactAdms');
  };

  const Passwordssss = () => {
    navigation.navigate('Passwordsss');
  };

  const VwCompDtlsss = () => {
    navigation.navigate('VwCompDtlss');
  };

  const Aboutsss = () => {
    navigation.navigate('Aboutss');
  };

  const Alertsss = () => {
    navigation.navigate('Alertss');
  };
  const Contactssss = () => {
    navigation.navigate('Contactsss');
  };

  const Maximumsss = () => {
    navigation.navigate('Maximumss');
  };
  const Policysss = () => {
    navigation.navigate('Policyss');
  };

  const Privacysss = () => {
    navigation.navigate('Privacyss');
  };
  const Recommendationssss = () => {
    navigation.navigate('Recommendationsss');
  };

  const TCsss = () => {
    navigation.navigate('TCss');
  };
  const TransactionFeesss = () => {
    navigation.navigate('TransactionFeess');
  };

 

  const Commissionsss = () => {
    navigation.navigate('Commissionss');
  };

  const UpdtVatComsss = () => {
    navigation.navigate('UpdtVatComss');
  };

  const CreateExRates = () => {
    navigation.navigate('CreateExRates');
  };  

  const UrlLinks = () => {
    navigation.navigate('UrlLinks');
  };  
  
  const RegBankAdmin = () => {
    navigation.navigate('RegBankAdmin');
  };

  const GroupControlTable = () => {
    navigation.navigate('GroupControlTable');
  };
   
  

  return (
    <SafeAreaView>
     
        
          <View style={styles.adminImage}>
          
            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Clients</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
               

                  <View style={styles.viewForClientsPressables}>
                    

                    <Pressable
                      onPress={RegBankAdmin}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Create Bank Admin</Text>
                    </Pressable>

                    
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                 

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={Passwordssss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>UpdtPw</Text>
                    </Pressable>

                    <Pressable
                      onPress={Privacysss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        UpdtPrivacy
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
               

                  <View style={styles.viewForClientsPressables}>
                   

                    <Pressable
                      onPress={Maximumsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      UpdtMaxs
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Clients</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  
                  <View style={styles.viewForClientsPressables}>
                   

                    <Pressable
                      onPress={TCsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        UpdtTC
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={Alertsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>UpdtAlert</Text>
                    </Pressable>

                    <Pressable
                      onPress={Aboutsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        UpdtAbt
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                 
                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={Policysss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>UpdtPolicy</Text>
                    </Pressable>

                    <Pressable
                      onPress={Commissionsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      UpdtCom
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Clients</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  
                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={DeactAdmss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>DeactiveAdm</Text>
                    </Pressable>

                    <Pressable
                      onPress={VwCompDtlsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        ViewComp
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={UpdtVatComsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        WithdrwVAT
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={CreateExRates}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        CreateExRate
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={UrlLinks}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Add URL
                      </Text>
                    </Pressable>


                   
                  </View>
                </View>

            

                
                
              </View>
            </View>


            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Clients</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  
                  <View style={styles.viewForClientsPressables}>
                  <Pressable
                      onPress={crtAdmin}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Create MiFedha Admin</Text>
                    </Pressable>
                    <Pressable
                      onPress={GroupControlTable}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        GrpCntrl
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={TransactionFeesss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>UpdtTrsnctnFee</Text>
                    </Pressable>

                    <Pressable
                      onPress={Recommendationssss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        UpdtRecom
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={Contactssss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>UpdtContcts</Text>
                    </Pressable>


                   
                  </View>
                </View>

            

                
                
              </View>
            </View>



    </View> 
    </SafeAreaView>
  );
};

export default SettinsHm;