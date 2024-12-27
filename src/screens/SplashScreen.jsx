// import packages
import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import route
import { ROUTES } from '../routes/RouteConstants';

const SplashScreen = ({ }) => {
	const navigation = useNavigation();
	useEffect(() => {
		const timer = setTimeout(() => {
			navigation.navigate(ROUTES.drawer);
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Image source={require('../../assets/images/splashIcon.png')} style={styles.image} resizeMode="contain" />
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: '20%',
		width: '20%'
	}
});
