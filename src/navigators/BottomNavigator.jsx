// import packages
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import screens
import HomeScreen from '../screens/HomeScreen';
import ChartScreen from '../screens/ChartScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HistoryScreen from '../screens/HistoryScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
// import styling
import { COLORS } from '../styles/theme-styles';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StockStack = () => {
	const hideTabBar = () => {
		const parent = navigation.getParent();
		parent?.setOptions({
			tabBarStyle: { display: 'none' }
		});
	};

	const { bgColor, textColor, currentTheme } = useThemeManager();

	return (
		<Stack.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle:
					route.name === ROUTES.screenChart
						? { display: 'none' }
						: {
							paddingBottom: 60,
							paddingTop: 10,
							backgroundColor: currentTheme === 'dark' ? COLORS.NAV_BLUE : 'white',
							position: 'absolute',
							borderWidth: 0,
							borderColor: 'transparent',
							borderTopLeftRadius: 20,
							borderTopRightRadius: 20,
							marginBottom: 0
						}
			})}
		>
			<Stack.Screen name={ROUTES.screenStock} component={HomeScreen} options={{ headerShown: false }} />
			<Stack.Screen name={ROUTES.screenDetails} component={DetailsScreen} options={{ headerShown: false }} />
			<Stack.Screen name={ROUTES.screenChart} component={ChartScreen} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
};

const BottomNavigator = () => {
	const { bgColor, textColor, currentTheme } = useThemeManager();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: () => {
					let iconName;

					switch (route.name) {
						case ROUTES.bottomTabs:
							iconName = 'bar-chart';
							break;
						case ROUTES.screenHistory:
							iconName = 'calendar-month';
							break;
						case ROUTES.screenFavourite:
							iconName = 'favorite';
							break;
					}
					const iconColor = textColor;
					const iconSize = 30;

					return <Icon name={iconName} size={iconSize} color={iconColor} />;
				},

				tabBarActiveTintColor: textColor,
				tabBarShowLabel: false,
				tabBarStyle: {
					paddingBottom: 60,
					paddingTop: 10,
					backgroundColor: currentTheme === 'dark' ? COLORS.NAV_BLUE : 'white',
					position: 'absolute',
					borderWidth: 0,
					borderColor: 'transparent',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					marginBottom: 0
				}
			})}
		>
			<Tab.Screen name={ROUTES.bottomTabs} component={StockStack} options={{ headerShown: false }} />
			<Tab.Screen name={ROUTES.screenHistory} component={HistoryScreen} options={{ headerShown: false }} />
			<Tab.Screen name={ROUTES.screenFavourite} component={FavouriteScreen} options={{ headerShown: false }} />
		</Tab.Navigator>
	);
};

export default BottomNavigator;
