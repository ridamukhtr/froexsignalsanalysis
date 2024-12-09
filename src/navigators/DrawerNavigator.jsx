import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ROUTES } from '../routes/RouteConstants';
import { StyleSheet } from 'react-native';
import CryptoCurrencyScreen from '../screens/CryptoCurrencyScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import { COLORS } from '../styles/theme-styles';
import HomeScreen from '../screens/HomeScreen';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerType: 'front',
                swipeEnabled: false,
                drawerItemStyle: { ...styles.drawerItem },
                drawerActiveTintColor: COLORS.WHITE,
                drawerInactiveTintColor: COLORS.DIM,
                drawerActiveBackgroundColor: "transparent",
                // drawerInactiveBackgroundColor: COLORS.NAV_BLUE,
                drawerStyle: { width: '72%', backgroundColor:COLORS.DARK_BLUE },
            }}>
            <Drawer.Screen name={ROUTES.screenHome} component={HomeScreen} />
            <Drawer.Screen name={ROUTES.screenFavourite} component={FavouriteScreen} />
        </Drawer.Navigator>
    );
}
export default DrawerNavigator
const styles = StyleSheet.create({
    drawerItem: {
        // borderColor: COLORS.NAV_BLUE,
        // borderWidth:2,
        paddingHorizontal:0,
        // marginTop:5
    },
    drawerActiveItem: {
        borderColor: COLORS.NAV_BLUE, 
    },

})

// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { ROUTES } from '../routes/RouteConstants';
// import CryptoCurrencyScreen from '../screens/CryptoCurrencyScreen';
// import FavouriteScreen from '../screens/FavouriteScreen';
// import HomeScreen from '../screens/HomeScreen';
// import { COLORS } from '../styles/theme-styles';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/AntDesign';
// import ComoditiesScreen from '../screens/ComoditiesScreen';
// import ForexScreen from '../screens/ForexScreen';
// import IndicesScreen from '../screens/IndicesScreen';
// import StockScreen from '../screens/StockScreen';
// import ViewScreens from '../components/views/ViewScreens';


// const Drawer = createDrawerNavigator();

// Custom Drawer Content
// const CustomDrawerContent = (props) => {
//     const navigation = useNavigation();

//     const sections = [
//         {
//             title: "Tools",
//             items: [
//                 { name:ROUTES.screenHome, route: ROUTES.screenHome },
//                 { name: ROUTES.screenCommodities, route: ROUTES.screenCommodities },
//                 { name: ROUTES.screenCrypto, route: ROUTES.screenCrypto },
//                 { name: ROUTES.screenForex, route: ROUTES.screenForex },
//                 { name: ROUTES.screenIndices, route: ROUTES.screenIndices },
//                 { name: ROUTES.screenStock, route: ROUTES.screenStock },
//                 { name: ROUTES.screenFavourite, route: ROUTES.screenFavourite },
//             ],
//         },
//         {
//             title: "More",
//             items: [
//                 { name: ROUTES.screenFavourite, route: ROUTES.screenFavourite },
//                 // { name: "Send Feedback", route: ROUTES.sendFeedback },
//                 // { name: "Settings", route: ROUTES.settings },
//             ],
//         },
//     ];

//     return (
//         <View style={styles.drawerContainer}>
//             {sections.map((section, index) => (
//                 <View key={index}  >
//                     <Text style={styles.sectionTitle}>{section.title}</Text>
//                     {section.items.map((item, idx) => (
//                         <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }} >
//                             <Icon
//                                 name={item.icon}
//                                 size={18}
//                             // color={selectedTab === tab.name ? COLORS.WHITE : COLORS.DIM}
//                             />

//                             <TouchableOpacity
//                                 key={idx}
//                                 onPress={() => {
//                                     console.log("Navigating to:", item.route); // Debugging
//                                     navigation.navigate(item.route);
//                                 }}
//                             >

//                                 <Text style={styles.drawerItem}>{item.name}</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))}
//                 </View>
//             ))}
//         </View>
//     );
// };

// const DrawerNavigator = () => {
//     return (
//         <Drawer.Navigator
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//             screenOptions={{
//                 headerShown: false,
//                 drawerPosition: 'left',
//                 drawerType: 'front',
//                 drawerStyle: {
//                     width: '72%',
//                     backgroundColor: COLORS.DARK_BLUE,
//                 },
//             }}
//         >
//             <Drawer.Screen name={ROUTES.screenHome} component={ViewScreens} />
//             <Drawer.Screen name={ROUTES.screenCommodities} component={ComoditiesScreen} />
//             <Drawer.Screen name={ROUTES.screenCrypto} component={CryptoCurrencyScreen} />
//             <Drawer.Screen name={ROUTES.screenForex} component={ForexScreen} />
//             <Drawer.Screen name={ROUTES.screenIndices} component={IndicesScreen} />
//             <Drawer.Screen name={ROUTES.screenStock} component={StockScreen} />
//             <Drawer.Screen name={ROUTES.screenFavourite} component={FavouriteScreen} />

//         </Drawer.Navigator>
//     );
// };

// export default DrawerNavigator;

// const styles = StyleSheet.create({
//     drawerContainer: {
//         flex: 1,
//         backgroundColor: COLORS.DARK_BLUE,
//         padding: 15,
//     },
//     sectionTitle: {
//         color: COLORS.WHITE,
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         marginTop: 20,
//     },
//     drawerItem: {
//         color: COLORS.DIM,
//         fontSize: 16,
//         marginVertical: 10,
//     },
// });
