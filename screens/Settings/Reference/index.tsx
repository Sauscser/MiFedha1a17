import React, { useEffect, useState } from 'react';
import { updateCompany, updateGroup, updateGrpMembers, updateSMAccount } from '../../../src/graphql/mutations';
import { getCompany, getGroup, getGrpMembers, getSMAccount } from '../../../src/graphql/queries';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ImageBackground, Pressable, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { updateBankAdmin } from '../../../src/graphql/mutations';
const UpdtSMPW = props => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [ownr, setownr] = useState(null);
  const [names, setName] = useState(null);
  const [email, setAWSEmail] = useState(null);
  const route = useRoute();
  const moveToAbt = () => {
    navigation.navigate("VwCompAbts");
  };
  const moveToPolicy = () => {
    navigation.navigate("VwCompPolicys");
  };
  const moveToPrivacy = () => {
    navigation.navigate("VwCompPrivacys");
  };
  const GoHome = () => {
    navigation.navigate('Homes');
  };
  return <View>
              <View style={styles.image}>
                <ScrollView>    
                  
                    
                    <Pressable onPress={GoHome} style={styles.sendLoanButton}>
                        <Text style={styles.sendLoanButtonText}>
                            Go Home
                        </Text>
                    </Pressable>
                    
                     <Pressable onPress={moveToAbt} style={styles.sendLoanButton}>
                        <Text style={styles.sendLoanButtonText}>
                            About
                        </Text>
                    </Pressable>

                    <Pressable onPress={moveToPolicy} style={styles.sendLoanButton}>
                        <Text style={styles.sendLoanButtonText}>
                            Policy
                        </Text>
                    </Pressable>

                    <Pressable onPress={moveToPrivacy} style={styles.sendLoanButton}>
                        <Text style={styles.sendLoanButtonText}>
                            Privacy
                        </Text>
                    </Pressable>

                    
                
        
                  
                </ScrollView>
              </View>
            </View>;
};
export default UpdtSMPW;