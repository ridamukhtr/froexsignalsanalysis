// import packeges
import { StyleSheet } from 'react-native';
import React from 'react';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const IndicesScreen = ({ data, refreshControlProps, activeSort }) => {

	const { handlePressItem, transformAndSortData } = useInnerScreens();

	const transformedData = data?.index ? transformAndSortData(data?.index, activeSort) : [];

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />
};

export default IndicesScreen;

const styles = StyleSheet.create({});
