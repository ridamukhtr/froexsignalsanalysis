// import packages
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import navigator
import BottomNavigator from './BottomNavigator';
// redux
import { useSelector } from 'react-redux';
import { themeKeySelector } from '../redux/themeReducer';
import { navigationRef } from './NavigationServices';

const Stack = createStackNavigator();

const AppNavigator = () => {
	const themeKey = useSelector(themeKeySelector);

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator initialRouteName={ROUTES.bottombar} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ROUTES.bottombar} component={BottomNavigator} key={themeKey} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
