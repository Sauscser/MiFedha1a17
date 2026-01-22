import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import {
  listCombContractVouchers,
  getSMAccount,
  getBizna,
  getCompany,
} from '../../../src/graphql/queries';
import {
  updateCombContractVoucher,
  updateSMAccount,
  updateBizna,
  createNonLoans,
  updateCompany,
  createMessages,
  sendNotification,
} from '../../../src/graphql/mutations';

/* -------------------- Voucher Card -------------------- */
const VoucherCard = ({ voucher, onClear, onDecline, loadingMap }: any) => {
  const isClearing = loadingMap[voucher.id]?.clearing;
  const isDeclining = loadingMap[voucher.id]?.declining;

  return (
    <View style={styles.voucherCard}>
      <Text style={styles.title}>
        {voucher.itemName} ({voucher.itemBrand})
      </Text>
      <Text>Specifications: {voucher.itemSpecifications || '-'}</Text>
      <Text>Unit Price: KES {Number(voucher.itemPrice).toFixed(2)}</Text>
      <Text>Number of Items: {voucher.numberOfItems}</Text>
      <Text>
        Total Amount: KES{' '}
        {(Number(voucher.itemPrice) * Number(voucher.numberOfItems)).toFixed(2)}
      </Text>

      <Text style={styles.section}>Consumer</Text>
      <Text>Name: {voucher.consumerName}</Text>
      <Text>Account: {voucher.consumerAccount}</Text>
      <Text>Email: {voucher.consumerEmail || '-'}</Text>

      <Text style={styles.section}>Funder</Text>
      <Text>Name: {voucher.funderName}</Text>
      <Text>Account: {voucher.funderAccount}</Text>
      <Text>Email: {voucher.funderEmail || '-'}</Text>

      <Text style={styles.section}>Seller</Text>
      <Text>Name: {voucher.sellerName}</Text>
      <Text>Account: {voucher.sellerAccount}</Text>
      <Text>Email: {voucher.sellerEmail || '-'}</Text>

      <Text style={styles.section}>Market Deviations</Text>
      <Text>
        Seller Deviation: {Number(voucher.priceDeviation)}% | Policy:{' '}
        {voucher.marketConsumptionPrice?.toFixed(2)}%
      </Text>
      <Text>
        MiFedha Market Deviation: {Number(voucher.referencePrice)}% | Policy:{' '}
        {voucher.marketConsumptionFrequency}%
      </Text>
      <Text>
        General Market Deviation: {Number(voucher.generalPriceDev)}% | Policy:{' '}
        {voucher.marketConsumptionTotal}%
      </Text>

      <Text style={{ marginTop: 6 }}>Status: {voucher.accStatus}</Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Pressable
          disabled={isClearing}
          style={[styles.button, { backgroundColor: 'skyblue', marginRight: 8 }]}
          onPress={() => onClear(voucher)}
        >
          {isClearing ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Settle Bill</Text>}
        </Pressable>

        <Pressable
          disabled={isDeclining}
          style={[styles.button, { backgroundColor: '#e58d29' }]}
          onPress={() => onDecline(voucher)}
        >
          {isDeclining ? <ActivityIndicator color="white" /> : <Text style={styles.btnText}>Decline</Text>}
        </Pressable>
      </View>
    </View>
  );
};

/* -------------------- Main Screen -------------------- */
const FunderClearApprovedVoucherScreen = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<string | null>(null);

  // Track per-voucher per-action loading
  const [loadingMap, setLoadingMap] = useState<Record<string, { clearing: boolean; declining: boolean }>>({});

  /* ---------------- Fetch Approved Vouchers ---------------- */
  const fetchVouchers = async (token?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;

      const res: any = await API.graphql(
        graphqlOperation(listCombContractVouchers, {
          filter: { funderEmail: { eq: email }, accStatus: { eq: 'Approved' } },
          limit: 20,
          nextToken: token,
        })
      );

      const data = res?.data?.listCombContractVouchers;
      const items = data?.items || [];

      setVouchers(prev => {
        const map = new Map(prev.map(v => [v.id, v]));
        items.forEach(v => map.set(v.id, v));
        return Array.from(map.values());
      });

      setNextToken(data?.nextToken || null);
    } catch (e) {
      Alert.alert('Error', 'Failed to load vouchers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVouchers(); }, []);

  /* ---------------- Confirm Dialog ---------------- */
  const confirmAction = (voucher: any, action: 'Settle Bill' | 'Decline') => {
    Alert.alert(
      `${action}`,
      `Are you sure you want to ${action.toLowerCase()} for this voucher?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: action, style: action === 'Decline' ? 'destructive' : 'default',
          onPress: () => action === 'Settle Bill' ? clearVoucher(voucher) : declineVoucher(voucher) },
      ]
    );
  };

  /* ---------------- Decline ---------------- */
  const declineVoucher = async (voucher: any) => {
    setLoadingMap(prev => ({ ...prev, [voucher.id]: { ...(prev[voucher.id] || {}), declining: true } }));

    try {
      await API.graphql(graphqlOperation(updateCombContractVoucher, { input: { id: voucher.id, accStatus: 'Declined' } }));
      setVouchers(prev => prev.filter(v => v.id !== voucher.id));

      const message = `COMB voucher for ${voucher.itemName} was declined by the funder.`;

      for (const email of [voucher.consumerEmail, voucher.sellerEmail]) {
        if (!email) continue;

        await API.graphql(graphqlOperation(createMessages, { input: { senderEmail: email, messageBody: message } }));
        await API.graphql(graphqlOperation(sendNotification, { riderEmail: email, title: 'MiFedha: COMB Voucher Declined', body: message }));
      }
    } catch (e) {
      Alert.alert('Error', 'Decline failed');
    } finally {
      setLoadingMap(prev => ({ ...prev, [voucher.id]: { ...(prev[voucher.id] || {}), declining: false } }));
    }
  };

  /* ---------------- Clear / Settlement ---------------- */
  const clearVoucher = async (voucher: any) => {
    setLoadingMap(prev => ({ ...prev, [voucher.id]: { ...(prev[voucher.id] || {}), clearing: true } }));

    try {
      const totalAmount = Number(voucher.itemPrice) * Number(voucher.numberOfItems);

      const companyRes: any = await API.graphql(graphqlOperation(getCompany, { AdminId: "BaruchHabaB'ShemAdonai2" }));
      const company = companyRes.data.getCompany;

      const fee = Number(company.userTransferFee) * totalAmount;
      const totalDebit = totalAmount + fee;
      const benefit = Math.round((company.p2BBenCom / 100) * fee);
      const companyEarnings = fee - benefit * 2;

      const debitAccount = async (type: string, account: string) => {
        if (type === 'funderTypeBiz') {
          const res: any = await API.graphql(graphqlOperation(getBizna, { BusKntct: account }));
          const bal = Number(res.data.getBizna.earningsBal);
          if (bal < totalDebit) throw new Error('Insufficient funds');
          await API.graphql(graphqlOperation(updateBizna, { input: { BusKntct: account, earningsBal: bal - totalDebit, benefitsAmount: Number(res.data.getBizna.benefitsAmount) + benefit } }));
        } else {
          const res: any = await API.graphql(graphqlOperation(getSMAccount, { awsemail: account }));
          const bal = Number(res.data.getSMAccount.balance);
          if (bal < totalDebit) throw new Error('Insufficient funds');
          await API.graphql(graphqlOperation(updateSMAccount, { input: { awsemail: account, balance: bal - totalDebit, benefitsAmount: Number(res.data.getSMAccount.benefitsAmount) + benefit } }));
        }
      };

      const creditAccount = async (type: string, account: string) => {
        if (type === 'sellerTypeBiz') {
          const res: any = await API.graphql(graphqlOperation(getBizna, { BusKntct: account }));
          await API.graphql(graphqlOperation(updateBizna, { input: { BusKntct: account, earningsBal: Number(res.data.getBizna.earningsBal) + totalAmount, netEarnings: Number(res.data.getBizna.netEarnings) + totalAmount, benefitsAmount: Number(res.data.getBizna.benefitsAmount) + benefit } }));
        } else {
          const res: any = await API.graphql(graphqlOperation(getSMAccount, { awsemail: account }));
          await API.graphql(graphqlOperation(updateSMAccount, { input: { awsemail: account, balance: Number(res.data.getSMAccount.balance) + totalAmount, benefitsAmount: Number(res.data.getSMAccount.benefitsAmount) + benefit } }));
        }
      };

      await debitAccount(voucher.funderType, voucher.funderAccount);
      await creditAccount(voucher.sellerType, voucher.sellerAccount);

      await API.graphql(graphqlOperation(createNonLoans, { input: {
        recPhn: voucher.sellerAccount,
        senderPhn: voucher.funderAccount,
        amount: totalAmount,
        description: `COMB Settlement: ${voucher.itemName}`,
        RecName: voucher.sellerName,
        SenderName: voucher.funderName,
        status: 'cashSales',
        owner: voucher.id,
      } }));

      await API.graphql(graphqlOperation(updateCompany, { input: {
        AdminId: "BaruchHabaB'ShemAdonai2",
        companyEarningBal: Number(company.companyEarningBal) + companyEarnings,
        companyEarning: Number(company.companyEarning) + companyEarnings,
      } }));

      await API.graphql(graphqlOperation(updateCombContractVoucher, 
        { input: { id: voucher.id, accStatus: 'Cleared',
          settlementTime: new Date().toISOString()
         } }));

      const message = `COMB bill for ${voucher.itemName} has been settled by the funder ${voucher.funderName}.`;

      for (const email of [voucher.consumerEmail, voucher.sellerEmail]) {
        if (!email) continue;
        await API.graphql(graphqlOperation(createMessages, { input: { senderEmail: email, messageBody: message } }));
        await API.graphql(graphqlOperation(sendNotification, { riderEmail: email, title: 'MiFedha: COMB Voucher Cleared', body: message }));
      }

      setVouchers(prev => prev.filter(v => v.id !== voucher.id));

    } catch (e: any) {
      Alert.alert('Error', e.message || 'Settlement failed');
    } finally {
      setLoadingMap(prev => ({ ...prev, [voucher.id]: { ...(prev[voucher.id] || {}), clearing: false } }));
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {loading && vouchers.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : vouchers.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No approved vouchers found.</Text>
      ) : (
        <FlatList
          data={vouchers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <VoucherCard
              voucher={item}
              loadingMap={loadingMap}
              onClear={v => confirmAction(v, 'Settle Bill')}
              onDecline={v => confirmAction(v, 'Decline')}
            />
          )}
          onEndReached={() => { if (nextToken && !loading) fetchVouchers(nextToken); }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  voucherCard: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 6, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 15 },
  section: { marginTop: 6, fontWeight: 'bold' },
  button: { flex: 1, padding: 10, borderRadius: 4, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold' },
});

export default FunderClearApprovedVoucherScreen;
