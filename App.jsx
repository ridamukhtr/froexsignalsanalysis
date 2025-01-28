// import packeges
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// import store
import { store } from './src/redux/store';
// import navigator
import AppNavigator from './src/navigators/AppNavigator';
//  import roots
import Statusbar from './src/styles/Statusbar';
import AppInitializer from './src/components/customComponents/AppInitializer';

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
		checkUserPermission();
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









	// const configurePushNotification = () => {
	// 	try {
	// 		PushNotification.createChannel(
	// 			{
	// 				channelId: 'test1',
	// 				channelName: 'Test Channel',
	// 				channelDescription: 'A channel for test notifications',
	// 				// soundName: 'default',
	// 				importance: 4,
	// 				vibration: true,
	// 			},
	// 			(created) => console.log("Channel created:", `${created}`)

	// 		);


	// 		// Initialize PushNotification
	// 		PushNotification.configure({
	// 			onNotification: function (notification) {
	// 				console.log('ON Notification:', notification);

	// 				// Handle notification tap
	// 				if (notification.userInteraction) {
	// 					const { topic, msg_id, page_id } = notification.data || {};

	// 					console.log("noti msg id1", msg_id);
	// 					console.log("noti topic", topic);



	// 					if (topic) {
	// 						NavigationService.navigate(ROUTES.screenDetails, { page_id: topic, msg_id: msg_id });
	// 						console.log('Navigating to:', ROUTES.screenDetails, { page_id: topic, msg_id: msg_id });

	// 					}
	// 				}
	// 			},
	// 			// requestPermissions: Platform.OS === 'ios',
	// 			requestPermissions: true,
	// 		});
	// 	}
	// 	catch (error) {
	// 		console.log("error", error);

	// 	}
	// }

	return (
		<Provider store={store}>
			<View style={{ flex: 1 }}>
				<AppInitializer>
					<Statusbar />
					<Toast />
					<AppNavigator />
				</AppInitializer>
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
