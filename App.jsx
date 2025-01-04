// import packeges
import { StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
// import store
import { store } from './src/redux/store';
// import navigator
import AppNavigator from './src/navigators/AppNavigator';
//  import styling
import Statusbar from './src/styles/Statusbar';

const App = () => {

	// const appId = "ae8020dd-afb4-49c2-9ec5-a8003e99b36a"

	return (
		<Provider store={store}>
			<View style={{ flex: 1, }}>
				<Statusbar />
				<AppNavigator />
			</View>
		</Provider>
	);
};

export default App;

const styles = StyleSheet.create({});
