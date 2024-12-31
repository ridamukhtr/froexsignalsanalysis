// import packeges
import { StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
// import assets
import loading from '../../animations/loading.json';
// import hook
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

export const Loader = ({ loop, loaderStyle }) => {
	const { bgColor } = useThemeManager();
	return (
		<View style={[styles.container, loaderStyle, { color: bgColor }]}>
			<LottieView loop={loop ? false : loop} source={loading} autoPlay style={styles.animation} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		position: 'absolute'
	},
	animation: { width: 50, height: 50 }
});
