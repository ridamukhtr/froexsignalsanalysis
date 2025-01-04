// import packages
import React from 'react';
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
// import styling
import { COLORS } from '../styles/theme-styles';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import { TouchableWithoutFeedback, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StockStack = () => {
	const { bgColor, textColor, currentTheme, footerColor } = useThemeManager();

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
							tabBarStyle: {
								alignItems: 'center',
								height: 80,
								paddingTop: 11,
								backgroundColor: footerColor,
								borderWidth: 0,
								borderColor: 'transparent',
								marginBottom: 0,
							}
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
							tabBarStyle: {
								alignItems: 'center',
								height: 80,
								paddingTop: 11,
								backgroundColor: footerColor,
								borderWidth: 0,
								borderColor: 'transparent',
								marginBottom: 0,
							}
						});
					}
				})}
			/>
		</Stack.Navigator>
	);
};

const BottomNavigator = () => {
	const { footerColor, iconColor, } = useThemeManager();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					switch (route.name) {
						case ROUTES.bottomTabs:
							iconName = focused ? 'signal-cellular-3' : 'signal-cellular-outline';
							break;
						case ROUTES.screenCalender:
							iconName = focused ? 'calendar-month' : 'calendar-month-outline';
							break;
						case ROUTES.screenFavourite:
							iconName = focused ? 'star' : 'star-outline';
							break;
					}

					return focused ? (
						<TouchableWithoutFeedback onPress={() => { }}>
							<View
								style={{
									backgroundColor: iconColor,
									borderRadius: 150 / 1,
									height: 33,

									width: 55,
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Icon name={iconName} size={28} color={color} />
							</View>
						</TouchableWithoutFeedback>
					) : (
						<Icon name={iconName} size={28} color={color} />
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
						case ROUTES.screenCalender:
							labelText = 'Calendar';
							break;
						case ROUTES.screenFavourite:
							labelText = 'Favourites';
							break;
					}
					return (
						<CustomText
							style={{
								paddingTop: 3,
								fontSize: 12,
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
					alignItems: 'center',
					height: 80,
					paddingTop: 11,
					backgroundColor: footerColor,
					borderWidth: 0,
					borderColor: 'transparent',
					marginBottom: 0,
				},
			})}
		>
			<Tab.Screen
				name={ROUTES.bottomTabs}
				component={StockStack}
				options={{ headerShown: false, tabBarHideOnKeyboard: true, }}
			/>
			<Tab.Screen
				name={ROUTES.screenCalender}
				component={HistoryScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name={ROUTES.screenFavourite}
				component={FavouriteScreen}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};


export default BottomNavigator;
