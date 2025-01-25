// import packeges
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
// import store
import { store } from './src/redux/store';
// import navigator
import AppNavigator from './src/navigators/AppNavigator';
//  import roots
import Statusbar from './src/styles/Statusbar';
import AppInitializer from './src/components/customComponents/AppInitializer';

messaging().setBackgroundMessageHandler(async remoteMessage => {
	// console.log('Message handled in the background!', remoteMessage);
});

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		<Provider store={store}>
			<View style={{ flex: 1 }}>
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
