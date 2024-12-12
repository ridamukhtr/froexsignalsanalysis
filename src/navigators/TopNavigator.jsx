import React, { useEffect, useState } from 'react';
import { Image, Platform, Dimensions, View } from 'react-native';
import AccountScreen from '../screens/account';
import CartScreen from '../screens/cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesStack from './CategoriesStack';
import HomeStack from './HomeStackNavigation';
import CartBadge from '../components/Cart/CartBadge.tsx';
import StationaryScreen from '../screens/Stationary/StationaryScreen';
import PromotionsStack from './PromtionsStack';

const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();
import storage from '@react-native-firebase/storage';
import FastImage from 'react-native-fast-image';
import AccountStack from './AcountStack';
import { i18n } from '../../languages/i18n';
import { DICTIONARY } from '../../languages/LanguageConstants';
import useGetSelectedLanguage from '../Lib/CustomHooks/useGetSelectedLanguage';
import { AppImages } from '../../src/global/utilities/index.js';
import { ROUTES_BAHRAIN } from './RouteConstants';

export const BahrainHomeNavigator = () => {
  const [activePromoUrl, setActivePromoUrl] = useState(
    'https://drive.google.com/file/d/17qpihioliEOlv98Y14cYxgi5if-98lav/view?usp=sharing',
  );
  const [inactivePromoUrl, setInactivePromoUrl] = useState(
    'https://firebasestorage.googleapis.com/v0/b/ah-market-cbe5b.appspot.com/o/images%2Finactive_promo.png?alt=media&token=0bcad327-166c-435e-9c23-8bf77113ab7b',
  );
  const { isEnglish } = useGetSelectedLanguage();

  useEffect(() => {
    async function fetchImageUrls() {
      try {
        const activePromoReference = storage().ref('images/active_promo.png');
        const inactivePromoReference = storage().ref(
          'images/inactive_promo.png',
        );

        // Fetch both URLs concurrently
        const [activePromoDownloadUrl, inactivePromoDownloadUrl] =
          await Promise.all([
            activePromoReference.getDownloadURL(),
            inactivePromoReference.getDownloadURL(),
          ]);

        setActivePromoUrl(activePromoDownloadUrl);
        setInactivePromoUrl(inactivePromoDownloadUrl);
      } catch (error) {}
    }
    fetchImageUrls();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={() => ({
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 88 : 70,
          width: width,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: Platform.OS === 'ios' ? 5 : 0,
          paddingBottom: Platform.OS === 'ios' ? 0 : 10,
        },
        popGesture: false,
      })}
      options={() => ({
        title: 'AH app',
        interactivePopGestureEnabled: true,
        popGesture: false,
      })}
      backBehavior={'history'}
      tabBarShowLabel={false}
      shifting={false}
      barStyle={{
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#e4e4e4',
        elevation: 10,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: i18n.t(DICTIONARY.home),
          tabBarActiveBackgroundColor: '#fff',
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? AppImages.ic_home : AppImages.Inactive}
              style={{
                width: 26,
                height: 26,
                marginTop: 10,
              }}
            />
          ),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9F9696',
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoriesStack}
        options={{
          tabBarLabel: i18n.t(DICTIONARY.categories),
          tabBarLabelStyle: {
            right: 10,
            fontSize: 11,
            paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? AppImages.active_cat1 : AppImages.inactive_cat1}
              style={{
                width: Platform.OS === 'android' ? 25 : 30,
                height: Platform.OS === 'android' ? 20 : 22,
                marginTop: 10,
                marginRight: 25,
              }}
            />
          ),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9F9696',
        }}
      />
      <Tab.Screen
        name="Promotions"
        component={PromotionsStack}
        // component={StationaryScreen}
        options={{
          tabBarLabel: i18n.t(DICTIONARY.promotions),
          tabBarLabelStyle: {
            marginLeft: 4,
            fontSize: 11,
            paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <FastImage
              style={{ width: 34, height: 34 }}
              source={{
                uri: focused ? activePromoUrl : inactivePromoUrl,
                // headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9F9696',
        }}
      />
      <Tab.Screen
        name={ROUTES_BAHRAIN.tabBahrainAccountStack}
        component={AccountStack}
        options={{
          tabBarLabel: i18n.t(DICTIONARY.account),
          tabBarLabelStyle: {
            marginLeft: isEnglish ? 22 : 0,
            fontSize: 11,
            paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          },
          popGesture: false,
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={focused ? AppImages.active_account : AppImages.account}
              style={{
                width: 23,
                height: 25,
                marginTop: 10,
                marginLeft: isEnglish ? 22 : 0,
              }}
            />
          ),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9F9696',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: i18n.t(DICTIONARY.cart),
          tabBarLabelStyle: {
            marginRight: 10,
            fontSize: 11,
            paddingBottom: Platform.OS === 'ios' ? 0 : 10,
          },
          tabBarIcon: ({ color, focused }) => (
            <>
              {focused ? (
                <CartBadge focus={focused} color={'#000'} />
              ) : (
                <CartBadge focus={focused} color={'#000'} />
              )}
            </>
          ),
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#9F9696',
        }}
      />
    </Tab.Navigator>
  );
};




// import React from 'react';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { ROUTES } from '../routes/RouteConstants';

// const TopTabs = createMaterialTopTabNavigator();

// const TopTabsNavigator = () => {
//     return (
//         <TopTabs.Navigator>
//             <TopTabs.Screen name={ROUTES.screenHome} component={HomeScreen} />
//             <TopTabs.Screen name={ROUTES.screenRoadMap} component={RoadMapScreen} />
//         </TopTabs.Navigator>
//     );
// };

// export default TopTabsNavigator;


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import StockScreen from '../screens/StockScreen';
// import ForexScreen from '../screens/ForexScreen';
// import ComoditiesScreen from '../screens/ComoditiesScreen';
// import IndicesScreen from '../screens/IndicesScreen';
// import CryptoCurrencyScreen from '../screens/CryptoCurrencyScreen';

// const Tab = createBottomTabNavigator();

// const TopNavigator = () => {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName;
//                         if (route.name === 'Stocks') {
//                             iconName = 'show-chart';
//                         } else if (route.name === 'Forex') {
//                             iconName = 'attach-money';
//                         } else if (route.name === 'Commodities') {
//                             iconName = 'inventory';
//                         } else if (route.name === 'Indices') {
//                             iconName = 'bar-chart';
//                         } else if (route.name === 'CryptoCurrency') {
//                             iconName = 'currency-bitcoin';
//                         }
//                         return <Icon name={iconName} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: 'tomato',
//                     tabBarInactiveTintColor: 'gray',
//                 })}
//             >
//                 <Tab.Screen name="Stocks" component={StockScreen} />
//                 <Tab.Screen name="Forex" component={ForexScreen} />
//                 <Tab.Screen name="Commodities" component={ComoditiesScreen} />
//                 <Tab.Screen name="Indices" component={IndicesScreen} />
//                 <Tab.Screen name="CryptoCurrency" component={CryptoCurrencyScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// };

// export default TopNavigator;
