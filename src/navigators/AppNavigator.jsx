// import packages
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import navigator
import BottomNavigator from './BottomNavigator';
import { useSelector } from 'react-redux';
import { themeKeySelector } from '../redux/themeReducer';

const Stack = createStackNavigator();

const AppNavigator = () => {
	const themeKey = useSelector(themeKeySelector);

	useEffect(() => {
		checkUserPermission();

		const unsubscribeNotification = messaging().onMessage(async remoteMessage => {
			console.log('foreground notificatio', remoteMessage);
			// Todo: handle foreground notification
			// Alert.alert(
			//   'A new FCM message arrived!',
			//   JSON.stringify(remoteMessage),
			// );
		});

		// Linking.addEventListener('url', _handleOpenURL);

		return () => {
			unsubscribeNotification();
			// Linking.removeEventListener('url', _handleOpenURL);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const checkUserPermission = async () => {
		const enabled = await messaging().hasPermission();
		if (enabled !== -1) {
			getFcmToken();
		} else {
			requestUserPermission();
		}
	};

	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			getFcmToken();
		}
	};

	const getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			console.log('Your Firebase Token is:', fcmToken);
		} else {
			console.log('Failed', 'No token received');
		}
	};

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={ROUTES.bottombar} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ROUTES.bottombar} component={BottomNavigator} key={themeKey} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
