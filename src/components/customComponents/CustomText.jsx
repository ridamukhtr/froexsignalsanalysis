// import packages
import React from 'react';
import { StyleSheet, Text } from 'react-native';
// import Hooks
import useThemeManager from '../../lib/customHooks/useThemeManager';

const CustomText = ({ children, onPress, numberOfLines, style, ellipsizeMode }) => {
	const { textColor } = useThemeManager();
	return (
		<Text
			allowFontScaling={false}
			onPress={onPress}
			style={[styles.defaultTxt(textColor), style]}
			numberOfLines={numberOfLines}
			ellipsizeMode="tail"
		>
			{children}
		</Text>
	);
};

export default CustomText;

const styles = StyleSheet.create({
	defaultTxt: textColor => ({ fontSize: 16, lineHeight: 20, color: textColor })
});
