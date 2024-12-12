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
import useThemeManager from '../lib/customHooks/useThemeManager';
import FavouriteScreen from '../screens/FavouriteScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StockStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Stock" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );

const BottomNavigator = () => {

    const { bgColor, textColor, currentTheme } = useThemeManager();
    return (
        <Tab.Navigator
            screenOptions={({ route, }) => ({
                tabBarIcon: () => {
                    let iconName;

                    switch (route.name) {
                        case ROUTES.bottomTabs:
                            iconName = 'bar-chart';
                            break;
                        case ROUTES.screenHelp:
                            iconName = 'work';
                            break;
                        case ROUTES.screenCommodities:
                            iconName = 'work';
                            break;
                        case ROUTES.screenFavourite:
                            iconName = 'work';
                            break;

                    }
                    const iconColor = textColor
                    const iconSize = 30

                    return <Icon name={iconName} size={iconSize} color={iconColor} />;
                },
              
                tabBarActiveTintColor: textColor,
                tabBarShowLabel: false,
                tabBarStyle: {  paddingBottom: 60, paddingTop: 10, backgroundColor: currentTheme === 'dark' ? COLORS.NAV_BLUE : 'white', position: 'absolute', borderWidth: 0, borderColor: "transparent", borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom: 0 },
            })}
        >

            <Tab.Screen name={ROUTES.bottomTabs} component={StockStack} options={{ headerShown: false }} />
            <Tab.Screen name={ROUTES.screenHelp} component={HelpScreen} options={{ headerShown: false }} />
            <Tab.Screen name={ROUTES.screenCommodities} component={ComoditiesScreen} options={{ headerShown: false }} />
            <Tab.Screen name={ROUTES.screenFavourite} component={FavouriteScreen} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
};

export default BottomNavigator;
