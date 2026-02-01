import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, ActivityIndicator, Alert, Pressable } from 'react-native';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { listCombContractVouchers, getSMAccount, getBizna, getCompany } from '../../../src/graphql/queries';
import { createMessages, updateCombContractVoucher, sendNotification, updateSMAccount, updateBizna, createNonLoans, updateCompany } from '../../../src/graphql/mutations';

/* -------------------- GraphQL Client -------------------- */
const client = generateClient();

/* -------------------- Voucher Card -------------------- */
const VoucherCard = ({
  voucher,
  onApprove,
  onDecline,
  updatingId
}: any) => {
  const isUpdating = updatingId === voucher.id;
  return <View style={styles.voucherCard}>
      <Text style={{
      fontWeight: 'bold'
    }}>
        {voucher.itemName} ({voucher.itemBrand})
      </Text>
      <Text>Specifications: {voucher.itemSpecifications || '-'}</Text>
      <Text>Price: KES {Number(voucher.itemPrice).toFixed(2)}</Text>
      <Text>Number of Items: {voucher.numberOfItems}</Text>

      <Text>Funder Account: {voucher.funderAccount}</Text>
      <Text>Funder Name: {voucher.funderName}</Text>
      <Text>Funder Contact: {voucher.funderContact}</Text>
      <Text>Funder Email: {voucher.funderEmail || '-'}</Text>

      <Text>Seller Account: {voucher.sellerAccount}</Text>
      <Text>Seller Name: {voucher.sellerName}</Text>
      <Text>Seller Contact: {voucher.sellerContact}</Text>

      <Text>
        Seller Deviation: {Number(voucher.priceDeviation).toFixed(2)} | Policy:{' '}
        {voucher.marketConsumptionPrice?.toFixed(2)}%
      </Text>
      <Text>
        MiFedha Market Deviation: {Number(voucher.referencePrice).toFixed(2)} | Policy:{' '}
        {voucher.marketConsumptionFrequency}%
      </Text>
      <Text>
        General Market Price Deviation: {Number(voucher.generalPriceDev).toFixed(2)} | Policy:{' '}
        {voucher.marketConsumptionTotal}%
      </Text>

      <Text>Status: {voucher.accStatus}</Text>

      {voucher.accStatus === 'Pending' && <View style={{
      flexDirection: 'row',
      marginTop: 8
    }}>
          <Pressable disabled={isUpdating} style={[styles.button, {
        backgroundColor: 'skyblue',
        marginRight: 8
      }]} onPress={() => onApprove(voucher)}>
            {isUpdating ? <ActivityIndicator color="white" /> : <Text style={{
          color: 'white'
        }}>Approve</Text>}
          </Pressable>

          <Pressable disabled={isUpdating} style={[styles.button, {
        backgroundColor: '#e58d29'
      }]} onPress={() => onDecline(voucher)}>
            {isUpdating ? <ActivityIndicator color="white" /> : <Text style={{
          color: 'white'
        }}>Decline</Text>}
          </Pressable>
        </View>}
    </View>;
};

/* -------------------- Main Screen -------------------- */
const ConsumerApproveVoucherScreen = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    sellerAccount: '',
    funderAccount: '',
    consumerAccount: ''
  });

  /* ---------------- Fetch vouchers ---------------- */
  const fetchVouchers = async (token?: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const user = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      const email = attrs.email;
      const res: any = await client.graphql({
        query: listCombContractVouchers,
        variables: {
          filter: {
            consumerEmail: {
              eq: email
            },
            accStatus: {
              eq: 'Pending'
            }
          },
          limit: 20,
          nextToken: token
        }
      });
      const newItems = res?.data?.listCombContractVouchers?.items || [];
      setVouchers(prev => {
        const merged = [...prev, ...newItems];
        const unique = Array.from(new Map(merged.map(item => [item.id, item])).values());
        return unique;
      });
      setNextToken(res?.data?.listCombContractVouchers?.nextToken || null);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not load vouchers.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchVouchers();
  }, []);

  /* ---------------- Filters ---------------- */
  const match = (a = '', b = '') => a.toLowerCase().includes(b.toLowerCase().trim());
  const filteredVouchers = useMemo(() => vouchers.filter(v => (!filters.sellerAccount || match(v.sellerAccount, filters.sellerAccount)) && (!filters.funderAccount || match(v.funderAccount, filters.funderAccount)) && (!filters.consumerAccount || match(v.consumerAccount, filters.consumerAccount))), [vouchers, filters]);

  /* ---------------- Confirmation ---------------- */
  const confirmAction = (voucher: any, status: 'Approved' | 'Declined') => {
    const verb = status === 'Approved' ? 'Approve' : 'Decline';
    Alert.alert(`${verb} Voucher`, `Are you sure you want to ${verb} this voucher from ${voucher.sellerName}?`, [{
      text: 'Cancel',
      style: 'cancel'
    }, {
      text: verb,
      style: status === 'Declined' ? 'destructive' : 'default',
      onPress: () => updateVoucherStatus(voucher, status)
    }]);
  };

  /* ---------------- Approve / Decline ---------------- */
  const updateVoucherStatus = async (voucher: any, status: 'Approved' | 'Declined') => {
    setUpdatingId(voucher.id);
    setVouchers(prev => prev.filter(v => v.id !== voucher.id));
    const now = Date.now();
    try {
      // 1️⃣ Check expiry
      const expiry = Number(voucher.voucherLastUpdate) + Number(voucher.updateFrequency) * 24 * 60 * 60 * 1000;
      if (voucher.consumptionMarginStatus === 'Active' && now > expiry) {
        await client.graphql({
          query: updateCombContractVoucher,
          variables: {
            input: {
              id: voucher.id,
              accStatus: 'Declined'
            }
          }
        });
        if (voucher.sellerEmail) {
          await client.graphql({
            query: createMessages,
            variables: {
              input: {
                senderEmail: voucher.sellerEmail,
                messageBody: 'Voucher approval window closed.'
              }
            }
          });
          await client.graphql({
            query: sendNotification,
            variables: {
              riderEmail: voucher.sellerEmail,
              title: 'MiFedha: Voucher Closed',
              body: 'Voucher approval window closed.'
            }
          });
        }
        Alert.alert('Declined! Voucher approval window closed.');
        return;
      }
      if (voucher.consumptionMarginStatus === 'Active' && expiry > now) {
        await client.graphql({
          query: updateCombContractVoucher,
          variables: {
            input: {
              id: voucher.id,
              accStatus: status,
              voucherLastUpdate: now,
              settlementTime: new Date().toISOString()
            }
          }
        });
        if (voucher.sellerEmail) {
          const msg = `${voucher.consumerName} has approved a COMB contract voucher from ${voucher.sellerName}. Proceed to COMB to clear the bill.`;
          await client.graphql({
            query: createMessages,
            variables: {
              input: {
                senderEmail: voucher.sellerEmail,
                messageBody: msg
              }
            }
          });
          await client.graphql({
            query: sendNotification,
            variables: {
              riderEmail: voucher.sellerEmail,
              title: 'MiFedha: Voucher Approval',
              body: msg
            }
          });
        }
        Alert.alert('Voucher successfully approved');
        return;
      }

      /* ---------------- Auto-billing if Cancelled ---------------- */
      if (voucher.consumptionMarginStatus === 'Cancelled') {
        const totalAmount = Number(voucher.itemPrice) * Number(voucher.numberOfItems);

        // Fetch company settings
        const companyRes: any = await client.graphql({
          query: getCompany,
          variables: {
            AdminId: "BaruchHabaB'ShemAdonai2"
          }
        });
        const company = companyRes.data.getCompany;
        const userTransferFee = Number(company.userTransferFee);
        const p2BBenCom = Number(company.p2BBenCom);
        const compEarnings = Number(company.companyEarning);
        const companyEarningBal = Number(company.companyEarningBal);
        const Fee = userTransferFee * totalAmount;
        const totalDebited = Fee + totalAmount;
        const benefit = Math.round(p2BBenCom * Fee);
        const companyEarningss = Fee - 2 * benefit;

        // Funder balance
        let funderBalance = 0,
          benefitsAmount = 0,
          ttlNonLonsSentSM = 0;
        if (voucher.funderType === 'funderTypeBiz') {
          const res: any = await client.graphql({
            query: getBizna,
            variables: {
              BusKntct: voucher.funderAccount
            }
          });
          funderBalance = Number(res.data.getBizna.earningsBal);
          benefitsAmount = Number(res.data.getBizna.benefitsAmount);
        } else if (voucher.funderType === 'funderTypePal') {
          const res: any = await client.graphql({
            query: getSMAccount,
            variables: {
              awsemail: voucher.funderAccount
            }
          });
          funderBalance = Number(res.data.getSMAccount.balance);
          ttlNonLonsSentSM = Number(res.data.getSMAccount.ttlNonLonsSentSM);
          benefitsAmount = Number(res.data.getSMAccount.benefitsAmount);
        }
        if (funderBalance < totalDebited) {
          Alert.alert('Insufficient funds', `Funder ${voucher.funderName} does not have enough balance.`);
          setUpdatingId(null);
          setVouchers(prev => [voucher, ...prev]);
          return;
        }

        // Debit funder
        if (voucher.funderType === 'funderTypeBiz') {
          await client.graphql({
            query: updateBizna,
            variables: {
              input: {
                BusKntct: voucher.funderAccount,
                earningsBal: funderBalance - totalDebited,
                benefitsAmount: benefitsAmount + benefit
              }
            }
          });
        } else if (voucher.funderType === 'funderTypePal') {
          await client.graphql({
            query: updateSMAccount,
            variables: {
              input: {
                awsemail: voucher.funderAccount,
                balance: funderBalance - totalDebited,
                benefitsAmount: benefitsAmount + benefit
              }
            }
          });
        }

        // Credit seller
        if (voucher.sellerType === 'sellerTypeBiz') {
          const res: any = await client.graphql({
            query: getBizna,
            variables: {
              BusKntct: voucher.sellerAccount
            }
          });
          const currentNetEarnings = Number(res.data.getBizna.netEarnings);
          const currentBenefits = Number(res.data.getBizna.benefitsAmount);
          await client.graphql({
            query: updateBizna,
            variables: {
              input: {
                BusKntct: voucher.sellerAccount,
                netEarnings: currentNetEarnings + totalAmount,
                earningsBal: currentNetEarnings + totalAmount,
                benefitsAmount: currentBenefits + benefit
              }
            }
          });
        } else if (voucher.sellerType === 'sellerTypePal') {
          const res: any = await client.graphql({
            query: getSMAccount,
            variables: {
              awsemail: voucher.sellerAccount
            }
          });
          const currentBal = Number(res.data.getSMAccount.balance);
          const currentBenefits = Number(res.data.getSMAccount.benefitsAmount);
          const currentTtlNonLons = Number(res.data.getSMAccount.ttlNonLonsSentSM);
          await client.graphql({
            query: updateSMAccount,
            variables: {
              input: {
                awsemail: voucher.sellerAccount,
                balance: currentBal + totalAmount,
                benefitsAmount: currentBenefits + benefit,
                ttlNonLonsSentSM: currentTtlNonLons + benefit
              }
            }
          });
        }

        // Record NonLoan transaction
        await client.graphql({
          query: createNonLoans,
          variables: {
            input: {
              recPhn: voucher.sellerAccount,
              senderPhn: voucher.funderAccount,
              amount: totalAmount,
              description: `COMB Auto Settlement: ${voucher.itemName}`,
              RecName: voucher.sellerName,
              SenderName: voucher.funderName,
              status: 'cashSales',
              owner: voucher.id
            }
          }
        });

        // Update company earnings
        await client.graphql({
          query: updateCompany,
          variables: {
            input: {
              AdminId: "BaruchHabaB'ShemAdonai2",
              companyEarningBal: companyEarningBal + companyEarningss,
              companyEarning: compEarnings + companyEarningss
            }
          }
        });

        // Update voucher
        await client.graphql({
          query: updateCombContractVoucher,
          variables: {
            input: {
              id: voucher.id,
              accStatus: 'Cleared'
            }
          }
        });

        // Notify all parties
        const messageBody = `${voucher.consumerName} has spent KSH ${totalDebited} from a COMB voucher from ${voucher.sellerName}.`;
        if (voucher.funderEmail) await client.graphql({
          query: createMessages,
          variables: {
            input: {
              senderEmail: voucher.funderEmail,
              messageBody
            }
          }
        });
        if (voucher.funderEmail) await client.graphql({
          query: sendNotification,
          variables: {
            riderEmail: voucher.funderEmail,
            title: 'MiFedha: COMB Voucher Update',
            body: messageBody
          }
        });
        if (voucher.sellerEmail) await client.graphql({
          query: createMessages,
          variables: {
            input: {
              senderEmail: voucher.sellerEmail,
              messageBody
            }
          }
        });
        if (voucher.sellerEmail) await client.graphql({
          query: sendNotification,
          variables: {
            riderEmail: voucher.sellerEmail,
            title: 'MiFedha: COMB Voucher Update',
            body: messageBody
          }
        });
        if (voucher.consumerEmail) await client.graphql({
          query: createMessages,
          variables: {
            input: {
              senderEmail: voucher.consumerEmail,
              messageBody: `You paid from funder ${voucher.funderName} account for a COMB voucher from ${voucher.sellerName}.`
            }
          }
        });
      }
    } catch (err) {
      console.error(err);
      setVouchers(prev => [voucher, ...prev]); // rollback
      Alert.alert('Error', 'Could not update voucher.');
    } finally {
      setUpdatingId(null);
    }
  };
  return <View style={{
    flex: 1,
    padding: 10
  }}>
      {/* Filters */}
      <View style={{
      flexDirection: 'row',
      marginBottom: 10
    }}>
        <TextInput placeholder="Seller Account" value={filters.sellerAccount} onChangeText={t => setFilters(f => ({
        ...f,
        sellerAccount: t
      }))} style={styles.input} />
        <TextInput placeholder="Funder Account" value={filters.funderAccount} onChangeText={t => setFilters(f => ({
        ...f,
        funderAccount: t
      }))} style={styles.input} />
        <TextInput placeholder="Consumer Account" value={filters.consumerAccount} onChangeText={t => setFilters(f => ({
        ...f,
        consumerAccount: t
      }))} style={styles.input} />
      </View>

      {updatingId && <View style={{
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10
    }}>
          <ActivityIndicator size="large" color="#ffffff" />
          <Text style={{
        color: 'white',
        marginTop: 8
      }}>Processing voucher...</Text>
        </View>}

      {/* List */}
      {loading && vouchers.length === 0 ? <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
          <ActivityIndicator size="large" color="#4caf50" />
          <Text style={{
        marginTop: 8
      }}>Loading vouchers...</Text>
        </View> : filteredVouchers.length === 0 ? <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
          <Text>No pending vouchers found.</Text>
        </View> : <FlatList data={filteredVouchers} keyExtractor={item => item.id} renderItem={({
      item
    }) => <VoucherCard voucher={item} updatingId={updatingId} onApprove={(v: any) => confirmAction(v, 'Approved')} onDecline={(v: any) => confirmAction(v, 'Declined')} />} onEndReached={() => {
      if (nextToken && !loading) fetchVouchers(nextToken);
    }} onEndReachedThreshold={0.5} ListFooterComponent={loading ? <ActivityIndicator style={{
      marginVertical: 10
    }} /> : null} contentContainerStyle={{
      paddingBottom: 60
    }} />}
    </View>;
};
const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginRight: 4,
    borderRadius: 4
  },
  voucherCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8
  },
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default ConsumerApproveVoucherScreen;