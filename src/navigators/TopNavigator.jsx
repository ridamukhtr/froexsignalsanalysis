import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTES } from '../routes/RouteConstants';

const TopTabs = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen name={ROUTES.screenHome} component={HomeScreen} />
            <TopTabs.Screen name={ROUTES.screenRoadMap} component={RoadMapScreen} />
        </TopTabs.Navigator>
    );
};

export default TopTabsNavigator;


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
