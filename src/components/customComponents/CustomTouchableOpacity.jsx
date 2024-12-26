// import packages
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const CustomTouchableOpacity = ({ children, style, onPress, activeOpacity }) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={activeOpacity ?? 0.7} style={style}>
			{children}
		</TouchableOpacity>
	);
};

export default CustomTouchableOpacity;

const styles = StyleSheet.create({});
