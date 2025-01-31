// import packeges
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from "react-native-flash-message";
// import store
import { store } from './src/redux/store';
// import navigator
import AppNavigator from './src/navigators/AppNavigator';
//  import roots
import Statusbar from './src/styles/Statusbar';
import AppInitializer from './src/components/customComponents/AppInitializer';
import {
	requestUserPermission,
	getToken,
	notificationListener,
	createNotificationChannel,
} from './Firebase';

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);

	useEffect(() => {
		requestUserPermission();
		getToken();
		createNotificationChannel();
		notificationListener();
	}, []);

	return (
		<Provider store={store}>
			<View style={{ flex: 1 }}>
				<AppInitializer>
					<Statusbar />
					<AppNavigator />
					<FlashMessage position="bottom" style={{ alignSelf: "center", width: "90%", borderRadius: 5, height: 50, bottom: 20 }} />
				</AppInitializer>
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
