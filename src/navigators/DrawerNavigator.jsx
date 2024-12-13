// import React from 'react';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import { View, StyleSheet } from 'react-native';
// import { Share } from 'react-native';
// import FavouriteScreen from '../screens/FavouriteScreen';
// import BottomNavigator from './BottomNavigator';
// import { ROUTES } from '../routes/RouteConstants';
// import useThemeManager from '../lib/customHooks/useThemeManager';
// import { COLORS } from '../styles/theme-styles';
// import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
// import Theme from 'react-native-vector-icons/MaterialIcons';
// import CustomText from '../components/customComponents/CustomText';
// import CustomDropdown from '../components/customComponents/CustomDropdown';

// const Drawer = createDrawerNavigator();

// // Custom Drawer Content
// function CustomDrawerContent(props) {

//     const { bgColor, textColor, currentTheme } = useThemeManager();

//     const fnShare = () => {
//         Share.share({
//             message: 'Your share message here',
//         });
//     };

//     const items = [
//         { label: 'Dark', },
//         { label: 'Light', },
//     ];


//     const fnThemeChange = (selectedTheme) => {
//         if (currentTheme !== selectedTheme.toLowerCase()) {
//             fnToggleTheme();
//         }
//     };

//     return (
//         <DrawerContentScrollView {...props}>
//             <View style={{ backgroundColor: bgColor, paddingTop: 20, }}>
//                 {/* Theme Toggle or Other Custom Content */}
//                 <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", gap: 15, paddingHorizontal: 20, paddingTop: 20 }} >


//                     <CustomText>Themes</CustomText>
//                     <CustomTouchableOpacity>
//                         <CustomDropdown item={items} activeTheme={currentTheme === 'dark' ? 'Dark' : 'Light'} onPress={fnThemeChange} />
//                     </CustomTouchableOpacity>
//                 </View>
//                 <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", gap: 15, paddingHorizontal: 20, paddingTop: 20 }} >


//                     <CustomText>Share</CustomText>
//                     <CustomTouchableOpacity onPress={fnShare}>
//                         <Theme name="share" size={30} color={textColor} />
//                     </CustomTouchableOpacity>
//                 </View>


//                 {/* Default Drawer Items */}
//                 <DrawerItemList {...props} />
//             </View>
//         </DrawerContentScrollView>
//     );
// }

// // Drawer Navigator
// export default function DrawerNavigator() {
//     const { textColor, bgColor, currentTheme } = useThemeManager()

//     return (
//         <Drawer.Navigator
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//             screenOptions={{
//                 headerShown: false,
//                 drawerPosition: 'left',
//                 drawerType: 'front',
//                 swipeEnabled: false,
//                 drawerItemStyle: { margin: 0, padding: 0 },
//                 drawerActiveTintColor: textColor,
//                 drawerInactiveTintColor: COLORS.DIM,
//                 drawerActiveBackgroundColor: "transparent",
//                 // drawerInactiveBackgroundColor: COLORS.NAV_BLUE,
//                 drawerStyle: { width: '72%', backgroundColor: bgColor },
//             }}>

//             <Drawer.Screen
//                 name={ROUTES.screenHome}
//                 component={BottomNavigator}
//                 options={{
//                     drawerLabel: 'Home',
//                     title: 'Home'
//                 }}
//             />
//             <Drawer.Screen
//                 name={ROUTES.screenFavourite}
//                 component={FavouriteScreen}
//                 options={{
//                     drawerLabel: 'Favourites',
//                     title: 'Favourites'
//                 }}
//             />
//         </Drawer.Navigator>
//     );
// }

// const styles = StyleSheet.create({
//     drawerItem: {
//         // flexDirection: 'row',
//         alignItems: 'center',
//         padding: 20,
//     },
//     themeContainer: {
//         // paddingVertical: 20,
//         // paddingHorizontal: 15,
//     },
// });


import React from 'react';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import { View, StyleSheet } from 'react-native';
import { Share } from 'react-native';
import BottomNavigator from './BottomNavigator';
import { ROUTES } from '../routes/RouteConstants';
import useThemeManager from '../lib/customHooks/useThemeManager';
import { COLORS } from '../styles/theme-styles';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
import Theme from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../components/customComponents/CustomText';
import CustomDropdown from '../components/customComponents/CustomDropdown';
import globalStyles from '../styles/global-styles';
import HelpScreen from '../screens/HelpScreen';
import FavouriteScreen from '../screens/FavouriteScreen';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
    const { bgColor, textColor, currentTheme, fnToggleTheme } = useThemeManager();

    const fnShare = () => {
        Share.share({
            message: 'Your share message here',
        });
    };

    const items = [
        { label: 'Dark' },
        { label: 'Light' },
    ];

    const fnThemeChange = (selectedTheme) => {
        if (currentTheme !== selectedTheme.toLowerCase()) {
            fnToggleTheme();
        }
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: bgColor, flex: 1 }}>
                {/* Default Drawer Items (Screens) */}
                <DrawerItem
                    label="Home"
                    onPress={() => props.navigation.navigate(ROUTES.screenHome)}
                    labelStyle={{ color: textColor }}
                />
                <DrawerItem
                    label="Favourites"
                    onPress={() => props.navigation.navigate(ROUTES.screenFavourite)}
                    labelStyle={{ color: textColor }}
                />

                {/* Custom Content Section */}
                <View style={styles.customSection}>
                    {/* Theme Toggle */}
                    <CustomText style={{fontWeight:"bold", fontSize:18}}>More</CustomText>
                    <View style={[globalStyles.container, {}]}>
                        <CustomText style={{ color: textColor }}>Themes</CustomText>
                        <CustomTouchableOpacity>
                            <CustomDropdown
                                item={items}
                                activeTheme={currentTheme === 'dark' ? 'Dark' : 'Light'}
                                onPress={fnThemeChange}
                            />
                        </CustomTouchableOpacity>
                    </View>

                    {/* Share Button */}
                    <View style={[globalStyles.container, {}]}>
                        <CustomText style={{ color: textColor }}>Share</CustomText>
                        <CustomTouchableOpacity onPress={fnShare}>
                            <Theme name="share" size={25} color={textColor} />
                        </CustomTouchableOpacity>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

// Drawer Navigator
export default function DrawerNavigator() {
    const { textColor, bgColor } = useThemeManager();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerPosition: 'left',
                drawerType: 'front',
                swipeEnabled: true,
                drawerItemStyle: { margin: 0, padding: 0 },
                drawerActiveTintColor: textColor,
                drawerInactiveTintColor: COLORS.DIM,
                drawerStyle: { width: '72%', backgroundColor: bgColor },
            }}
        >
            {/* The Drawer Screens */}
            <Drawer.Screen
                name={ROUTES.screenHome}
                component={BottomNavigator}
                options={{
                    drawerLabel: () => null,
                    title: 'Home',
                }}
            />
            <Drawer.Screen
                name={ROUTES.screenFavourite}
                component={FavouriteScreen}
                options={{
                    drawerLabel: () => null, 
                    title: 'Favourite',
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    customSection: {
        paddingVertical: 20,
        gap:25,
        paddingLeft: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
});
