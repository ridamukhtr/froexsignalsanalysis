// import packages
import { StyleSheet } from 'react-native';
import React from 'react';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const ForexScreen = ({ data, refreshControlProps, activeSort, sortOrder, searchQuery }) => {

	const { handlePressItem, transformAndSortData, filterData } = useInnerScreens();

	const transformedData = data?.forex ? transformAndSortData(data?.forex, activeSort, sortOrder) : [];

	const filteredData = filterData(transformedData, searchQuery);

	return <ViewScreens data={filteredData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default ForexScreen;

const styles = StyleSheet.create({});
