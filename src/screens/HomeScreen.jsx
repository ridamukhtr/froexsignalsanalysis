// @import packages
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
// @import screens
import StockScreen from './StockScreen';
import ForexScreen from './ForexScreen';
import IndicesScreen from './IndicesScreen';
import ComoditiesScreen from './ComoditiesScreen';
import CryptoCurrencyScreen from './CryptoCurrencyScreen';
// @import components
import CustomView from '../components/customComponents/CustomView';
import HorizontalView from '../components/views/HorizontalView';
import CustomSearchField from '../components/customComponents/CustomSearchField';
// @import hooks
import useActiveTab from '../lib/customHooks/useActiveTab';
// @import store
import { useGetMarketDataQuery } from '../redux/storeApis';
// @import assets
import time_map from '../../assets/time_map';

const HomeScreen = () => {
	const tabs = ['Stocks', 'Forex', 'Commodities', 'Indices', 'Crypto Currency'];

	const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');
	const [activeTime, setActiveTime] = useState('3600');

	const { data, error, isLoading } = useGetMarketDataQuery({
		type: activeScreen?.toLowerCase(),
		time: activeTime
	});

	return (
		<CustomView right={<CustomSearchField />}>
			{/* Horizontal Tabs for Screens */}
			<HorizontalView variant="default" tabs={tabs} initialTab={activeScreen} onTabChange={tab => setActiveScreen(tab)} />

			{/* Horizontal Tabs for Time Intervals */}
			<HorizontalView
				variant="button"
				tabs={Object.values(time_map)}
				initialTab={time_map[activeTime]}
				onTabChange={selectedLabel => {
					const selectedTime = Object?.keys(time_map).find(key => time_map[key] === selectedLabel);
					setActiveTime(selectedTime);
				}}
				containerStyle={{ paddingHorizontal: 20 }}
			/>

			{activeScreen === 'Stocks' && <StockScreen data={data} />}
			{activeScreen === 'Crypto Currency' && <CryptoCurrencyScreen data={data} />}
			{activeScreen === 'Forex' && <ForexScreen data={data} />}
			{activeScreen === 'Commodities' && <ComoditiesScreen data={data} />}
			{activeScreen === 'Indices' && <IndicesScreen data={data} />}
		</CustomView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({});
