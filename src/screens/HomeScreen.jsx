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
import { Loader } from '../components/loader/Loader';
import HorizontalView from '../components/views/HorizontalView';
import CustomView from '../components/customComponents/CustomView';
import CustomSearchField from '../components/customComponents/CustomSearchField';
// @import hooks
import useActiveTab from '../lib/customHooks/useActiveTab';
// @import store
import { useGetMarketDataQuery } from '../redux/storeApis';
// @import assets
import time_map from '../../assets/time_map';

const HomeScreen = () => {
	const tabs = ['Stocks', 'Forex', 'Commodities', 'Indices', 'Crypto Currency'];

	const [activeTime, setActiveTime] = useState('3600');

	const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');

	const { data, isLoading, refetch: setIsRefreshing, isFetching } = useGetMarketDataQuery({ type: activeScreen?.toLowerCase(), time: activeTime });

	const isApiLoading = isLoading || isFetching;

	const onRefresh = () => {
		setIsRefreshing();
	};

	const refreshControlProps = {
		refreshing: isFetching,
		onRefresh: onRefresh,
		isRefreshing: isFetching
	};

	return (
		<CustomView right={<CustomSearchField />}>
			{isApiLoading ? (
				<Loader />
			) : (
				<>
					<HorizontalView variant="default" tabs={tabs} initialTab={activeScreen} onTabChange={tab => setActiveScreen(tab)} />

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

					{activeScreen === 'Stocks' && <StockScreen data={data} refreshControlProps={refreshControlProps} />}
					{activeScreen === 'Crypto Currency' && <CryptoCurrencyScreen data={data} refreshControlProps={refreshControlProps} />}
					{activeScreen === 'Forex' && <ForexScreen data={data} refreshControlProps={refreshControlProps} />}
					{activeScreen === 'Commodities' && <ComoditiesScreen data={data} refreshControlProps={refreshControlProps} />}
					{activeScreen === 'Indices' && <IndicesScreen data={data} refreshControlProps={refreshControlProps} />}
				</>
			)}
		</CustomView>
	)
};

export default HomeScreen;

const styles = StyleSheet.create({});
