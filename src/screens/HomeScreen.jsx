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
import { useGetMarketDataQuery } from '../redux/storeApis';

const timeMap = {
    300: '5min',
    900: '15min',
    1800: '30min',
    3600: '1Hour',
    14400: '4Hours',
    18000: '5Hours',
    86400: '1Day',
    604800: '1Week',
};

const HomeScreen = () => {
    const tabs = ['Stocks', 'Forex', 'Commodities', 'Indices', 'Crypto Currency'];

    const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');
    const [activeTime, setActiveTime] = useState('3600');

    const { data, error, isLoading } = useGetMarketDataQuery({
        type: activeScreen.toLowerCase(),
        time: activeTime,
    });

    return (
        <CustomView right={<CustomSearchField />} style={{ paddingBottom: 50 }}>
            {/* Horizontal Tabs for Screens */}
            <HorizontalView
                variant="default"
                tabs={tabs}
                initialTab={activeScreen}
                onTabChange={(tab) => setActiveScreen(tab)}
            />

            {/* Horizontal Tabs for Time Intervals */}
            <HorizontalView
                variant="button"
                tabs={Object.values(timeMap)}
                initialTab={timeMap[activeTime]}
                onTabChange={(selectedLabel) => {
                    const selectedTime = Object.keys(timeMap).find(
                        (key) => timeMap[key] === selectedLabel
                    );
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
