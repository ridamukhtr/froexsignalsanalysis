import React, { useCallback, useState } from 'react';
import { StyleSheet, X } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import CustomSearchField from '../components/customComponents/CustomSearchField';
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../styles/theme-styles';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
import HorizontalView from '../components/views/HorizontalView';
import { useFocusEffect } from '@react-navigation/native';
import StockScreen from './StockScreen';
import CryptoCurrencyScreen from './CryptoCurrencyScreen';
import ForexScreen from './ForexScreen';
import ComoditiesScreen from './ComoditiesScreen';
import IndicesScreen from './IndicesScreen';
import useActiveTab from '../lib/customHooks/useActiveTab';


const HomeScreen = () => {

    const tabs = ["Stocks", "Forax", "Commodities", "Indices", "Crypto Currency", ];
    const timeTabs = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

    const [activeBtn, setActiveBtn] = useState('Stocks');

    const { activeTab, fnActiveTab } = useActiveTab("30min")

    const fnActiveBtn = (tab) => {
        setActiveBtn(tab);
        console.log(`Active Tab: ${tab}`);
    };

    useFocusEffect(
        useCallback(() => {
            setActiveBtn('Stocks');
        }, [])
    );

    const ChartIcon = () => {
        return (
            <CustomTouchableOpacity  >
                <Icon name={"linechart"} size={20} color={COLORS.WHITE} />
            </CustomTouchableOpacity>
        )
    }

    return (
        <CustomView right={<CustomSearchField />} style={{ paddingBottom: 50 }} >
            <HorizontalView variant="default" tabs={tabs} onTabChange={(tab) => fnActiveBtn(tab)} />
            <HorizontalView variant='button' onTabChange={(tab) => fnActiveTab(tab)} initialTab={activeTab} tabs={timeTabs} containerStyle={{ paddingHorizontal: 20 }} />

            {activeBtn === 'Stocks' && <StockScreen />}
            {activeBtn === 'Crypto Currency' && <CryptoCurrencyScreen />}
            {activeBtn === 'Forax' && <ForexScreen />}
            {activeBtn === 'Commodities' && <ComoditiesScreen />}
            {activeBtn === 'Indices' && <IndicesScreen />}


        </CustomView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
