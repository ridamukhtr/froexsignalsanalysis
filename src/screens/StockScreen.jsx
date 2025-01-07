// Import packages
import React from 'react';
import { StyleSheet } from 'react-native';
// Import screens
import ViewScreens from '../components/views/ViewScreens';
// Import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const StockScreen = ({ data, refreshControlProps, activeSort }) => {

	const { handlePressItem, transformAndSortData } = useInnerScreens();

	const transformedData = data?.stock ? transformAndSortData(data?.stock, activeSort) : [];

	return (
		<ViewScreens
			data={transformedData}
			onPressItem={handlePressItem}
			refreshControlProps={refreshControlProps}
		/>
	);
};

export default StockScreen;

const styles = StyleSheet.create({});
