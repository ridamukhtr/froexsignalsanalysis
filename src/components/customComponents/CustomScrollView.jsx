// import packages
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const CustomScrollView = ({
	children,
	scrollViewRef,
	refreshControl,
	horizontal = false,
	contentContainerStyle,
	keyboardShouldPersistTaps,
	showsHorizontalScrollIndicator = false,
	showsVerticalScrollIndicator = false,
	style
}) => {
	return (
		<ScrollView
			showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
			showsVerticalScrollIndicator={showsVerticalScrollIndicator}
			contentContainerStyle={contentContainerStyle}
			keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'always'}
			style={style}
			ref={scrollViewRef}
			horizontal={horizontal}
			refreshControl={refreshControl}
		>
			{children}
		</ScrollView>
	);
};

export default CustomScrollView;

const styles = StyleSheet.create({});
