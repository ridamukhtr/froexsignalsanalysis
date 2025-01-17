// import packeges
import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import { LogLevel, OneSignal } from 'react-native-onesignal';
// import store
import { store } from './src/redux/store';
// import navigator
import AppNavigator from './src/navigators/AppNavigator';
//  import roots
import Statusbar from './src/styles/Statusbar';
import AppInitializer from './src/components/customComponents/AppInitializer';

const App = () => {

	// const appId = "ae8020dd-afb4-49c2-9ec5-a8003e99b36a"

	// OneSignal.Debug.setLogLevel(LogLevel.Verbose);

	// // OneSignal Initialization
	// OneSignal.initialize("ae8020dd-afb4-49c2-9ec5-a8003e99b36a");

	// // requestPermission will show the native iOS or Android notification permission prompt.
	// // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
	// OneSignal.Notifications.requestPermission(true);

	// // Method for listening for notification clicks
	// OneSignal.Notifications.addEventListener('click', (event) => {
	// 	console.log('OneSignal: notification clicked:', event);
	// });
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<Provider store={store}>
			<View style={{ flex: 1, }}>
				<AppInitializer>
					<Statusbar />
					<AppNavigator />
				</AppInitializer>
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
