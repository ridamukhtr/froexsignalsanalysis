// import packages
import { StyleSheet } from 'react-native';
import React from 'react';
// import routes
import { ROUTES } from '../routes/RouteConstants';
// import components
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const CryptoCurrencyScreen = ({ data, refreshControlProps, activeSort }) => {

	const { handlePressItem, transformAndSortData } = useInnerScreens();

	const transformedData = data?.crypto ? transformAndSortData(data?.crypto, activeSort) : [];

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default CryptoCurrencyScreen;

const styles = StyleSheet.create({});
