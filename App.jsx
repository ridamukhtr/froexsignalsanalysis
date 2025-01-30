// import packeges
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
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
					<Toast />
					<AppNavigator />
				</AppInitializer>
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
