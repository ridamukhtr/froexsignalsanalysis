// import React, { useState } from 'react';
// import { View, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with your preferred icon library
// // import Icon from 'react-native-vector-icons/AntDesign';
// import { COLORS } from '../styles/theme-styles'; // Update with your color definitions

// const BottomNavigator = ({ navigation }) => {
//     const [selectedTab, setSelectedTab] = useState('dashboard');

//     const tabs = [
//         { name: 'dashboard', icon: 'bar-chart' },
//         { name: 'news', icon: 'heart' },
//         { name: 'calendar', icon: 'event' },
//         { name: 'favorites', icon: 'bookmark' },
//     ];

//     const onTabPress = (tab) => {
//         setSelectedTab(tab);
//         if (navigation) navigation.navigate(tab); // Optional navigation logic
//     };

//     return (
//         <View style={styles.container}>
//             {tabs.map((tab) => (
//                 <TouchableOpacity
//                     key={tab.name}
//                     onPress={() => onTabPress(tab.name)}
//                     style={styles.tab}
//                 >
//                     <Icon
//                         name={tab.icon}
//                         size={24}
//                         color={selectedTab === tab.name ? COLORS.WHITE : COLORS.DIM}
//                     />
//                     {selectedTab === tab.name && <View style={styles.indicator} />}
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         backgroundColor: COLORS.NAV_BLUE,
//         paddingVertical: 20,
//         paddingHorizontal: 10,
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     tab: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         flex: 1,
//     },
//     indicator: {
//         marginTop: 4,
//         height: 4,
//         width: 4,
//         borderRadius: 2,
//         backgroundColor: COLORS.WHITE,
//     },
// });

// export default BottomNavigator;


// import React from 'react';
// import { View, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import HomeScreen from '../screens/HomeScreen';
// import { ROUTES } from '../routes/RouteConstants';
// import ComoditiesScreen from '../screens/ComoditiesScreen';
// import CryptoCurrencyScreen from '../screens/CryptoCurrencyScreen';
// import ForexScreen from '../screens/ForexScreen';
// import IndicesScreen from '../screens/IndicesScreen';
// import StockScreen from '../screens/StockScreen';

// // Create Bottom Tab Navigator
// const Tab = createBottomTabNavigator();

// export default function App() {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     tabBarIcon: ({ focused, color, size }) => {
//                         let iconName;

//                         if (route.name === 'Home') {
//                             iconName = focused ? 'home' : 'home-outlined';
//                         } else if (route.name === 'Profile') {
//                             iconName = focused ? 'person' : 'person-outline';
//                         } else if (route.name === 'Settings') {
//                             iconName = focused ? 'settings' : 'settings-outline';
//                         }

//                         return <Icon name={iconName} size={size} color={color} />;
//                     },
//                     tabBarActiveTintColor: 'blue',
//                     tabBarInactiveTintColor: 'gray',
//                     tabBarStyle: { backgroundColor: '#f9f9f9', paddingBottom: 5 },
//                 })}
//             >
//                 <Tab.Screen name={ROUTES.screenHome} component={HomeScreen} />
//                 <Tab.Screen name={ROUTES.screenCommodities} component={ComoditiesScreen} />
//                 <Tab.Screen name={ROUTES.screenCrypto} component={CryptoCurrencyScreen} />
//                 <Tab.Screen name={ROUTES.screenForex} component={ForexScreen} />
//                 <Tab.Screen name={ROUTES.screenIndices} component={IndicesScreen} />
//                 <Tab.Screen name={ROUTES.screenStock} component={StockScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }


// src/navigation/BottomNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/HomeScreen';
import ComoditiesScreen from '../screens/ComoditiesScreen';
import CryptoCurrencyScreen from '../screens/CryptoCurrencyScreen';
import ForexScreen from '../screens/ForexScreen';
import IndicesScreen from '../screens/IndicesScreen';
import StockScreen from '../screens/StockScreen';
import { ROUTES } from '../routes/RouteConstants';
import DrawerNavigator from './DrawerNavigator';
import { COLORS } from '../styles/theme-styles';
import HelpScreen from '../screens/HelpScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case ROUTES.screenHome:
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case ROUTES.screenCommodities:
                            iconName = focused ? 'work' : 'work-outline';
                            break;
                        case ROUTES.screenCrypto:
                            iconName = focused ? 'currency-bitcoin' : 'currency-bitcoin-outline';
                            break;
                        case ROUTES.screenForex:
                            iconName = focused ? 'attach-money' : 'money-off';
                            break;
                        case ROUTES.screenIndices:
                            iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                            break;
                        case ROUTES.screenStock:
                            iconName = focused ? 'business' : 'business-outline';
                            break;
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { backgroundColor: COLORS.NAV_BLUE,height:70, borderWidth:0, borderColor:"transparent", paddingBottom: 5, borderTopLeftRadius: 10,borderTopRightRadius:10 },
            })}
        >
            <Tab.Screen name={ROUTES.screenHome} component={HomeScreen} options={{ headerShown: false }}  />
            <Tab.Screen name={ROUTES.screenHelp} component={HelpScreen} options={{ headerShown: false }}  />

        </Tab.Navigator>
    );
};

export default BottomNavigator;
