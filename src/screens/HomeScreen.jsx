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
import FavouriteScreen from './FavouriteScreen';

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
    const tabs = ['Stocks', 'Forex', 'Commodities', 'Indices', 'Crypto Currency', 'Favourite'];

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
            {activeScreen === 'Favourite' && <FavouriteScreen data={data} />}

        </CustomView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});

// import React, { useCallback, useState } from 'react';
// import { StyleSheet, X } from 'react-native';
// import CustomView from '../components/customComponents/CustomView';
// import CustomSearchField from '../components/customComponents/CustomSearchField';
// import Icon from 'react-native-vector-icons/AntDesign'
// import { COLORS } from '../styles/theme-styles';
// import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
// import HorizontalView from '../components/views/HorizontalView';
// import { useFocusEffect } from '@react-navigation/native';
// import StockScreen from './StockScreen';
// import CryptoCurrencyScreen from './CryptoCurrencyScreen';
// import ForexScreen from './ForexScreen';
// import ComoditiesScreen from './ComoditiesScreen';
// import IndicesScreen from './IndicesScreen';
// import useActiveTab from '../lib/customHooks/useActiveTab';
// import { useGetMarketDataQuery } from '../redux/storeApis';


// const HomeScreen = () => {

//     const tabs = ["Stocks", "Forex", "Commodities", "Indices", "Crypto Currency",];
//     const timeMap = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];
//     const timeTabs = Object.keys(timeMap);

//     const [activeBtn, setActiveBtn] = useState('3600');

//     const { activeTab,  fnActiveTab } = useActiveTab("Stocks")

//     const { data, error, isLoading } = useGetMarketDataQuery({
//         type: activeBtn.toLowerCase(), // Convert to lowercase for API
//         time: activeTab,              // Time interval
//     });

//     console.log("data", data);


//     const fnActiveBtn = (tab) => {
//         setActiveBtn(tab);
//         console.log(`Active Tab: ${tab}`);
//     };

//     useFocusEffect(
//         useCallback(() => {
//             setActiveBtn('3600');
//         }, [])
//     );

//     return (
//         <CustomView right={<CustomSearchField />} style={{ paddingBottom: 50 }} >
//             <HorizontalView variant="default" tabs={tabs} initialTab={activeTab} onTabChange={(tab) => fnActiveTab(tab)} />
//             <HorizontalView variant='button'
//                 onTabChange={(selectedLabel) => {
//                     const selectedTime = Object.keys(timeMap).find(
//                         (key) => timeMap[key] === selectedLabel
//                     );
//                     setActiveBtn(selectedTime); // Update state with the raw value
//                 }}
//                 initialTab={timeMap[activeTab]}
//                 tabs={timeTabs.map((time) => timeMap[time])} containerStyle={{ paddingHorizontal: 20 }} />

//             {activeBtn === 'Stocks' && <StockScreen data={data} />}
//             {activeBtn === 'Crypto Currency' && <CryptoCurrencyScreen />}
//             {activeBtn === 'Forex' && <ForexScreen />}
//             {activeBtn === 'Commodities' && <ComoditiesScreen />}
//             {activeBtn === 'Indices' && <IndicesScreen />}


//         </CustomView>
//     );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});

