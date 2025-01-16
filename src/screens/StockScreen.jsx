// Import packages
import React from 'react';
import { StyleSheet } from 'react-native';
// Import screens
import ViewScreens from '../components/views/ViewScreens';
// Import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const StockScreen = ({ data, refreshControlProps, activeSort, searchQuery }) => {

	const { handlePressItem, transformAndSortData, filterData } = useInnerScreens();

	const transformedData = data?.stock ? transformAndSortData(data?.stock, activeSort) : [];

	const filteredData = filterData(transformedData, searchQuery);

	return (
		<ViewScreens
			data={filteredData}
			onPressItem={handlePressItem}
			refreshControlProps={refreshControlProps}
		/>
	);
};

export default StockScreen;

const styles = StyleSheet.create({});
