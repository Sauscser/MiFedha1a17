import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert, Pressable, Animated, Easing
} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';

import {
  listSokoAds,
  listMarketConsumptions,
  listAveragePrices,
  getCombContract,
} from '../../../src/graphql/queries';

import {
  createCombContractVoucher,
  createMessages,
  sendNotification,
  updateCombContract,
} from '../../../src/graphql/mutations';

/* -------------------- Types -------------------- */
type SokoItem = {
  id: string;
  sokoname: string;
  itemBrand: string;
  itemSpecifications?: string;
  itemUnit: string;
  sokoprice: number | string;
  sokolnprcntg?: number | string;
  sokokntct: string;
};

type PriceAlert = {
  avgItemPrice: number;
  itemDeviation: number;
  allowedMargin: number;
  consumptionMarginStatus: string;
  priceFlag: string;
  avgCategoryPrice: number;
  categoryDeviation: number;
  generalPriceDev: number;
};

/* -------------------- Helpers -------------------- */
const handleError = (msg: string, err?: any) => {
  console.error(err);
  Alert.alert('Error', msg);
};

const useDebouncedState = <T,>(initial: T, delay = 250) => {
  const [value, setValue] = useState<T>(initial);
  const [debounced, setDebounced] = useState<T>(initial);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return { value, setValue, debounced };
};

/* -------------------- Item Card -------------------- */
const ItemCard = ({
  item,
  quantities,
  setQuantities,
  getPriceAlertCached,
  handleAddToVoucher,
  parent,
  voucherItems,
}: {
  item: SokoItem;
  quantities: Record<string, number>;
  setQuantities: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  getPriceAlertCached: (item: SokoItem) => Promise<PriceAlert>;
  handleAddToVoucher: (item: SokoItem, alert: PriceAlert) => void;
  parent: any;
  voucherItems: Record<string, { item: SokoItem; quantity: number }>;
}) => {
  const [alert, setAlert] = useState<PriceAlert | null>(null);
  const [loadingAlert, setLoadingAlert] = useState(false);

  const qty = quantities[item.id] || 1;
  const priceNum = Number(item.sokoprice) || 0;

  const runDeviationCheck = async () => {
    if (loadingAlert) return;
    setLoadingAlert(true);
    try {
      const res = await getPriceAlertCached(item);
      setAlert(res);
    } catch (err) {
      handleError('Could not calculate deviations.', err);
    } finally {
      setLoadingAlert(false);
    }
  };

  const getCurrentVoucherTotal = () =>
    Object.values(voucherItems).reduce(
      (sum, v) => sum + Number(v.item.sokoprice) * Number(v.quantity),
      0
    );

  const totalCostAfterAdd = qty * priceNum + getCurrentVoucherTotal();
  const canAdd =
    !parent ||
    parent.consumptionMarginStatus !== 'Active' ||
    totalCostAfterAdd <= Number(parent?.consumptionCapping ?? 0);

  return (
    <View style={styles.card}>
      {/* Item Info */}
      <Text style={{ fontWeight: 'bold' }}>
        {item.sokoname} ({item.itemBrand})
      </Text>
      <Text>Unit: {item.itemUnit}</Text>
      <Text>Item Price: {priceNum}</Text>

      {/* Deviation Section */}
      {loadingAlert ? (
        <ActivityIndicator style={{ marginVertical: 6 }} />
      ) : alert && parent ? (
        <>
          <Text>Seller Avg: {alert.avgItemPrice.toFixed(2)}</Text>
          <Text
            style={{
              color:
                Math.abs(alert.itemDeviation) > alert.allowedMargin
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            Seller Deviation: {alert.itemDeviation.toFixed(2)}% | Policy Margin: {parent.marketConsumptionPrice}%
          </Text>

          <Text>Market Avg (All Sellers): {alert.avgCategoryPrice.toFixed(2)}</Text>
          <Text
            style={{
              color:
                Math.abs(alert.categoryDeviation) > alert.allowedMargin
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            MiFedha Market Deviation: {alert.categoryDeviation.toFixed(2)}% | Policy Frequency: {parent.marketConsumptionFrequency}%
          </Text>

          <Text
            style={{
              color:
                Math.abs(alert.generalPriceDev) > Number(item.sokolnprcntg ?? 15)
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            Reference Price Deviation: {alert.generalPriceDev.toFixed(2)}% | Policy Total: {parent.marketConsumptionTotal}%
          </Text>

          <Text>Status: {alert.consumptionMarginStatus}</Text>
          <Text>Flag: {alert.priceFlag}</Text>
        </>
      ) : (
        <TouchableOpacity
          onPress={runDeviationCheck}
          style={[styles.qtyBtn, { marginVertical: 6 }]}
        >
          <Text>Check Deviations</Text>
        </TouchableOpacity>
      )}

      {/* Quantity + Add to Voucher */}
      <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() =>
            setQuantities(q => ({ ...q, [item.id]: Math.max(1, qty - 1) }))
          }
          style={styles.qtyBtn}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 8 }}>{qty}</Text>
        <TouchableOpacity
          onPress={() => setQuantities(q => ({ ...q, [item.id]: qty + 1 }))}
          style={styles.qtyBtn}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            alert
              ? handleAddToVoucher(item, alert)
              : Alert.alert('Check Price', 'Run deviation check first.')
          }
          style={[
            styles.qtyBtn,
            { marginLeft: 10, backgroundColor: canAdd ? '#4caf50' : '#ccc' },
          ]}
          disabled={!canAdd}
        >
          <Text style={{ color: 'white' }}>Add to Voucher</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


/* -------------------- Voucher Cart Card -------------------- */
const VoucherCartCard = ({
  item,
  quantity,
  onUpdateQuantity,
  onRemove,
  alert,
  parent,
}: {
  item: SokoItem;
  quantity: number;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  alert?: PriceAlert | null;   // add alert info
  parent?: any;                // add parent contract for policy values
}) => {
  const priceNum = Number(item.sokoprice) || 0;

  return (
    <View style={styles.voucherCard}>
      {/* Basic Item Info */}
      <Text style={{ fontWeight: 'bold' }}>{item.sokoname}</Text>
      <Text>{item.itemBrand}</Text>
      <Text>Unit: KES {priceNum.toFixed(2)}</Text>
      <Text>Total: KES {(priceNum * quantity).toFixed(2)}</Text>

      {/* Deviation Info if available */}
      {alert && parent && (
        <View style={{ marginTop: 6 }}>
          <Text>Seller Avg: {alert.avgItemPrice.toFixed(2)}</Text>
          <Text
            style={{
              color:
                Math.abs(alert.itemDeviation) > alert.allowedMargin
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            Seller Deviation: {alert.itemDeviation.toFixed(2)}% | Policy Margin: {parent.marketConsumptionPrice}%
          </Text>

          <Text>Market Avg (All Sellers): {alert.avgCategoryPrice.toFixed(2)}</Text>
          <Text
            style={{
              color:
                Math.abs(alert.categoryDeviation) > alert.allowedMargin
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            MiFedha Market Deviation: {alert.categoryDeviation.toFixed(2)}% | Policy Frequency: {parent.marketConsumptionFrequency}%
          </Text>

          <Text
            style={{
              color:
                Math.abs(alert.generalPriceDev) > Number(item.sokolnprcntg ?? 15)
                  ? '#f44336'
                  : '#4caf50',
            }}
          >
            Reference Price Deviation: {alert.generalPriceDev.toFixed(2)}% | Policy Total: {parent.marketConsumptionTotal}%
          </Text>
        </View>
      )}

      {/* Quantity Controls */}
      <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}
          style={styles.qtyBtn}
        >
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 8 }}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => onUpdateQuantity(item.id, quantity + 1)}
          style={styles.qtyBtn}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={[styles.qtyBtn, { marginLeft: 6, backgroundColor: '#f44336' }]}
        >
          <Text style={{ color: 'white' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


/* -------------------- Main Screen -------------------- */
const SellerConsumablesVoucherScreen = () => {
  const route = useRoute<any>();
  const sellerID = route.params.sellerAccount;
  const combContractID = route.params.id;

  const { value: filters, setValue: setFilters, debounced: debouncedFilters } = useDebouncedState({
    sokoname: '',
    itemBrand: '',
    itemSpecifications: '',
  }, 300);

  const [allItems, setAllItems] = useState<SokoItem[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [voucherItems, setVoucherItems] = useState<Record<string, { item: SokoItem; quantity: number }>>({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [parent, setParent] = useState<any>(null);
  const [priceAlerts, setPriceAlerts] = useState<Record<string, PriceAlert>>({});

  const bottomAnim = useRef(new Animated.Value(0)).current;

  // Animate bottom container
  useEffect(() => {
    Animated.timing(bottomAnim, {
      toValue: Object.keys(voucherItems).length ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [voucherItems]);

  const bottomContainerHeight = bottomAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 240],
  });

  const bottomPadding = Object.keys(voucherItems).length ? 250 : 20;

  /* ---------------- Fetch Items ---------------- */
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res: any = await API.graphql(
          graphqlOperation(listSokoAds, { filter: { sokokntct: { eq: sellerID } } })
        );
        setAllItems(res?.data?.listSokoAds?.items || []);
      } catch (err) {
        handleError('Could not load items.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [sellerID]);

  /* ---------------- Fetch Parent Contract ---------------- */
  const fetchParent = useCallback(async () => {
    try {
      const res: any = await API.graphql(
        graphqlOperation(getCombContract, { id: combContractID })
      );
      setParent(res?.data?.getCombContract);
    } catch (err) {
      handleError('Could not fetch parent contract.', err);
    }
  }, [combContractID]);

  useEffect(() => {
    fetchParent();
  }, [fetchParent]);

  /* ---------------- Filtering ---------------- */
  const filteredItems = useMemo(() => {
    const f = debouncedFilters;
    const n = (s: string) => s.toLowerCase().trim();
    return allItems.filter(i =>
      (!f.sokoname || n(i.sokoname).includes(n(f.sokoname))) &&
      (!f.itemBrand || n(i.itemBrand).includes(n(f.itemBrand))) &&
      (!f.itemSpecifications || n(i.itemSpecifications || '').includes(n(f.itemSpecifications)))
    );
  }, [allItems, debouncedFilters]);

  /* ---------------- Price Analysis + Caching ---------------- */
 const getPriceAlert = useCallback(async (item: SokoItem, parent: any): Promise<PriceAlert> => {
  const priceNum = Number(item.sokoprice) || 0;
  const allowedMargin = Number(item.sokolnprcntg ?? 15);
  const itemSpecs = item.itemSpecifications || '';

  /* -------- Seller Deviation (own history) -------- */
  const sellerRes: any = await API.graphql(
    graphqlOperation(listMarketConsumptions, {
      filter: {
        marketItemID: { eq: item.id }
      },
    })
  );
  const sellerItems = sellerRes?.data?.listMarketConsumptions?.items || [];
  const sellerAvg = sellerItems.length
    ? sellerItems.reduce((sum: number, i: any) => sum + Number(i.price || 0), 0) / sellerItems.length
    : priceNum;
  const sellerDeviation = sellerAvg > 0 ? ((priceNum - sellerAvg) / sellerAvg) * 100 : 0;

  /* -------- MiFedha Market Deviation (all sellers) -------- */
  const marketRes: any = await API.graphql(
    graphqlOperation(listMarketConsumptions, {
      filter: {
        sokoname: { eq: item.sokoname },
        itemBrand: { eq: item.itemBrand },
        itemSpecifications: { eq: itemSpecs },
      },
    })
  );
  const marketItems = marketRes?.data?.listMarketConsumptions?.items || [];
  const marketAvg = marketItems.length
    ? marketItems.reduce((sum: number, i: any) => sum + Number(i.price || 0), 0) / marketItems.length
    : sellerAvg;
  const marketDeviation = marketAvg > 0 ? ((priceNum - marketAvg) / marketAvg) * 100 : 0;

  /* -------- Reference Deviation (reference table) -------- */
  const avgFilter: any = {
    itemName: { eq: item.sokoname },
    itemBrand: { eq: item.itemBrand },
  };
  if (itemSpecs) avgFilter.itemSpecs = { eq: itemSpecs };

  const avgRes: any = await API.graphql(
    graphqlOperation(listAveragePrices, { filter: avgFilter })
  );
  const avgItems = avgRes?.data?.listAveragePrices?.items || [];
  const referencePrice = avgItems.length
    ? avgItems.reduce((sum: number, i: any) => sum + Number(i.itemPrice || 0), 0) / avgItems.length
    : sellerAvg;
  const referenceDeviation = referencePrice > 0 ? ((priceNum - referencePrice) / referencePrice) * 100 : 0;

  /* -------- Return structured alert -------- */
  return {
    avgItemPrice: sellerAvg,
    itemDeviation: sellerDeviation,          // seller vs own history
    allowedMargin,
    consumptionMarginStatus: sellerDeviation <= allowedMargin ? 'Cleared' : 'NotCleared',
    priceFlag: sellerDeviation > allowedMargin ? 'ABOVE_REFERENCE' : 'NORMAL',
    avgCategoryPrice: marketAvg,
    categoryDeviation: marketDeviation,      // seller vs all sellers
    generalPriceDev: referenceDeviation,     // seller vs reference table
  };
}, []);


  const getPriceAlertCached = useCallback(async (item: SokoItem) => {
    const cached = priceAlerts[item.id];
    if (cached) return cached;
    const res = await getPriceAlert(item);
    setPriceAlerts(prev => ({ ...prev, [item.id]: res }));
    return res;
  }, [priceAlerts, getPriceAlert]);

  /* ---------------- Voucher Helpers ---------------- */
  const cap = Number(parent?.consumptionCapping ?? 0);
  const isActiveCap = parent?.consumptionMarginStatus === 'Active';

  const getCurrentVoucherTotal = () =>
    Object.values(voucherItems).reduce(
      (sum, v) => sum + Number(v.item.sokoprice) * Number(v.quantity),
      0
    );

  const getRemainingFunds = () =>
    isActiveCap ? cap - getCurrentVoucherTotal() : null;

  const getFundsUsedPercentRaw = () =>
    isActiveCap && cap > 0 ? (getCurrentVoucherTotal() / cap) * 100 : 0;

  const getFundsUsedPercent = () => Math.min(getFundsUsedPercentRaw(), 100);

  const progressColor = (() => {
    const p = getFundsUsedPercentRaw();
    if (p > 100) return '#f44336'; // red
    if (p > 80) return '#f5a623'; // amber
    return '#4caf50'; // green
  })();

  /* ---------------- Add To Voucher ---------------- */
  const handleAddToVoucher = useCallback(
    (item: SokoItem, alert: PriceAlert) => {
      const qty = quantities[item.id] || 1;
      const itemTotal = Number(item.sokoprice) * qty;
      const currentTotal = getCurrentVoucherTotal();

      if (isActiveCap && currentTotal + itemTotal > cap) {
        Alert.alert('Insufficient Funds', "Adding this item would exceed the consumer's allocated funds.");
        return;
      }

      setVoucherItems(v => ({
        ...v,
        [item.id]: { item, quantity: (v[item.id]?.quantity || 0) + qty },
      }));
    },
    [quantities, cap, isActiveCap]
  );

  /* ---------------- Generate Voucher ---------------- */
  const handleGenerateVoucher = useCallback(async () => {
    if (updating || !parent) return;
    setUpdating(true);

    try {
      const totalVoucherAmount = Object.values(voucherItems).reduce(
        (sum, v) => sum + Number(v.item.sokoprice) * v.quantity,
        0
      );

      if (isActiveCap && totalVoucherAmount > cap) {
        Alert.alert('Insufficient Funds');
        return;
      }

      for (const v of Object.values(voucherItems)) {
        const alert = await getPriceAlertCached(v.item);
        await API.graphql(
          graphqlOperation(createCombContractVoucher, {
            input: {
              combContractID,
              marketItemID: v.item.id,
              itemName: v.item.sokoname,
              itemBrand: v.item.itemBrand,
              itemSpecifications: v.item.itemSpecifications,
              itemPrice: Number(v.item.sokoprice),
              numberOfItems: v.quantity,
              consumerEmail: parent.consumerEmail,
              funderEmail: parent.funderEmail,
              sellerEmail: parent.sellerEmail,
              consumerAccount: parent.consumerAccount,
              funderAccount: parent.funderAccount,
              sellerAccount: parent.sellerAccount,
              consumerContact: parent.consumerContact,
              funderContact: parent.funderContact,
              sellerContact: parent.sellerContact,
              consumerType: parent.consumerType,
              sellerType: parent.sellerType,
              funderType: parent.funderType,
              updateFrequency: parent.updateFrequency,
              sellerName: parent.sellerName,
              consumerName: parent.consumerName,
              funderName: parent.funderName,
              sellerOfficerName: parent.sellerOfficerName,
              consumerOfficerName: parent.consumerOfficerName,
              funderOfficerName: parent.funderOfficerName,
              marketConsumptionPrice: parent.marketConsumptionPrice,
              marketConsumptionFrequency: parent.marketConsumptionFrequency,
              marketConsumptionTotal: parent.marketConsumptionTotal,
              priceDeviation: alert.itemDeviation,
              referencePrice: alert.categoryDeviation,
              generalPriceDev: alert.generalPriceDev,
              consumptionCapping: isActiveCap
                ? Number(parent.consumptionCapping) - Number(v.item.sokoprice) * Number(v.quantity)
                : 0,
              consumptionMarginStatus: parent.consumptionMarginStatus,
              consumptionMargin: alert.itemDeviation,
              referencePriceSource: 'Market Data',
              priceFlag: alert.priceFlag,
              accStatus: 'Pending',
              marketConsumptionStatus: 'Approved',
              lastUpdateTime: new Date().toISOString(),
              settlementTime: parent.settlementTime,
              prepostPay: parent.prepostPay,
              repaymentPeriod: parent.repaymentPeriod,
              voucherLastUpdate: Date.now(),
            },
          })
        );
      }

      // Local patch for instant UI feedback
      

      // Backend truth update
      await API.graphql(
        graphqlOperation(updateCombContract, {
          input: {
            id: combContractID,
            accStatus: 'Completed',
            marketConsumptionStatus: 'Approved',
            lastUpdateTime: new Date().toISOString(),
            consumptionCapping: isActiveCap
              ? (Number(parent.consumptionCapping) - totalVoucherAmount).toFixed(2)
              : 0,
          },
        })
      );

      const Message = await API.graphql(
        graphqlOperation(createMessages, {
          input: {
            senderEmail: parent.consumerEmail,
            messageBody: `A COMB voucher has been generated by ${parent.sellerName}. Please go to COMB to approve or decline as per your funders specifications.`,
          },
        })
      );

      if (Message?.data?.createMessages) {
        await API.graphql(
          graphqlOperation(sendNotification, {
            riderEmail: parent.consumerEmail,
            title: 'MiFedha: COMB Contract',
            body: `A COMB voucher has been generated by ${parent.sellerName}. Please go to COMB to approve or decline as per your funders specifications.`,
          })
        );
      }

      // Clear UI cart
      setVoucherItems({});
      setQuantities({});

      // Re-fetch parent to align UI with backend
      await fetchParent();

      Alert.alert('Voucher Generated');
    } catch (err) {
      handleError('Failed to generate voucher.', err);
    } finally {
      setUpdating(false);
    }
  }, [voucherItems, updating, parent, cap, isActiveCap, combContractID, fetchParent, getPriceAlertCached]);

  /* ---------------- Render -------------------- */
  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Filters */}
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TextInput
          placeholder="Name"
          value={filters.sokoname}
          onChangeText={t => setFilters(f => ({ ...f, sokoname: t }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Brand"
          value={filters.itemBrand}
          onChangeText={t => setFilters(f => ({ ...f, itemBrand: t }))}
          style={styles.input}
        />
        <TextInput
          placeholder="Specs"
          value={filters.itemSpecifications}
          onChangeText={t => setFilters(f => ({ ...f, itemSpecifications: t }))}
          style={styles.input}
        />
      </View>

      {/* Items List */}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <ItemCard
              item={item}
              quantities={quantities}
              setQuantities={setQuantities}
              getPriceAlertCached={getPriceAlertCached}
              handleAddToVoucher={handleAddToVoucher}
              parent={parent}
              voucherItems={voucherItems}
            />
          )}
          contentContainerStyle={{ paddingBottom: bottomPadding }}
        />
      )}

      {/* Animated Voucher Bottom Container */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: bottomContainerHeight,
          backgroundColor: '#fff',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          paddingVertical: 10,
          paddingHorizontal: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        {Object.keys(voucherItems).length > 0 && (
          <>
            <FlatList
              horizontal
              data={Object.values(voucherItems)}
              keyExtractor={v => v.item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              renderItem={({ item: v }) => (
                <VoucherCartCard
                  item={v.item}
                  quantity={v.quantity}
                  onUpdateQuantity={(id, qty) =>
                    setVoucherItems(p => ({ ...p, [id]: { ...p[id], quantity: qty } }))
                  }
                  onRemove={(id) => {
                    const copy = { ...voucherItems };
                    delete copy[id];
                    setVoucherItems(copy);
                  }}
                />
              )}
            />

            {/* Funds Progress */}
            {isActiveCap && (
              <>
                <View style={{ backgroundColor: '#eee', borderRadius: 5, marginTop: 6, height: 8 }}>
                  <View
                    style={{
                      width: `${getFundsUsedPercent()}%`,
                      backgroundColor: progressColor,
                      borderRadius: 5,
                      height: 8,
                    }}
                  />
                </View>
                <Text style={{ textAlign: 'center', marginTop: 4 }}>
                  Remaining Funds: KES {getRemainingFunds()?.toFixed(2)}
                </Text>
              </>
            )}

            {/* Generate Button */}
            <Pressable
              onPress={handleGenerateVoucher}
              disabled={updating || !Object.keys(voucherItems).length || !parent}
              style={[
                styles.button,
                {
                  backgroundColor:
                    updating || !Object.keys(voucherItems).length || !parent ? '#ccc' : '#f5a623',
                  marginTop: 10,
                },
              ]}
            >
              {updating && <ActivityIndicator color="white" style={{ marginRight: 6 }} />}
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                {updating ? 'Generating...' : `Generate Voucher — ${Object.keys(voucherItems).length} items`}
              </Text>
            </Pressable>
          </>
        )}
      </Animated.View>
    </View>
  );
};

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    marginRight: 4,
    borderRadius: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  qtyBtn: {
    padding: 6,
    borderWidth: 1,
    borderColor: '#e58d29',
    borderRadius: 4,
  },
  voucherCard: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    marginRight: 10,
    width: 220,
    backgroundColor: '#fafafa',
  },
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SellerConsumablesVoucherScreen;
