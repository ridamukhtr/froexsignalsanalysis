// import packages
import { StyleSheet } from 'react-native';
import React from 'react';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const ForexScreen = ({ data, refreshControlProps, activeSort }) => {

	const { handlePressItem, transformAndSortData } = useInnerScreens();

	const transformedData = data?.forex ? transformAndSortData(data?.forex, activeSort) : [];

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default ForexScreen;

const styles = StyleSheet.create({});
