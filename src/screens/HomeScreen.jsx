import React, { useCallback, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import CustomSearchField from '../components/customComponents/CustomSearchField';
import HorizontalView from '../components/views/HorizontalView';
import StockScreen from './StockScreen';
import CryptoCurrencyScreen from './CryptoCurrencyScreen';
import ForexScreen from './ForexScreen';
import ComoditiesScreen from './ComoditiesScreen';
import IndicesScreen from './IndicesScreen';
import useActiveTab from '../lib/customHooks/useActiveTab';
import { useGetInnerScreenDataQuery, useGetMarketDataQuery, useLazyGetInnerScreenDataQuery } from '../redux/storeApis';
import FavouriteScreen from './FavouriteScreen';
import time_map from '../../assets/time_map';
import { SafeAreaView } from 'react-native-safe-area-context';
import useThemeManager from '../lib/customHooks/useThemeManager';

const HomeScreen = () => {
	const tabs = ['Stocks', 'Forex', 'Commodities', 'Indices', 'Crypto Currency'];

	const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');
	const [activeTime, setActiveTime] = useState('3600');

	const { data, error, isLoading } = useGetMarketDataQuery({
		type: activeScreen?.toLowerCase(),
		time: activeTime
	});

	const { bgColor } = useThemeManager();

	return (
		<SafeAreaView style={styles.safeArea(bgColor)}>
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
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	safeArea: bgColor => ({
		flex: 1,
		backgroundColor: bgColor
	})
});
