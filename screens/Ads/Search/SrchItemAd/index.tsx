// Complete, integrated MapView + Cart + Checkout + Filters + Custom Markers
// Responsive design with draggable filter, collapsible cart, responsive carousel spacing

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  View, Text, TextInput, FlatList, TouchableOpacity,
  StyleSheet, Dimensions, ActivityIndicator,
   Animated, PanResponder, ScrollView, Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';


import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import { API, graphqlOperation, Auth, Storage} from 'aws-amplify';
import { 
  listSokoAds,  
  getBizna,
  getCompany,
  getSMAccount,
  listCovCreditSellers,
  listCvrdGroupLoans,
  listSMLoansCovereds,} from '../../../../src/graphql/queries';
  import { getSignedImageUrl } from '../../../../src/utils/getSignedImageUrl';
import {
  createBenefitContributions2,
  createNonLoans,
  updateCompany,
  updateSMAccount,
  updateBizna,
  createMarketConsumption,
} from '../../../../src/graphql/mutations';
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'react-native'; // ✅ This is correct
import { isLoading } from 'expo-font';


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

export default function SalesItemMapScreen({ navigation }) {
  const [filters, setFilters] = useState({ radius: '0.1 KM', brand: '', business: '', itemName: '', cheapestRank: '1', bizName: '' });
  const [allItems, setAllItems] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [cartExpanded, setCartExpanded] = useState(true);
  const [password, setPassword] = useState('');
  const [filteredItems2, setItems3] = useState<any[]>([]);
  const [Ttl, setFilteredItems3] = useState<any[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
const VwSalesDtls4Transport = () => {
    navigation.navigate('VwSalesDtls4Transport');
  };

   
   const [OverallTotalDebit, setOverallTotalDebit] = useState(0);
   const carouselPosition = useRef(new Animated.Value(SCREEN_HEIGHT * 0.55)).current;

   
    const[isLoading2, setIsLoading2] = useState(false);
        const[isLoading, setIsLoading] = useState(false);

      const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    

  const mapRef = useRef();
  const listRef = useRef();

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
  ads:string;
  sokodesc: string;
};


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.25,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.spring(carouselPosition, {
        toValue: SCREEN_HEIGHT * 0.55,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const pan = useRef(new Animated.ValueXY({ x: 20, y: 40 })).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: () => pan.flattenOffset(),
    })
  ).current;

  
  const carouselPanResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
      onPanResponderMove: (_, gestureState) => {
        carouselPosition.setValue(Math.min(Math.max(gestureState.moveY, SCREEN_HEIGHT * 0.2), SCREEN_HEIGHT * 0.8));
      },
      onPanResponderRelease: (_, gestureState) => {
        const finalY = gestureState.moveY;
        let toValue = SCREEN_HEIGHT * 0.55;
        if (finalY < SCREEN_HEIGHT * 0.4) toValue = SCREEN_HEIGHT * 0.3;
        else if (finalY > SCREEN_HEIGHT * 0.7) toValue = SCREEN_HEIGHT * 0.75;
        Animated.spring(carouselPosition, {
          toValue,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await API.graphql(graphqlOperation(listSokoAds));

        const rawItems = res.data.listSokoAds.items || [];
        setAllItems(rawItems || []);

        const ads = await Promise.all(
      rawItems.map(async (item: any) => {
        const signedUrl = item.itemPhoto
          ? await getSignedImageUrl(item.itemPhoto)
          : null;

        return {
          ...item,
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          signedUrl,
        };
      })
    );


      setItems3(ads);
    setFilteredItems3(ads);
      } catch (err) {
        console.error('Error fetching SokoAds:', err);
      }
    })();
  }, []);

  const filteredItems = useMemo(() => {
    if (!userLocation) return [];
    const radius = Math.max(1, parseFloat(filters.radius) || 0.1);
    const rank = Math.max(1, parseInt(filters.cheapestRank) || 1);
    return allItems
      .filter(item => {
        const hasCoords = item.latitude && item.longitude;
        const distance = hasCoords
          ? getDistance(userLocation, { latitude: +item.latitude, longitude: +item.longitude }) / 1000
          : Infinity;
        return (
          distance <= radius &&
          (!filters.brand || item.itemBrand?.toLowerCase().includes(filters.brand.toLowerCase())) &&
          (!filters.business || item.businessType?.toLowerCase().includes(filters.business.toLowerCase())) &&
          (!filters.itemName || item.sokoname?.toLowerCase().includes(filters.itemName.toLowerCase())) &&
            (!filters.bizName || item.bizName?.toLowerCase().includes(filters.bizName.toLowerCase()))
        );
      })
      .sort((a, b) => a.sokoprice - b.sokoprice)
      .slice(0, rank);
  }, [filters, allItems, userLocation]);

  useEffect(() => {
    if (filteredItems.length && userLocation) {
      const radius = Math.max(0.1, parseFloat(filters.radius) || 0.1);
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: radius * 0.018,
        longitudeDelta: radius * 0.018,
      });
    }
  }, [filteredItems]);

  const updateQuantity = useCallback((id, delta) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  }, []);

  const onSelectItem = useCallback((item, index) => {
    setSelectedItemId(item.id);
    if (item.latitude && item.longitude) {
      mapRef.current?.animateToRegion({
        latitude: +item.latitude,
        longitude: +item.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    listRef.current?.scrollToIndex({ index, animated: true });
  }, []);

  const onAddToCart = (item) => {
    const exists = cart.find(c => c.id === item.id);
    if (!exists) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

 
    const showError = (msg) => {
      Alert.alert(msg);
      setIsLoading(false);
    }

    useEffect(() => {
  const fetchCompany = async () => {
    try {
      const result = await API.graphql(graphqlOperation(getCompany, {
        AdminId: "BaruchHabaB'ShemAdonai2"
      }));
      setCompany(result.data.getCompany);
    } catch (err) {
      console.error("Error fetching company:", err);
    }
  };

  fetchCompany();
}, []);


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
    total += (price * qty) + fee;
  }

  setOverallTotalDebit(total);
}, [cart, quantities, company]);

  
const validateAndTransact2 = async () => {
  if (isLoading2)
  return

  setIsLoading2(true)
  const user = await Auth.currentAuthenticatedUser();

  if (cart.length === 0) {
     setIsLoading2(false)
    Alert.alert("Error", "Add items to cart.");
   
    return;
  }

  if (!password) {
    setIsLoading2(false)
    Alert.alert("Error", "Enter your password to proceed.");
   
    return;
  }

  try {
   
    const navigateToChmRepay = () => navigation.navigate("AutomaticRepayAllTyps");

    const [loan1, loan2, loan3] = await Promise.all([
      API.graphql(graphqlOperation(listSMLoansCovereds, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { loaneeEmail: { eq: user.attributes.email } }
          ]
        }
      })),
      API.graphql(graphqlOperation(listCovCreditSellers, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { buyerContact: { eq: user.attributes.email } }
          ]
        }
      })),
      API.graphql(graphqlOperation(listCvrdGroupLoans, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { loaneePhn: { eq: user.attributes.email } }
          ]
        }
      }))
    ]);

    const hasLoan =
      loan1.data.listSMLoansCovereds.items.length > 0 ||
      loan2.data.listCovCreditSellers.items.length > 0 ||
      loan3.data.listCvrdGroupLoans.items.length > 0;

    if (hasLoan) return navigateToChmRepay();

    const userResult = await API.graphql(graphqlOperation(getSMAccount, { awsemail: user.attributes.email }));
    const sender = userResult.data.getSMAccount;

    const benAmnts = await API.graphql(graphqlOperation(getSMAccount, { awsemail: sender.beneficiary }));
    const beneficiaryAmt = benAmnts.data.getSMAccount;

    if (!sender || sender.pw !== password) {
       setIsLoading2(false);
      Alert.alert("Authentication Failed", "Incorrect password.");
     
      return;
    }

    const companyResult = await API.graphql(graphqlOperation(getCompany, {
      AdminId: "BaruchHabaB'ShemAdonai2"
    }));
    const company = companyResult.data.getCompany;

    let totalCost = 0;
    let totalCompanyEarnings = 0;
    let totalBenefit = 0;
   
    const sellerTotals: Record<string, {
      totalItemCost: number;
      totalBenefit: number;
      netEarnings: number;
      earningsBal: number;
      description: string[];
      itemID: string;
      itemIDs: string;
    }> = {};

    

    // ✅ Process items individually
    for (const item of cart) {
      const { sokoname, sokoprice, itemBrand, itemSpecifications, sokokntct, id, itemUnit, bizName, businessType, ItemCode } = item;
      const qty = quantities[item.id] || 1;
      const itemCost = parseFloat(sokoprice) * qty;
      const fee = itemCost * parseFloat(company.biznaCashSaleFee);
      
      const totalDebit = itemCost + fee;
      const benefit = fee * parseFloat(company.p2BBenCom)*0.01;
      const compEarnings = fee - (2 * benefit);

      if (parseFloat(sender.balance) < totalDebit) {
        setIsLoading2(false);
        Alert.alert("Insufficient Funds");
        
        return;
      }

      await API.graphql(graphqlOperation(createMarketConsumption, {
        input: {
          marketItemID: id,
          price: parseFloat(sokoprice).toFixed(2),
          sellerID: sokokntct,
          buyerID: user.attributes.email,
          soldAt: Date.now(),
          sokoname: sokoname,
          itemBrand: itemBrand,
          itemSpecifications: itemSpecifications,
        }
      }));


      // Fetch business info
      const bizResult = await API.graphql(graphqlOperation(getBizna, { BusKntct: sokokntct }));
      const biz = bizResult.data.getBizna;
      if (!biz) {
         setIsLoading2(false);
        Alert.alert(`Could not find Account for business ${bizName}`);
       
        return;
      }

     const description = `${qty} ${itemUnit} of ${sokoname} @ ${sokoprice} = ${itemCost} bought at ${bizName} ${businessType}: serial number ${ItemCode}`;
const itemID = item.id;
const itemIDs = item.id;


      // Create transaction record
      

      // Merge into sellerTotals
      if (!sellerTotals[sokokntct]) {
        sellerTotals[sokokntct] = {
          totalItemCost: 0,
          totalBenefit: 0,
          netEarnings: parseFloat(biz.netEarnings),
          earningsBal: parseFloat(biz.earningsBal),
          description: [],
          itemID: "",
          itemIDs: ""
        };
      }
      sellerTotals[sokokntct].description.push(description);
      sellerTotals[sokokntct].itemID=itemID;
      itemIDs;
      sellerTotals[sokokntct].totalItemCost += itemCost;
      sellerTotals[sokokntct].totalBenefit += benefit;

      // Accumulate global totals
      totalCost += itemCost;
      totalCompanyEarnings += compEarnings;
      totalBenefit += benefit;
   
      
    }

    // ✅ Update each unique seller once
    for (const sokokntct in sellerTotals) {
      const totals = sellerTotals[sokokntct];
      const bizResult = await API.graphql(graphqlOperation(getBizna, { BusKntct: sokokntct }));
      const biz = bizResult.data.getBizna;

      const usrDtls = await API.graphql(graphqlOperation(getSMAccount, { awsemail: user.attributes.email }));
      const usrDtlsx = usrDtls.data.getSMAccount;
      
      const fullDescription = totals.description.join('\n');
      const allItemsID = totals.itemID


      console.log(fullDescription, allItemsID);

      
      
      await API.graphql(graphqlOperation(createNonLoans, {
        input: {
          recPhn: sokokntct,
          senderPhn: user.attributes.email,
          amount: (totals.totalItemCost).toFixed(0),
          description: fullDescription,
          RecName: biz.busName,
          SenderName: usrDtlsx.name,
          status: "cashSales",

          owner: allItemsID,
        }
      }));

    }

    // ✅ Update user + contribution once

      
    const res =  await API.graphql(graphqlOperation(updateSMAccount, {
        input: {
          awsemail: user.attributes.email,
          ttlNonLonsSentSM: parseFloat(sender.ttlNonLonsSentSM) + totalCost,
          balance: parseFloat(sender.balance) - OverallTotalDebit,
        }
      }));

if (res?.data?.updateSMAccount) {
  VwSalesDtls4Transport();
}

    setCart([]);
    setQuantities({});
    setPassword('');
    Alert.alert("Success", "Transaction completed successfully.");
  } catch (err) {
    console.error("Transaction error:", err);
    Alert.alert("Error", "Something went wrong during the transaction.");
  } finally {
    setIsLoading2(false);
  }
};

const validateAndTransact = async () => {
  if (isLoading)
  return

  setIsLoading(true)
  const user = await Auth.currentAuthenticatedUser();

  if (cart.length === 0) {
     setIsLoading(false)
    Alert.alert("Error", "Add items to cart.");
   
    return;
  }

  if (!password) {
    setIsLoading(false)
    Alert.alert("Error", "Enter your password to proceed.");
   
    return;
  }

  try {
   
    const navigateToChmRepay = () => navigation.navigate("AutomaticRepayAllTyps");

    const [loan1, loan2, loan3] = await Promise.all([
      API.graphql(graphqlOperation(listSMLoansCovereds, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { loaneeEmail: { eq: user.attributes.email } }
          ]
        }
      })),
      API.graphql(graphqlOperation(listCovCreditSellers, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { buyerContact: { eq: user.attributes.email } }
          ]
        }
      })),
      API.graphql(graphqlOperation(listCvrdGroupLoans, {
        filter: {
          and: [
            { status: { eq: "LoanBL" } },
            { lonBala: { gt: 0 } },
            { loaneePhn: { eq: user.attributes.email } }
          ]
        }
      }))
    ]);

    const hasLoan =
      loan1.data.listSMLoansCovereds.items.length > 0 ||
      loan2.data.listCovCreditSellers.items.length > 0 ||
      loan3.data.listCvrdGroupLoans.items.length > 0;

    if (hasLoan) return navigateToChmRepay();

    const userResult = await API.graphql(graphqlOperation(getSMAccount, { awsemail: user.attributes.email }));
    const sender = userResult.data.getSMAccount;

    const benAmnts = await API.graphql(graphqlOperation(getSMAccount, { awsemail: sender.beneficiary }));
    const beneficiaryAmt = benAmnts.data.getSMAccount;

    if (!sender || sender.pw !== password) {
       setIsLoading(false);
      Alert.alert("Authentication Failed", "Incorrect password.");
     
      return;
    }

    const companyResult = await API.graphql(graphqlOperation(getCompany, {
      AdminId: "BaruchHabaB'ShemAdonai2"
    }));
    const company = companyResult.data.getCompany;

    let totalCost = 0;
    let totalCompanyEarnings = 0;
    let totalBenefit = 0;
   
    const sellerTotals: Record<string, {
      totalItemCost: number;
      totalBenefit: number;
      netEarnings: number;
      earningsBal: number;
      description: string[];
      itemID: string;
      itemIDs: string;
    }> = {};

    

    // ✅ Process items individually
    for (const item of cart) {
      const { sokoname, sokoprice, itemBrand, itemSpecifications, sokokntct, id, itemUnit, bizName, businessType, ItemCode } = item;
      const qty = quantities[item.id] || 1;
      const itemCost = parseFloat(sokoprice) * qty;
      const fee = itemCost * parseFloat(company.biznaCashSaleFee);
      
      const totalDebit = itemCost + fee;
      const benefit = fee * parseFloat(company.p2BBenCom)*0.01;
      const compEarnings = fee - (2 * benefit);

      if (parseFloat(sender.balance) < totalDebit) {
        setIsLoading(false);
        Alert.alert("Insufficient Funds");
        
        return;
      }

      await API.graphql(graphqlOperation(createMarketConsumption, {
        input: {
          marketItemID: id,
          price: parseFloat(sokoprice).toFixed(2),
          sellerID: sokokntct,
          buyerID: user.attributes.email,
          soldAt: Date.now(),
          sokoname: sokoname,
          itemBrand: itemBrand,
          itemSpecifications: itemSpecifications,
        }
      }));


      // Fetch business info
      const bizResult = await API.graphql(graphqlOperation(getBizna, { BusKntct: sokokntct }));
      const biz = bizResult.data.getBizna;
      if (!biz) {
         setIsLoading(false);
        Alert.alert(`Could not find Account for business ${bizName}`);
       
        return;
      }

     const description = `${qty} ${itemUnit} of ${sokoname} @ ${sokoprice} = ${itemCost} bought at ${bizName} ${businessType}: serial number ${ItemCode}`;
const itemID = item.id;
const itemIDs = item.id;


      // Create transaction record
      

      // Merge into sellerTotals
      if (!sellerTotals[sokokntct]) {
        sellerTotals[sokokntct] = {
          totalItemCost: 0,
          totalBenefit: 0,
          netEarnings: parseFloat(biz.netEarnings),
          earningsBal: parseFloat(biz.earningsBal),
          description: [],
          itemID: "",
          itemIDs: ""
        };
      }
      sellerTotals[sokokntct].description.push(description);
      sellerTotals[sokokntct].itemID=itemID;
      itemIDs;
      sellerTotals[sokokntct].totalItemCost += itemCost;
      sellerTotals[sokokntct].totalBenefit += benefit;

      // Accumulate global totals
      totalCost += itemCost;
      totalCompanyEarnings += compEarnings;
      totalBenefit += benefit;
   
      
    }

    // ✅ Update each unique seller once
    for (const sokokntct in sellerTotals) {
      const totals = sellerTotals[sokokntct];
      const bizResult = await API.graphql(graphqlOperation(getBizna, { BusKntct: sokokntct }));
      const biz = bizResult.data.getBizna;

      const usrDt = await API.graphql(graphqlOperation(getSMAccount, { awsemail: user.attributes.email }));
      const usrDts = usrDt.data.getSMAccount;
      
      const fullDescription = totals.description.join('\n');
      const allItemsID = totals.itemID


      console.log(fullDescription, allItemsID);

      await API.graphql(graphqlOperation(updateBizna, {
        input: {
          BusKntct: sokokntct,
          netEarnings: (totals.netEarnings + totals.totalItemCost).toFixed(0),
          earningsBal: (totals.earningsBal + totals.totalItemCost).toFixed(0),
          benefitsAmount: parseFloat(biz.benefitsAmount) + totals.totalBenefit,
        }
      }));

      
      await API.graphql(graphqlOperation(createNonLoans, {
        input: {
          recPhn: sokokntct,
          senderPhn: user.attributes.email,
          amount: (totals.totalItemCost).toFixed(0),
          description: fullDescription,
          RecName: biz.busName,
          SenderName: usrDts.name,
          status: "cashSales",

          owner: allItemsID,
        }
      }));

    }

    

    // ✅ Update company once
    await API.graphql(graphqlOperation(updateCompany, {
      input: {
        AdminId: "BaruchHabaB'ShemAdonai2",
        companyEarningBal: totalCompanyEarnings + parseFloat(company.companyEarningBal),
        companyEarning: totalCompanyEarnings + parseFloat(company.companyEarning),
        ttlNonLonssRecSM: totalCost + parseFloat(company.ttlNonLonssRecSM),
        ttlNonLonssSentSM: totalCost + parseFloat(company.ttlNonLonssSentSM),
      }
    }));

    // ✅ Update user + contribution once
    
      await API.graphql(graphqlOperation(updateSMAccount, {
        input: {
          awsemail: user.attributes.email,
          ttlNonLonsSentSM: parseFloat(sender.ttlNonLonsSentSM) + totalCost,
          balance: parseFloat(sender.balance) - OverallTotalDebit,
          benefitsAmount: parseFloat(sender.benefitsAmount) + totalBenefit,
        }
      }));

      await API.graphql(graphqlOperation(createBenefitContributions2, {
  input: {
    benefitsID: "String",
    benefactorAc: cart.map(item => item.sokokntct).join(", "),
    benefactorPhone: cart.map(item => item.bizName).join(", "),
    beneficiaryAc: user.attributes.email,
    beneficiaryPhone: user.attributes.phone_number || "String",
    creatorEmail: user.attributes.email,
    prodName: cart.map(item => item.sokoname).join(", "),
    creatorName: sender.name,
    owner: user.attributes.sub,
    prodCost: 0,
    benefitsAmount: totalBenefit,
    beneficiaryType: "Pal",
    prodDesc: cart.map(item => {
      const qty = quantities[item.id] || 1;
      return `${qty} ${item.itemUnit} ${item.sokoname}`;
    }).join("; "),
    benefitStatus: "Active",
    amount: totalBenefit,
  }
}));

    

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



  if (!userLocation) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Locating you now…</Text>
      </View>
    );
  }

  return (
   
    <View style={{ flex: 1 }}>
      <MapView ref={mapRef} style={{ flex: 1 }} showsUserLocation initialRegion={{
        ...userLocation,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
     
      
      >
        {filteredItems.map((item, index) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: +item.latitude, longitude: +item.longitude }}
            onPress={() => onSelectItem(item, index)}
            onLongPress={() => onAddToCart(item)}
          >
            <View style={[styles.markerContainer, selectedItemId === item.id && styles.selectedMarker]}>
              <Text style={styles.markerText}>{item.sokoprice}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Draggable Filter Panel */}
      <Animated.View style={[styles.filterPanel, pan.getLayout()]} {...panResponder.panHandlers}>
        <View style={styles.inputsRow}>
          {INPUT_KEYS.map((key, idx) => (
            <View key={key} style={{ width: INPUT_WIDTH, marginRight: idx < INPUT_KEYS.length - 1 ? GAP : 0 }}>
              <TextInput
                placeholder={PLACEHOLDERS[key]}
                keyboardType={['radius', 'cheapestRank'].includes(key) ? 'numeric' : 'default'}
                style={styles.input}
                placeholderTextColor="#999"
                value={filters[key]}
                onChangeText={text => setFilters(f => ({ ...f, [key]: text }))}
              />
            </View>
          ))}
        </View>
        <View style={styles.handleWrapper}><View style={styles.handleLine} /></View>
      </Animated.View>

      {/* Responsive Carousel */}

      

      <Animated.View style={[styles.carouselContainer, { top: carouselPosition }]}>

     
        <FlatList
          ref={listRef}
          data={filteredItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item, index }: { item: SokoItem; index: number }) => {
            const qty = quantities[item.id] || 1;
            const total = qty * item.sokoprice;

            return (
             <TouchableOpacity
      style={[
        styles.card,
        selectedItemId === item.id && styles.cardSelected,
        { flexDirection: 'row', alignItems: 'center' }, // Ensures side-by-side layout
      ]}
      onPress={() => onSelectItem(item, index)}
      onLongPress={() => onAddToCart(item)}
    >
      {/* RIGHT: Image */}
      {item.itemPhoto && (
        <Image
          source={{ uri: `https://mifedhasalesadsphotosc789c-mifedha.s3.us-east-1.amazonaws.com/public/${item.itemPhoto}` }}
          style={styles.carouselImage}
          resizeMode="cover"
        />
      )}

      {/* LEFT: Text and buttons */}
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.text}>
          [{qty}×{item.unitQuantity}] {item.itemUnit} {item.itemBrand} {item.sokoname} @ KES {item.sokoprice} at {item.bizName} ({item.businessType}) = KES {total}
          {'\n'}{item.bizContact} | Long press to add to cart
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={styles.btn}>
            <Text>−</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("DtldSalesInfo", { item: item.id })}
            style={[styles.btn, { backgroundColor: '#e58d29' }]}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>View Details</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={styles.btn}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>

    </TouchableOpacity>
            );
          }}
        />
        </Animated.View>

      {/* Cart - collapsible */}
      <View style={[styles.cartContainer, { width: SCREEN_WIDTH * 0.5 }]}>
        <TouchableOpacity onPress={() => setCartExpanded(!cartExpanded)}>
          <Text style={{ fontWeight: 'bold' }}>{cartExpanded ? 'Hide' : 'Show'} Cart ({cart.length})</Text>
        </TouchableOpacity>
        {cartExpanded && (
          <ScrollView>
            {cart.map(item => (
              <View key={item.id} style={{ marginVertical: 4 }}>
                <Text>{item.itemBrand} {item.sokoname} x {quantities[item.id] || 1} = KES {((quantities[item.id] || 1)*(item.sokoprice)).toFixed(2)}  </Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}><Text style={{ color: 'red' }}>Remove</Text></TouchableOpacity>
              </View>
            ))}
            <TextInput
              placeholder="Enter password"
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
              style={{ borderWidth: 1, marginTop: 6, padding: 4 }}
            />

             <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <FontAwesome name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={validateAndTransact} style={styles.button}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buy in Person Pay KES {(OverallTotalDebit).toFixed(2)}</Text>
          )}
        </TouchableOpacity>


        <TouchableOpacity onPress={validateAndTransact2} style={styles.button}>
          {isLoading2 ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buy Online Pay KES {(OverallTotalDebit).toFixed(2)}</Text>
          )}
        </TouchableOpacity>
             
           
          </ScrollView>
        )}
      </View>
    </View>
   
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filterPanel: {
    position: 'absolute', backgroundColor: 'white', borderRadius: 8, 
    padding: 6, elevation: 5, zIndex: 1, 
  },
  inputsRow: { flexDirection: 'row', justifyContent: 'space-between', },
  handleWrapper: { alignItems: 'center', marginTop: 4 , },
  handleLine: { width: 38, height: 10, backgroundColor: '#aaa', borderRadius: 2 },
  input: {
    borderBottomWidth: 1, fontSize: 10, fontWeight:'bold', color: '#e58d29',
    paddingVertical: 2, paddingHorizontal: 2, backgroundColor: '#f5f5f5', height: 15
  },

  carouselImage: {
  width: 100,
  height: 100,
  borderRadius: 8,
  alignSelf: 'center',
},

  markerContainer: {
    backgroundColor: '#fff', padding: 4, borderRadius: 6, borderWidth: 1, borderColor: 'gray',
  },
  selectedMarker: { backgroundColor: '#e58d29', borderColor: 'white' },
  markerText: { fontSize: 10, fontWeight: 'bold' },
  carouselContainer: {position: 'absolute',
  width: SCREEN_WIDTH,
  height: 130,
  
  backgroundColor: 'rgba(255,255,255,0.95)',
  zIndex: 1,
  pointerEvents: 'box-none',
  },
  card: {
    backgroundColor: 'white', marginHorizontal: 6, padding: 1, borderRadius: 6, 
    width: SCREEN_WIDTH*0.8, elevation: 2, 
    
  },
  cardSelected: { borderColor: '#00aaff', borderWidth: 2 },
  text: { fontSize: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  btn: { backgroundColor: '#eee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  cartContainer: {
    position: 'absolute', top: 10, right: 10, backgroundColor: 'white', padding: 8, borderRadius: 6, elevation: 5, maxHeight: SCREEN_HEIGHT * 0.5,
  },
  button: {

    marginTop: 20,
    backgroundColor: '#f5a623',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center'
  },

  carouselHandle: {
  alignSelf: 'center',
  width: 40,
  height: 10,
  borderRadius: 3,
  backgroundColor: '#aaa',
  marginBottom: 6,
},

  buttonText: {
    color: '#1b1b1b',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
