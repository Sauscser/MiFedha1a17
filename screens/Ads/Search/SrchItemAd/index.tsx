// Complete, integrated MapView + Cart + Checkout + Filters + Custom Markers
// Responsive design with draggable filter, collapsible cart, responsive carousel spacing

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, Animated, PanResponder, ScrollView, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { generateClient } from 'aws-amplify/api';
import { getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';
import { remove } from 'aws-amplify/storage';
import { listSokoAds, getBizna, getCompany, getSMAccount, listCovCreditSellers, listCvrdGroupLoans, listSMLoansCovereds } from '../../../../src/graphql/queries';
import { createBenefitContributions2, createNonLoans, updateCompany, updateSMAccount, updateBizna, createMarketConsumption } from '../../../../src/graphql/mutations';
import { getSignedImageUrl } from '../../../../src/utils/getSignedImageUrl';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native';
const client = generateClient();
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const INPUT_KEYS = ['radius', 'brand', 'business', 'itemName', 'cheapestRank', 'bizName'];
const GAP = 4;
const SIDE_PADDING = 8;
const INPUT_WIDTH = (SCREEN_WIDTH - SIDE_PADDING * 2 - GAP * (INPUT_KEYS.length - 1)) / INPUT_KEYS.length;
const PLACEHOLDERS = {
  radius: 'Radius',
  brand: 'Brand',
  business: 'BizType',
  itemName: 'Item',
  cheapestRank: 'Cost Rank',
  bizName: 'BizName'
};
export default function SalesItemMapScreen({
  navigation
}) {
  const [filters, setFilters] = useState({
    radius: '0.1 KM',
    brand: '',
    business: '',
    itemName: '',
    cheapestRank: '1',
    bizName: ''
  });
  const [allItems, setAllItems] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [cart, setCart] = useState<any[]>([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [password, setPassword] = useState('');
  const [filteredItems2, setItems3] = useState<any[]>([]);
  const [Ttl, setFilteredItems3] = useState<any[]>([]);
  const [company, setCompany] = useState<any | null>(null);
  const VwSalesDtls4Transport = () => {
    navigation.navigate('VwSalesDtls4Transport');
  };
  const [OverallTotalDebit, setOverallTotalDebit] = useState(0);
  const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.55)).current;
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const mapRef = useRef<any>();
  const listRef = useRef<any>();
  type SokoItem = {
    id: string;
    sokoname: string;
    sokoprice: number;
    unitQuantity: number;
    itemUnit: string;
    itemBrand: string;
    bizName: string;
    businessType: string;
    bizContact: string;
    itemPhoto?: string;
    signedUrl?: string;
    ads: string;
    sokodesc: string;
  };

  // Keyboard listeners for carousel
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.25,
        useNativeDriver: false
      }).start();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.55,
        useNativeDriver: false
      }).start();
    });
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  // Draggable filter panel
  const pan = useRef(new Animated.ValueXY({
    x: 20,
    y: 40
  })).current;
  const panResponder = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
      pan.setValue({
        x: 0,
        y: 0
      });
    },
    onPanResponderMove: Animated.event([null, {
      dx: pan.x,
      dy: pan.y
    }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: () => pan.flattenOffset()
  })).current;

  // Carousel drag
  const carouselPanResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
    onPanResponderMove: (_, gestureState) => {
      carouselPosition.setValue(Math.min(Math.max(gestureState.moveY, SCREEN_HEIGHT * 0.2), SCREEN_HEIGHT * 0.8));
    },
    onPanResponderRelease: (_, gestureState) => {
      const finalY = gestureState.moveY;
      let toValue = SCREEN_HEIGHT * 0.55;
      if (finalY < SCREEN_HEIGHT * 0.4) toValue = SCREEN_HEIGHT * 0.3;else if (finalY > SCREEN_HEIGHT * 0.7) toValue = SCREEN_HEIGHT * 0.75;
      Animated.spring(carouselPosition, {
        toValue,
        useNativeDriver: false
      }).start();
    }
  })).current;

  // Location
  useEffect(() => {
    (async () => {
      const {
        status
      } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
      }
    })();
  }, []);

  // Fetch ads
  useEffect(() => {
    (async () => {
      try {
        const res: any = await client.graphql({
          query: listSokoAds
        });
        const rawItems = res.data.listSokoAds.items || [];
        setAllItems(rawItems);
        const ads = await Promise.all(rawItems.map(async (item: any) => {
          const signedUrl = item.itemPhoto ? await getSignedImageUrl(item.itemPhoto) : null;
          return {
            ...item,
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
            signedUrl
          };
        }));
        setItems3(ads);
        setFilteredItems3(ads);
      } catch (err) {
        console.error('Error fetching SokoAds:', err);
      }
    })();
  }, []);

  // Filtering
  const filteredItems = useMemo(() => {
    if (!userLocation) return [];
    const radius = Math.max(1, parseFloat(filters.radius) || 0.1);
    const rank = Math.max(1, parseInt(filters.cheapestRank) || 1);
    return allItems.filter(item => {
      const hasCoords = item.latitude && item.longitude;
      const distance = hasCoords ? getDistance(userLocation, {
        latitude: +item.latitude,
        longitude: +item.longitude
      }) / 1000 : Infinity;
      return distance <= radius && (!filters.brand || item.itemBrand?.toLowerCase().includes(filters.brand.toLowerCase())) && (!filters.business || item.businessType?.toLowerCase().includes(filters.business.toLowerCase())) && (!filters.itemName || item.sokoname?.toLowerCase().includes(filters.itemName.toLowerCase())) && (!filters.bizName || item.bizName?.toLowerCase().includes(filters.bizName.toLowerCase()));
    }).sort((a, b) => a.sokoprice - b.sokoprice).slice(0, rank);
  }, [filters, allItems, userLocation]);

  // Animate map to filtered region
  useEffect(() => {
    if (filteredItems.length && userLocation) {
      const radius = Math.max(0.1, parseFloat(filters.radius) || 0.1);
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: radius * 0.018,
        longitudeDelta: radius * 0.018
      });
    }
  }, [filteredItems]);

  // Quantity updates
  const updateQuantity = useCallback((id: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  }, []);

  // Item selection
  const onSelectItem = useCallback((item: any, index: number) => {
    setSelectedItemId(item.id);
    if (item.latitude && item.longitude) {
      mapRef.current?.animateToRegion({
        latitude: +item.latitude,
        longitude: +item.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    }
    listRef.current?.scrollToIndex({
      index,
      animated: true
    });
  }, []);

  // Cart management
  const onAddToCart = (item: any) => {
    const exists = cart.find(c => c.id === item.id);
    if (!exists) setCart([...cart, item]);
  };
  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Fetch company
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const result: any = await client.graphql({
          query: getCompany,
          variables: {
            AdminId: "BaruchHabaB'ShemAdonai2"
          }
        });
        setCompany(result.data.getCompany);
      } catch (err) {
        console.error("Error fetching company:", err);
      }
    };
    fetchCompany();
  }, []);

  // Calculate totals
  useEffect(() => {
    if (!company || cart.length === 0) {
      setOverallTotalDebit(0);
      return;
    }
    let total = 0;
    for (const item of cart) {
      const qty = quantities[item.id] || 1;
      const price = parseFloat(item.sokoprice) || 0;
      const feeRate = parseFloat(company.userTransferFee) || 0;
      const fee = price * qty * feeRate;
      total += price * qty + fee;
    }
    setOverallTotalDebit(total);
  }, [cart, quantities, company]);

  // Transaction logic (pivoted)
  const validateAndTransact2 = async () => {
    if (isLoading2) return;
    setIsLoading2(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    if (cart.length === 0) {
      setIsLoading2(false);
      Alert.alert("Error", "Add items to cart.");
      return;
    }
    if (!password) {
      setIsLoading2(false);
      Alert.alert("Error", "Enter your password to proceed.");
      return;
    }
    try {
      const navigateToChmRepay = () => navigation.navigate("AutomaticRepayAllTyps");

      // Loan checks
      const [loan1, loan2, loan3] = await Promise.all([client.graphql({
        query: listSMLoansCovereds,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              loaneeEmail: {
                eq: attributes.email
              }
            }]
          }
        }
      }), client.graphql({
        query: listCovCreditSellers,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              buyerContact: {
                eq: attributes.email
              }
            }]
          }
        }
      }), client.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              loaneePhn: {
                eq: attributes.email
              }
            }]
          }
        }
      })]);
      const hasLoan = loan1.data.listSMLoansCovereds.items.length > 0 || loan2.data.listCovCreditSellers.items.length > 0 || loan3.data.listCvrdGroupLoans.items.length > 0;
      if (hasLoan) return navigateToChmRepay();

      // User account
      const userResult: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const sender = userResult.data.getSMAccount;
      if (!sender || sender.pw !== password) {
        setIsLoading2(false);
        Alert.alert("Authentication Failed", "Incorrect password.");
        return;
      }
      const companyResult: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const company = companyResult.data.getCompany;
      let totalCost = 0;
      let totalCompanyEarnings = 0;
      let totalBenefit = 0;
      const sellerTotals: Record<string, any> = {};

      // Process cart items
      for (const item of cart) {
        const qty = quantities[item.id] || 1;
        const itemCost = parseFloat(item.sokoprice) * qty;
        const fee = itemCost * parseFloat(company.biznaCashSaleFee);
        const totalDebit = itemCost + fee;
        const benefit = fee * parseFloat(company.p2BBenCom) * 0.01;
        const compEarnings = fee - 2 * benefit;
        if (parseFloat(sender.balance) < totalDebit) {
          setIsLoading2(false);
          Alert.alert("Insufficient Funds");
          return;
        }
        await client.graphql({
          query: createMarketConsumption,
          variables: {
            input: {
              marketItemID: item.id,
              price: parseFloat(item.sokoprice).toFixed(2),
              sellerID: item.sokokntct,
              buyerID: attributes.email,
              soldAt: Date.now(),
              sokoname: item.sokoname,
              itemBrand: item.itemBrand,
              itemSpecifications: item.itemSpecifications
            }
          }
        });
        const bizResult: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: item.sokokntct
          }
        });
        const biz = bizResult.data.getBizna;
        if (!biz) {
          setIsLoading2(false);
          Alert.alert(`Could not find Account for business ${item.bizName}`);
          return;
        }
        const description = `${qty} ${item.itemUnit} of ${item.sokoname} @ ${item.sokoprice} = ${itemCost} bought at ${item.bizName} ${item.businessType}`;
        if (!sellerTotals[item.sokokntct]) {
          sellerTotals[item.sokokntct] = {
            totalItemCost: 0,
            totalBenefit: 0,
            description: []
          };
        }
        sellerTotals[item.sokokntct].description.push(description);
        sellerTotals[item.sokokntct].totalItemCost += itemCost;
        sellerTotals[item.sokokntct].totalBenefit += benefit;
        totalCost += itemCost;
        totalCompanyEarnings += compEarnings;
        totalBenefit += benefit;
      }

      // Update sellers
      for (const sokokntct in sellerTotals) {
        const totals = sellerTotals[sokokntct];
        const bizResult: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: sokokntct
          }
        });
        const biz = bizResult.data.getBizna;
        const usrDtls: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: attributes.email
          }
        });
        const usrDtlsx = usrDtls.data.getSMAccount;
        await client.graphql({
          query: createNonLoans,
          variables: {
            input: {
              recPhn: sokokntct,
              senderPhn: attributes.email,
              amount: totals.totalItemCost.toFixed(0),
              description: totals.description.join('\n'),
              RecName: biz.busName,
              SenderName: usrDtlsx.name,
              status: "cashSales",
              owner: sokokntct
            }
          }
        });
      }

      // Update user
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: attributes.email,
            ttlNonLonsSentSM: parseFloat(sender.ttlNonLonsSentSM) + totalCost,
            balance: parseFloat(sender.balance) - OverallTotalDebit,
            benefitsAmount: parseFloat(sender.benefitsAmount) + totalBenefit
          }
        }
      });
      Alert.alert("Success", "Transaction completed successfully.");
      setCart([]);
      setQuantities({});
      setPassword('');
      VwSalesDtls4Transport();
    } catch (err) {
      console.error("Transaction error:", err);
      Alert.alert("Error", "Something went wrong during the transaction.");
    } finally {
      setIsLoading2(false);
    }
  };
  const validateAndTransact = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const user = await getCurrentUser();
    const attributes = await fetchUserAttributes();
    if (cart.length === 0) {
      setIsLoading(false);
      Alert.alert("Error", "Add items to cart.");
      return;
    }
    if (!password) {
      setIsLoading(false);
      Alert.alert("Error", "Enter your password to proceed.");
      return;
    }
    try {
      const navigateToChmRepay = () => navigation.navigate("AutomaticRepayAllTyps");

      // Loan checks
      const [loan1, loan2, loan3] = await Promise.all([client.graphql({
        query: listSMLoansCovereds,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              loaneeEmail: {
                eq: attributes.email
              }
            }]
          }
        }
      }), client.graphql({
        query: listCovCreditSellers,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              buyerContact: {
                eq: attributes.email
              }
            }]
          }
        }
      }), client.graphql({
        query: listCvrdGroupLoans,
        variables: {
          filter: {
            and: [{
              status: {
                eq: "LoanBL"
              }
            }, {
              lonBala: {
                gt: 0
              }
            }, {
              loaneePhn: {
                eq: attributes.email
              }
            }]
          }
        }
      })]);
      const hasLoan = loan1.data.listSMLoansCovereds.items.length > 0 || loan2.data.listCovCreditSellers.items.length > 0 || loan3.data.listCvrdGroupLoans.items.length > 0;
      if (hasLoan) return navigateToChmRepay();

      // User account
      const userResult: any = await client.graphql({
        query: getSMAccount,
        variables: {
          awsemail: attributes.email
        }
      });
      const sender = userResult.data.getSMAccount;
      if (!sender || sender.pw !== password) {
        setIsLoading(false);
        Alert.alert("Authentication Failed", "Incorrect password.");
        return;
      }
      const companyResult: any = await client.graphql({
        query: getCompany,
        variables: {
          AdminId: "BaruchHabaB'ShemAdonai2"
        }
      });
      const company = companyResult.data.getCompany;
      let totalCost = 0;
      let totalCompanyEarnings = 0;
      let totalBenefit = 0;
      const sellerTotals: Record<string, any> = {};

      // Process cart items
      for (const item of cart) {
        const qty = quantities[item.id] || 1;
        const itemCost = parseFloat(item.sokoprice) * qty;
        const fee = itemCost * parseFloat(company.biznaCashSaleFee);
        const totalDebit = itemCost + fee;
        const benefit = fee * parseFloat(company.p2BBenCom);
        const compEarnings = fee - 2 * benefit;
        if (parseFloat(sender.balance) < totalDebit) {
          setIsLoading(false);
          Alert.alert("Insufficient Funds");
          return;
        }
        await client.graphql({
          query: createMarketConsumption,
          variables: {
            input: {
              marketItemID: item.id,
              price: parseFloat(item.sokoprice).toFixed(2),
              sellerID: item.sokokntct,
              buyerID: attributes.email,
              soldAt: Date.now(),
              sokoname: item.sokoname,
              itemBrand: item.itemBrand,
              itemSpecifications: item.itemSpecifications
            }
          }
        });
        const bizResult: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: item.sokokntct
          }
        });
        const biz = bizResult.data.getBizna;
        if (!biz) {
          setIsLoading(false);
          Alert.alert(`Could not find Account for business ${item.bizName}`);
          return;
        }
        const description = `${qty} ${item.itemUnit} of ${item.sokoname} @ ${item.sokoprice} = ${itemCost} bought at ${item.bizName} ${item.businessType}`;
        if (!sellerTotals[item.sokokntct]) {
          sellerTotals[item.sokokntct] = {
            totalItemCost: 0,
            totalBenefit: 0,
            description: []
          };
        }
        sellerTotals[item.sokokntct].description.push(description);
        sellerTotals[item.sokokntct].totalItemCost += itemCost;
        sellerTotals[item.sokokntct].totalBenefit += benefit;
        totalCost += itemCost;
        totalCompanyEarnings += compEarnings;
        totalBenefit += benefit;
      }

      // Update sellers
      for (const sokokntct in sellerTotals) {
        const totals = sellerTotals[sokokntct];
        const bizResult: any = await client.graphql({
          query: getBizna,
          variables: {
            BusKntct: sokokntct
          }
        });
        const biz = bizResult.data.getBizna;
        const usrDt: any = await client.graphql({
          query: getSMAccount,
          variables: {
            awsemail: attributes.email
          }
        });
        const usrDts = usrDt.data.getSMAccount;
        await client.graphql({
          query: updateBizna,
          variables: {
            input: {
              BusKntct: sokokntct,
              netEarnings: (parseFloat(biz.netEarnings) + totals.totalItemCost).toFixed(0),
              earningsBal: (parseFloat(biz.earningsBal) + totals.totalItemCost).toFixed(0),
              benefitsAmount: parseFloat(biz.benefitsAmount) + totals.totalBenefit
            }
          }
        });
        await client.graphql({
          query: createNonLoans,
          variables: {
            input: {
              recPhn: sokokntct,
              senderPhn: attributes.email,
              amount: totals.totalItemCost.toFixed(0),
              description: totals.description.join('\n'),
              RecName: biz.busName,
              SenderName: usrDts.name,
              status: "cashSales",
              owner: sokokntct
            }
          }
        });
      }

      // Update company
      await client.graphql({
        query: updateCompany,
        variables: {
          input: {
            AdminId: "BaruchHabaB'ShemAdonai2",
            companyEarningBal: totalCompanyEarnings + parseFloat(company.companyEarningBal),
            companyEarning: totalCompanyEarnings + parseFloat(company.companyEarning),
            ttlNonLonssRecSM: totalCost + parseFloat(company.ttlNonLonssRecSM),
            ttlNonLonssSentSM: totalCost + parseFloat(company.ttlNonLonssSentSM)
          }
        }
      });

      // Update user + contribution
      await client.graphql({
        query: updateSMAccount,
        variables: {
          input: {
            awsemail: attributes.email,
            ttlNonLonsSentSM: parseFloat(sender.ttlNonLonsSentSM) + totalCost,
            balance: parseFloat(sender.balance) - OverallTotalDebit,
            benefitsAmount: parseFloat(sender.benefitsAmount) + totalBenefit
          }
        }
      });
      await client.graphql({
        query: createBenefitContributions2,
        variables: {
          input: {
            benefitsID: "String",
            benefactorAc: cart.map(item => item.sokokntct).join(", "),
            benefactorPhone: cart.map(item => item.bizName).join(", "),
            beneficiaryAc: attributes.email,
            beneficiaryPhone: attributes.phone_number || "String",
            creatorEmail: attributes.email,
            prodName: cart.map(item => item.sokoname).join(", "),
            creatorName: sender.name,
            owner: user.userId,
            prodCost: 0,
            benefitsAmount: totalBenefit,
            beneficiaryType: "Pal",
            prodDesc: cart.map(item => {
              const qty = quantities[item.id] || 1;
              return `${qty} ${item.itemUnit} ${item.sokoname}`;
            }).join("; "),
            benefitStatus: "Active",
            amount: totalBenefit
          }
        }
      });
      setCart([]);
      setQuantities({});
      setPassword('');
      Alert.alert("Success", "Transaction completed successfully.");
    } catch (err) {
      console.error("Transaction error:", err);
      Alert.alert("Error", "Something went wrong during the transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  // Render
  if (!userLocation) {
    return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Locating you now…</Text>
      </View>;
  }
  return <View style={{
    flex: 1
  }}>
      {/* MapView */}
      <MapView ref={mapRef} style={{
      flex: 1
    }} showsUserLocation initialRegion={{
      ...userLocation,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05
    }}>
                {filteredItems.map((item, index) => <Marker key={item.id} coordinate={{
        latitude: +item.latitude,
        longitude: +item.longitude
      }} onPress={() => onSelectItem(item, index)} onLongPress={() => onAddToCart(item)}>
            <View style={[styles.markerContainer, selectedItemId === item.id && styles.selectedMarker]}>
              <Text style={styles.markerText}>{item.sokoprice}</Text>
            </View>
          </Marker>)}
      </MapView>

      {/* Draggable Filter Panel */}
      <Animated.View style={[styles.filterPanel, pan.getLayout()]} {...panResponder.panHandlers}>
        <View style={styles.inputsRow}>
          {INPUT_KEYS.map((key, idx) => <View key={key} style={{
          width: INPUT_WIDTH,
          marginRight: idx < INPUT_KEYS.length - 1 ? GAP : 0
        }}>
              <TextInput placeholder={PLACEHOLDERS[key]} keyboardType={['radius', 'cheapestRank'].includes(key) ? 'numeric' : 'default'} style={styles.input} placeholderTextColor="#999" value={filters[key]} onChangeText={text => setFilters(f => ({
            ...f,
            [key]: text
          }))} />
            </View>)}
        </View>
        <View style={styles.handleWrapper}><View style={styles.handleLine} /></View>
      </Animated.View>

      {/* Responsive Carousel */}
      <Animated.View style={[styles.carouselContainer, {
      top: carouselPosition
    }]} {...carouselPanResponder.panHandlers}>
        <FlatList ref={listRef} data={filteredItems} horizontal showsHorizontalScrollIndicator={false} keyExtractor={item => item.id} renderItem={({
        item,
        index
      }: {
        item: SokoItem;
        index: number;
      }) => {
        const qty = quantities[item.id] || 1;
        const total = qty * item.sokoprice;
        return <TouchableOpacity style={[styles.card, selectedItemId === item.id && styles.cardSelected, {
          flexDirection: 'row',
          alignItems: 'center'
        }]} onPress={() => onSelectItem(item, index)} onLongPress={() => onAddToCart(item)}>
                {/* RIGHT: Image */}
                {item.itemPhoto && <Image source={{
            uri: item.signedUrl || `https://mifedhasalesadsphotosc789c-mifedha.s3.us-east-1.amazonaws.com/public/${item.itemPhoto}`
          }} style={styles.carouselImage} resizeMode="cover" />}

                {/* LEFT: Text and buttons */}
                <View style={{
            flex: 1,
            paddingRight: 10
          }}>
                  <Text style={styles.text}>
                    [{qty}×{item.unitQuantity}] {item.itemUnit} {item.itemBrand} {item.sokoname} @ KES {item.sokoprice} at {item.bizName} ({item.businessType}) = KES {total}
                    {'\n'}{item.bizContact} | Long press to add to cart
                  </Text>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.btn}>
                      <Text>−</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("DtldSalesInfo", {
                item: item.id
              })} style={[styles.btn, {
                backgroundColor: '#e58d29'
              }]}>
                      <Text style={{
                  color: 'white',
                  fontSize: 12
                }}>View Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.btn}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>;
      }} />
      </Animated.View>

      {/* Cart - collapsible */}
      <View style={[styles.cartContainer, {
      width: SCREEN_WIDTH * 0.5
    }]}>
        <TouchableOpacity onPress={() => setCartExpanded(!cartExpanded)}>
          <Text style={{
          fontWeight: 'bold'
        }}>{cartExpanded ? 'Hide' : 'Show'} Cart ({cart.length})</Text>
        </TouchableOpacity>
        {cartExpanded && <ScrollView>
            {cart.map(item => <View key={item.id} style={{
          marginVertical: 5
        }}>
                <Text>{item.sokoname} @ {item.sokoprice} × {quantities[item.id] || 1}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={{
              color: 'red'
            }}>Remove</Text>
                </TouchableOpacity>
              </View>)}
            <Text style={{
          fontWeight: 'bold',
          marginTop: 10
        }}>Total: KES {OverallTotalDebit.toFixed(2)}</Text>
            <TextInput placeholder="Enter Password" secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} style={styles.passwordInput} />
            <TouchableOpacity onPress={validateAndTransact2} style={styles.checkoutBtn}>
              {isLoading2 ? <ActivityIndicator color="white" /> : <Text style={{
            color: 'white'
          }}>Quick Checkout</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={validateAndTransact} style={[styles.checkoutBtn, {
          backgroundColor: '#34a4a1'
        }]}>
              {isLoading ? <ActivityIndicator color="white" /> : <Text style={{
            color: 'white'
          }}>Full Checkout</Text>}
            </TouchableOpacity>
          </ScrollView>}
      </View>
    </View>;
}
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerContainer: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333'
  },
  selectedMarker: {
    backgroundColor: '#e58d29',
    borderColor: '#e58d29'
  },
  markerText: {
    fontWeight: 'bold',
    color: '#000'
  },
  filterPanel: {
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 8,
    elevation: 4
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 6,
    fontSize: 12,
    backgroundColor: '#fff'
  },
  handleWrapper: {
    alignItems: 'center',
    marginTop: 6
  },
  handleLine: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2
  },
  carouselContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    paddingVertical: 8
  },
  card: {
    width: SCREEN_WIDTH * 0.8,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 3
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#e58d29'
  },
  carouselImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10
  },
  text: {
    fontSize: 12,
    color: '#333'
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'space-between'
  },
  btn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#eee',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    padding: 10,
    elevation: 6
  },
  passwordInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    height: 40
  },
  checkoutBtn: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center'
  }
});