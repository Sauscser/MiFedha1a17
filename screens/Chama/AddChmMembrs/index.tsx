import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { createChamaMembers, createMessages, sendNotification, updateCompany, updateGroup } from '../../../src/graphql/mutations';
import { listGroups, getSMAccount, listSMAccounts } from '../../../src/graphql/queries';
const client = generateClient();
const AddChmMmbrs = () => {
  const navigation = useNavigation();

  // Form state
  const [phoneContacts, setPhoneContacts] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [SubAmt, setSubAmt] = useState('');
  const [SubFreq, setSubFreq] = useState('');
  const [lateSub, setLateSub] = useState('');
  const [pword, setPW] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Group selection
  const [adminGroups, setAdminGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Fetch groups where current user is admin
  useEffect(() => {
    const fetchAdminGroups = async () => {
      try {
        const user = await getCurrentUser();
        const attrs = await fetchUserAttributes();
        const groupsData: any = await client.graphql({
          query: listGroups,
          variables: {
            filter: {
              or: [{
                Admin1: {
                  eq: attrs.email
                }
              }, {
                Admin2: {
                  eq: attrs.email
                }
              }, {
                Admin3: {
                  eq: attrs.email
                }
              }, {
                Admin4: {
                  eq: attrs.email
                }
              }, {
                Admin5: {
                  eq: attrs.email
                }
              }, {
                Admin6: {
                  eq: attrs.email
                }
              }, {
                Admin7: {
                  eq: attrs.email
                }
              }, {
                Admin8: {
                  eq: attrs.email
                }
              }, {
                Admin9: {
                  eq: attrs.email
                }
              }, {
                Admin10: {
                  eq: attrs.email
                }
              }, {
                Admin11: {
                  eq: attrs.email
                }
              }, {
                Admin12: {
                  eq: attrs.email
                }
              }, {
                Admin13: {
                  eq: attrs.email
                }
              }, {
                Admin14: {
                  eq: attrs.email
                }
              }, {
                Admin15: {
                  eq: attrs.email
                }
              }, {
                Admin16: {
                  eq: attrs.email
                }
              }, {
                Admin17: {
                  eq: attrs.email
                }
              }, {
                Admin18: {
                  eq: attrs.email
                }
              }, {
                Admin19: {
                  eq: attrs.email
                }
              }, {
                Admin20: {
                  eq: attrs.email
                }
              }]
            }
          }
        });
        setAdminGroups(groupsData.data.listGroups.items);
      } catch (error) {
        console.error(error);
        Alert.alert('Failed to fetch your groups');
      }
    };
    fetchAdminGroups();
  }, []);

  // Main function to add a member
  const handleAddMember = async () => {
    if (!selectedGroup) {
      Alert.alert('Please select a group first');
      return;
    }
    if (!phoneContacts || !MmbaID || !SubAmt || !SubFreq || !pword) {
      Alert.alert('Please fill all required fields');
      return;
    }
    setIsLoading(true);
    try {
      const userInfo = await getCurrentUser();
      const attrs = await fetchUserAttributes();

      // Check if member exists
      const memberData: any = await client.graphql({
        query: listSMAccounts,
        variables: {
          filter: {
            awsemail: {
              eq: phoneContacts
            }
          }
        }
      });
      if (memberData.data.listSMAccounts.items.length < 1) {
        Alert.alert('Member must first create a main account');
        setIsLoading(false);
        return;
      }

      // Verify admin password
      const adminAccount: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attrs.email
        }
      });
      const adminDtls = adminAccount.data.getSMAccount;
      if (adminDtls.pw !== pword) {
        Alert.alert('Incorrect password');
        setIsLoading(false);
        return;
      }
      const memberDtls: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: phoneContacts
        }
      });
      const membaDtls = memberDtls.data.getSMAccount;
      if (!membaDtls) {
        Alert.alert('Member must first create a main account');
        setIsLoading(false);
        return;
      }

      // Fetch selected group details
      const group = selectedGroup;

      // Prepare member payload
      const memberPayload = {
        MembaId: MmbaID,
        regNo: group.regNo,
        groupContact: group.grpContact,
        memberContact: phoneContacts,
        ChamaNMember: MmbaID + group.grpContact,
        memberNatId: membaDtls.nationalid,
        memberChmBenefit: 0,
        GrossLnsGvn: 0,
        LonAmtGven: 0,
        AmtRepaid: 0,
        LnBal: 0,
        NonLoanAcBal: 0,
        ttlNonLonAcBal: 0,
        timeCrtd: Date.now().toString(),
        subscribedAmt: 0,
        groupName: group.grpName,
        memberName: membaDtls.name,
        AcStatus: 'AccountActive',
        loanStatus: 'NoLoan',
        blStatus: 'AccountNotBL',
        owner: group.owner,
        totalSubAmt: 0,
        subscriptionFrequency: SubFreq,
        subscriptionAmt: SubAmt,
        lateSubscriptionPenalty: lateSub || 0,
        ttlLateSubs: 0,
        transportApproved: 'ChamaTransportApprovedNo'
      };

      // Create member
      await client.graphql({
        query: createChamaMembers,
        variables: {
          input: memberPayload
        }
      });

      // Update group and company counts
      await client.graphql({
        query: updateGroup,
        variables: {
          input: {
            grpContact: group.grpContact,
            ttlGrpMembers: group.ttlGrpMembers + 1
          }
        }
      });
      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            ttlActiveChmUsers: 1
          }
        }
      });
      await client.graphql({
        query: createMessages,
        variables: {
          input: {
            senderEmail: phoneContacts,
            messageBody: `You have been added to group ${group.grpName}. Welcome!`
          }
        }
      });
      await client.graphql({
        query: sendNotification,
        variables: {
          riderEmail: phoneContacts,
          title: "MiFedha: New Group Membership",
          body: `You have been added to group ${group.grpName}. Welcome!`
        }
      });
      Alert.alert("Success", `Member added successfully to ${group.grpName}`);
      navigation.goBack();
      setPhoneContacts('');
      setMmbaID('');
      setSubAmt('');
      setSubFreq('');
      setLateSub('');
      setPW('');
      setSelectedGroup(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Error adding member. Please try again.');
    }
    setIsLoading(false);
  };
  return <View style={ui.container}>
        <ScrollView contentContainerStyle={ui.scroll}>

          {/* Header */}
          <View style={ui.header}>
            <Text style={ui.title}>Add Chama Member</Text>
            <Text style={ui.subtitle}>Select a group and fill member details</Text>
          </View>

          {/* Group Selection */}
          <View style={ui.card}>
            <Text style={ui.label}>Select Group</Text>
            {adminGroups.length > 0 ? adminGroups.map(group => <TouchableOpacity key={group.grpContact} style={[ui.groupButton, selectedGroup?.grpContact === group.grpContact && ui.groupButtonSelected]} onPress={() => setSelectedGroup(group)}>
                  <Text style={[ui.groupButtonText, selectedGroup?.grpContact === group.grpContact && {
            color: '#fff'
          }]}>
                    {group.grpName}
                  </Text>
                </TouchableOpacity>) : <Text style={{
          color: 'red',
          marginVertical: 10
        }}>You have no groups</Text>}
          </View>

          {/* Member Form */}
          {selectedGroup && <View style={ui.card}>
              <View style={ui.inputGroup}>
                <Text style={ui.label}>Member Email</Text>
                <TextInput value={phoneContacts} onChangeText={setPhoneContacts} style={ui.input} placeholder="member@email.com" keyboardType="email-address" autoCapitalize="none" />
              </View>

              <View style={ui.inputGroup}>
                <Text style={ui.label}>Member Chama Number</Text>
                <TextInput value={MmbaID} onChangeText={setMmbaID} style={ui.input} placeholder="Unique member ID" />
              </View>

              <View style={ui.inputGroup}>
                <Text style={ui.label}>Subscription Amount</Text>
                <TextInput value={SubAmt} onChangeText={setSubAmt} style={ui.input} keyboardType="decimal-pad" />
              </View>

              <View style={ui.inputGroup}>
                <Text style={ui.label}>Subscription Frequency (Days)</Text>
                <TextInput value={SubFreq} onChangeText={setSubFreq} style={ui.input} keyboardType="decimal-pad" />
              </View>

              <View style={ui.inputGroup}>
                <Text style={ui.label}>Late Subscription Penalty</Text>
                <TextInput value={lateSub} onChangeText={setLateSub} style={ui.input} keyboardType="decimal-pad" />
              </View>

              <View style={[ui.inputGroup, {
          flexDirection: 'row',
          alignItems: 'center'
        }]}>
    <TextInput value={pword} onChangeText={setPW} style={[ui.input, {
            flex: 1
          }]} // take full width except icon
          secureTextEntry={!showPassword} placeholder="••••••••" />
    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{
            marginLeft: 10
          }}>
      <Text style={{
              color: '#2563EB',
              fontWeight: '500'
            }}>
        {showPassword ? 'Hide' : 'Show'}
      </Text>
    </TouchableOpacity>
  </View>

              <TouchableOpacity style={ui.button} onPress={handleAddMember} disabled={isLoading}>
                {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={ui.buttonText}>Add Member</Text>}
              </TouchableOpacity>
            </View>}
        </ScrollView>
      </View>;
};
export default AddChmMmbrs;
const ui = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8'
  },
  scroll: {
    padding: 20,
    paddingBottom: 40
  },
  // Header
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2933'
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280'
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 4
  },
  // Input
  inputGroup: {
    marginBottom: 16
  },
  label: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 6,
    fontWeight: '500'
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: '#F9FAFB'
  },
  // Button
  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#e58d29',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  },
  // Group selection buttons
  groupButton: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 10,
    backgroundColor: '#F9FAFB',
    alignItems: 'center'
  },
  groupButtonSelected: {
    backgroundColor: '#e58d29',
    borderColor: 'skyblue'
  },
  groupButtonText: {
    fontSize: 15,
    color: '#1F2933',
    fontWeight: '500'
  }
});