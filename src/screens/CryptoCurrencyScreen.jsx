// import packages
import { StyleSheet } from 'react-native';
import React from 'react';
// import components
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const CryptoCurrencyScreen = ({ data, refreshControlProps, activeSort, searchQuery }) => {

	const { handlePressItem, transformAndSortData, filterData } = useInnerScreens();

	const transformedData = data?.crypto ? transformAndSortData(data?.crypto, activeSort) : [];

	const filteredData = filterData(transformedData, searchQuery);

	return <ViewScreens data={filteredData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default CryptoCurrencyScreen;

const styles = StyleSheet.create({});
