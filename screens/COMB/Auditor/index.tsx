import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Sharing from 'expo-sharing';
import RNPrint from 'react-native-print';



import { listAuditors, listCombContractVouchers } from '../../../src/graphql/queries';

/* -------------------- Auditor Voucher Card -------------------- */
const AuditorVoucherCard = ({ voucher, selected, toggleSelect }: any) => {
  const [expanded, setExpanded] = useState(false);
  const policyExceeded =
    voucher.priceDeviation > voucher.marketConsumptionPrice ||
    voucher.referencePrice > voucher.marketConsumptionFrequency ||
    voucher.generalPriceDev > voucher.marketConsumptionTotal;

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
      <View style={[styles.voucherCard, { borderColor: selected ? 'darkblue' : '#ddd' }]}>
        {/* Selection Box */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          <TouchableOpacity
            onPress={() => toggleSelect(voucher.id)}
            style={{
              width: 20,
              height: 20,
              borderWidth: 1,
              borderColor: '#000',
              marginRight: 8,
              backgroundColor: selected ? 'darkblue' : 'white',
            }}
          />
          <Text style={styles.title}>
            {voucher.itemName} ({voucher.itemBrand})
          </Text>
        </View>

        <Text>Total Amount: KES {(voucher.itemPrice * voucher.numberOfItems).toFixed(2)}</Text>
        <Text>Time Settled: {new Date(voucher.settlementTime).toLocaleString()}</Text>

        {expanded && (
          <>
            <Text>Specifications: {voucher.itemSpecifications || '-'}</Text>
            <Text>Unit Price: KES {Number(voucher.itemPrice).toFixed(2)}</Text>
            <Text>Number of Items: {voucher.numberOfItems}</Text>

            <Text style={styles.section}>Consumer</Text>
            <Text>{voucher.consumerName} — {voucher.consumerAccount}</Text>

            <Text style={styles.section}>Seller</Text>
            <Text>{voucher.sellerName} — {voucher.sellerAccount}</Text>

            <Text style={styles.section}>Funder</Text>
            <Text>{voucher.funderName} — {voucher.funderAccount}</Text>

            <Text style={styles.section}>Pricing Deviations</Text>
            <Text>Seller Deviation: {voucher.priceDeviation}% | Policy: {voucher.marketConsumptionPrice}%</Text>
            <Text>MiFedha Reference: {voucher.referencePrice}% | Policy: {voucher.marketConsumptionFrequency}%</Text>
            <Text>General Market: {voucher.generalPriceDev}% | Policy: {voucher.marketConsumptionTotal}%</Text>

            <Text style={{ color: policyExceeded ? 'red' : 'green', fontWeight: 'bold', marginTop: 4 }}>
              Policy Status: {policyExceeded ? 'EXCEEDED POLICY' : 'WITHIN POLICY'}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

/* -------------------- Main Auditor Screen -------------------- */
const AuditorVoucherScreen = () => {
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextToken, setNextToken] = useState<string | null>(null);

  const [sellerFilter, setSellerFilter] = useState('');
  const [consumerFilter, setConsumerFilter] = useState('');
  const [funderFilter, setFunderFilter] = useState('');

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [auditorVerified, setAuditorVerified] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<Record<string, boolean>>({});

  /* ---------------- Verify Auditor ---------------- */
  const verifyAuditor = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email;

      const res: any = await API.graphql(
        graphqlOperation(listAuditors, { filter: { email: { eq: email } } })
      );

      const auditor = res?.data?.listAuditors?.items?.[0];

      if (!auditor || !auditor.active) {
        Alert.alert('Unauthorized', 'You are not registered as an auditor.');
        return;
      }

      setAuditorVerified(true);
      fetchVouchers();
    } catch (e) {
      Alert.alert('Error', 'Failed to verify auditor.');
    }
  };

  /* ---------------- Fetch Cleared Vouchers ---------------- */
  const fetchVouchers = async (token?: string) => {
    if (loading) return;
    setLoading(true);

    try {
      const res: any = await API.graphql(
        graphqlOperation(listCombContractVouchers, {
          filter: { accStatus: { eq: 'Cleared' } },
          limit: 50,
          nextToken: token,
        })
      );

      const items = res?.data?.listCombContractVouchers?.items || [];

      setVouchers(prev => {
        const map = new Map(prev.map(v => [v.id, v]));
        items.forEach(v => map.set(v.id, v));
        return Array.from(map.values());
      });

      setNextToken(res?.data?.listCombContractVouchers?.nextToken || null);
    } catch (e) {
      Alert.alert('Error', 'Failed to load vouchers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { verifyAuditor(); }, []);

  /* ---------------- Filtered Vouchers ---------------- */
  const filteredVouchers = vouchers.filter(v =>
    v.sellerAccount?.toLowerCase().includes(sellerFilter.toLowerCase()) &&
    v.consumerAccount?.toLowerCase().includes(consumerFilter.toLowerCase()) &&
    v.funderAccount?.toLowerCase().includes(funderFilter.toLowerCase()) &&
    (!startDate || new Date(v.settlementTime) >= startDate) &&
    (!endDate || new Date(v.settlementTime) <= endDate)
  );

  const toggleSelect = (id: string) => {
    setSelectedVouchers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  /* ---------------- Summary Metrics ---------------- */
  /* ---------------- Summary Metrics (Counts + % + Money) ---------------- */
const summary = (() => {
  let totalMoney = 0;
  let withinMoney = 0;
  let exceededMoney = 0;

  const exceeded = filteredVouchers.filter(v =>
    v.priceDeviation > v.marketConsumptionPrice ||
    v.referencePrice > v.marketConsumptionFrequency ||
    v.generalPriceDev > v.marketConsumptionTotal
  );

  const within = filteredVouchers.filter(v =>
    v.priceDeviation <= v.marketConsumptionPrice &&
    v.referencePrice <= v.marketConsumptionFrequency &&
    v.generalPriceDev <= v.marketConsumptionTotal
  );

  filteredVouchers.forEach(v => {
    const amount = Number(v.itemPrice || 0) * Number(v.numberOfItems || 0);
    totalMoney += amount;

    const isExceeded =
      v.priceDeviation > v.marketConsumptionPrice ||
      v.referencePrice > v.marketConsumptionFrequency ||
      v.generalPriceDev > v.marketConsumptionTotal;

    if (isExceeded) {
      exceededMoney += amount;
    } else {
      withinMoney += amount;
    }
  });

  const total = filteredVouchers.length;

  return {
    totalCleared: total,

    withinCount: within.length,
    exceededCount: exceeded.length,

    withinPct: total ? (within.length / total) * 100 : 0,
    exceededPct: total ? (exceeded.length / total) * 100 : 0,

    totalMoney,
    withinMoney,
    exceededMoney,
  };
})();


  /* ---------------- PDF Export ---------------- */


// Use CommonJS require to avoid TS typing issues


const exportPDF = async () => {
  const vouchersToExport = filteredVouchers.filter(v => selectedVouchers[v.id]);
  if (!vouchersToExport.length) {
    return Alert.alert('No vouchers selected');
  }

  try {
    // Build HTML string
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; padding: 10px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
            th, td { border: 1px solid #aaa; padding: 4px; text-align: left; }
            th { background-color: #eee; }
            .exceeded { color: red; font-weight: bold; }
            .within { color: green; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>MiFedha COMB Auditor Voucher Report</h2>
          ${vouchersToExport.map(v => {
            const policyExceeded =
              v.priceDeviation > v.marketConsumptionPrice ||
              v.referencePrice > v.marketConsumptionFrequency ||
              v.generalPriceDev > v.marketConsumptionTotal;
            return `
              <table>
                <tr><th colspan="2">${v.itemName} (${v.itemBrand}) — Total: KES ${(v.itemPrice * v.numberOfItems).toFixed(2)}</th></tr>
                <tr><td>Specifications</td><td>${v.itemSpecifications || '-'}</td></tr>
                <tr><td>Specifications</td><td>${v.itemSpecifications || '-'}</td></tr>
                <tr><td>Time Settled</td><td>${new Date(v.settlementTime).toLocaleString()}</td></tr>
                <tr><th colspan="2">Consumer</th></tr>
                <tr><td>Name & Account</td><td>${v.consumerName} — ${v.consumerAccount}</td></tr>
                <tr><th colspan="2">Seller</th></tr>
                <tr><td>Name & Account</td><td>${v.sellerName} — ${v.sellerAccount}</td></tr>
                <tr><th colspan="2">Funder</th></tr>
                <tr><td>Name & Account</td><td>${v.funderName} — ${v.funderAccount}</td></tr>
                <tr><th colspan="2">Pricing Deviations</th></tr>
                <tr><td>Seller Deviation</td><td>${v.priceDeviation}% | Policy: ${v.marketConsumptionPrice}%</td></tr>
                <tr><td>MiFedha Reference</td><td>${v.referencePrice}% | Policy: ${v.marketConsumptionFrequency}%</td></tr>
                <tr><td>General Market</td><td>${v.generalPriceDev}% | Policy: ${v.marketConsumptionTotal}%</td></tr>
                <tr><td>Policy Status</td>
                    <td class="${policyExceeded ? 'exceeded' : 'within'}">
                        ${policyExceeded ? 'EXCEEDED POLICY' : 'WITHIN POLICY'}
                    </td>
                </tr>
              </table>
            `;
          }).join('')}
        </body>
      </html>
    `;

    console.log('RNPrint:', RNPrint);

    // Open native print dialog (user can save/share as PDF)
    await RNPrint.print({ html });
  } catch (e: any) {
    console.error('PDF Export Error:', e);
    Alert.alert('Error', e.message || 'Failed to generate PDF');
  }
};



  if (!auditorVerified) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

 return (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={80}
  >
    <View style={{ flex: 1, padding: 10 }}>
      {/* Export Button */}
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: 'darkblue',
          borderRadius: 6,
          marginBottom: 10,
        }}
        onPress={exportPDF}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          Export Selected PDF ({Object.values(selectedVouchers).filter(v => v).length})
        </Text>
      </TouchableOpacity>

      {/* Scrollable Section (summary + filters) */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Panel */}
        <View style={styles.summaryContainer}>
          <Text style={{ fontWeight: 'bold' }}>Voucher Compliance Summary</Text>

          <Text>Total Cleared: {summary.totalCleared} || KES {summary.totalMoney.toFixed(2)}  
            </Text>

          <Text style={{ color: 'green' }}>
            Within Limit: {summary.withinCount} || {summary.withinPct.toFixed(1)}% || KES {summary.withinMoney.toFixed(2)} 
          </Text>

          <Text style={{ color: 'red' }}>
            Exceeded Limit: {summary.exceededCount} || {summary.exceededPct.toFixed(1)}% || KES {summary.exceededMoney.toFixed(2)}
          </Text>

          
        </View>

        {/* Filters */}
        <View style={{ marginVertical: 10 }}>
          <TextInput
            style={styles.input}
            placeholder="Filter by Seller Account"
            value={sellerFilter}
            onChangeText={setSellerFilter}
          />
          <TextInput
            style={styles.input}
            placeholder="Filter by Consumer Account"
            value={consumerFilter}
            onChangeText={setConsumerFilter}
          />
          <TextInput
            style={styles.input}
            placeholder="Filter by Funder Account"
            value={funderFilter}
            onChangeText={setFunderFilter}
          />

          {/* Date Pickers */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
              <Text>From: {startDate ? startDate.toLocaleDateString() : 'Select'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
              <Text>To: {endDate ? endDate.toLocaleDateString() : 'Select'}</Text>
            </TouchableOpacity>
          </View>

          {showStartPicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display="calendar"
              onChange={(e, date) => {
                setShowStartPicker(false);
                if (date) setStartDate(date);
              }}
            />
          )}

          {showEndPicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="calendar"
              onChange={(e, date) => {
                setShowEndPicker(false);
                if (date) setEndDate(date);
              }}
            />
          )}
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            marginBottom: 6,
            textAlign: 'center',
          }}
        >
          Select Voucher to Export PDF
        </Text>
      </ScrollView>

      {/* Voucher List (NOT inside ScrollView) */}
      {loading && vouchers.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : filteredVouchers.length === 0 ? (
        <Text style={{ textAlign: 'center' }}>No cleared vouchers found.</Text>
      ) : (
        <FlatList
          data={filteredVouchers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AuditorVoucherCard
              voucher={item}
              selected={!!selectedVouchers[item.id]}
              toggleSelect={toggleSelect}
            />
          )}
          onEndReached={() => {
            if (nextToken && !loading) fetchVouchers(nextToken);
          }}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  </KeyboardAvoidingView>
);

};

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  voucherCard: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 6, marginBottom: 10 },
  title: { fontWeight: 'bold', fontSize: 15 },
  section: { marginTop: 6, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 6, borderRadius: 4 },
  dateButton: { padding: 10, borderWidth: 1, borderRadius: 6, borderColor: '#ccc', flex: 1, marginHorizontal: 4 },
  summaryContainer: { padding: 10, borderWidth: 1, borderColor: '#aaa', borderRadius: 6, marginBottom: 10, backgroundColor: '#f5f5f5' },
});

export default AuditorVoucherScreen;
