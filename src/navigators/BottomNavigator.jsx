// import packages
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import screens
import HomeScreen from '../screens/HomeScreen';
import ChartScreen from '../screens/ChartScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CustomText from '../components/customComponents/CustomText';
import MoreScreen from '../screens/MoreScreen';
import HelpScreen from '../screens/HelpScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
// import styling
import { COLORS } from '../styles/theme-styles';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const getTabBarStyle = (footerColor) => ({
	alignItems: 'center',
	justifyContent: 'center',
	height: 55,
	backgroundColor: footerColor,
	borderWidth: 0,
	borderColor: 'transparent',
	marginBottom: 0,
});

const StockStack = () => {
	const { footerColor } = useThemeManager();
	const navigation = useNavigation();

	// Update parent tab bar style when theme changes
	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: getTabBarStyle(footerColor)
		});
	}, [footerColor, navigation]);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.screenStock}
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={ROUTES.screenDetails}
				component={DetailsScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>
			<Stack.Screen
				name={ROUTES.screenChart}
				component={ChartScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>
		</Stack.Navigator>
	);
};

const FavouriteStack = () => {
	const { footerColor } = useThemeManager();
	const navigation = useNavigation();

	// Update parent tab bar style when theme changes
	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: getTabBarStyle(footerColor)
		});
	}, [footerColor, navigation]);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.favStack}
				component={FavouriteScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={ROUTES.screenDetails}
				component={DetailsScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>
			<Stack.Screen
				name={ROUTES.screenChart}
				component={ChartScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>
		</Stack.Navigator>
	);
};
const MoreStack = () => {
	const { footerColor } = useThemeManager();
	const navigation = useNavigation();

	// Update parent tab bar style when theme changes
	useEffect(() => {
		navigation.getParent()?.setOptions({
			tabBarStyle: getTabBarStyle(footerColor)
		});
	}, [footerColor, navigation]);

	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.screenMore}
				component={MoreScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name={ROUTES.screenHelp}
				component={HelpScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>
			<Stack.Screen
				name={ROUTES.screenPrivacy}
				component={PrivacyPolicyScreen}
				options={{
					headerShown: false,
					tabBarStyle: { display: 'none' }
				}}
				listeners={({ navigation }) => ({
					focus: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: { display: 'none' }
						});
					},
					beforeRemove: () => {
						navigation.getParent()?.setOptions({
							tabBarStyle: getTabBarStyle(footerColor)
						});
					}
				})}
			/>

		</Stack.Navigator>
	);
};

const BottomNavigator = () => {
	const navigation = useNavigation();
	const { footerColor, iconColor, currentTheme } = useThemeManager();

	useEffect(() => {
		const tabBarStyle = getTabBarStyle(footerColor);
		navigation.setOptions({ tabBarStyle });
	}, [footerColor, currentTheme, navigation]);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					switch (route.name) {
						case ROUTES.bottomTabs:
							iconName = 'signal-cellular-outline';
							break;
						// case ROUTES.screenCalender:
						// 	iconName = 'calendar-month-outline';
						// 	break;
						case ROUTES.screenFavourite:
							iconName = 'star-outline';
							break;
						case ROUTES.moreStack:
							iconName = 'cog-outline';
							break;
					}

					return focused ? (
						<Icon name={iconName} size={23} color={color} />
					) : (
						<Icon name={iconName} size={23} color={color} />
					);
				},
				tabBarActiveTintColor: COLORS.YELLOW,
				tabBarInactiveTintColor: iconColor,
				tabBarShowLabel: true,
				tabBarLabel: ({ focused, color }) => {
					let labelText = '';
					switch (route.name) {
						case ROUTES.bottomTabs:
							labelText = 'Markets';
							break;
						case ROUTES.screenFavourite:
							labelText = 'Favourites';
							break;
						// case ROUTES.screenCalender:
						// 	labelText = 'Calendar';
						// 	break;
						case ROUTES.moreStack:
							labelText = 'Setting';
							break;
					}
					return (
						<CustomText
							style={{
								bottom: 3,
								lineHeight: 15,
								fontSize: 10,
								fontWeight: '600',
								color: focused ? COLORS.YELLOW : iconColor,
								textAlign: 'center',
							}}
						>
							{labelText}
						</CustomText>
					);
				},
				tabBarStyle: {
					...getTabBarStyle(footerColor),
					elevation: 0, // Remove shadow on Android
					borderTopWidth: 0, // Remove border on iOS
				},
				tabBarItemStyle: {
					activeOpacity: 1,
					android_ripple: { enabled: false }, // Disable ripple on Android
				},
				tabBarButton: (props) => (
					<TouchableOpacity
						{...props}
						activeOpacity={1} // Prevent opacity effect on iOS
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
					/>
				),
			})}
		>
			<Tab.Screen
				name={ROUTES.bottomTabs}
				component={StockStack}
				options={{ headerShown: false, tabBarHideOnKeyboard: true }}
			/>

			<Tab.Screen
				name={ROUTES.screenFavourite}
				component={FavouriteStack}
				options={{ headerShown: false }}
			/>
			{/* 
			<Tab.Screen
				name={ROUTES.screenCalender}
				component={HistoryScreen}
				options={{ headerShown: false, }}
			/> */}

			<Tab.Screen
				name={ROUTES.moreStack}
				component={MoreStack}
				options={{ headerShown: false, tabBarHideOnKeyboard: true }}
			/>
		</Tab.Navigator>
	);
};

export default BottomNavigator;