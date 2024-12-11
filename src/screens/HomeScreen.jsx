import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import HelpScreen from './HelpScreen';
import useActiveTab from '../lib/customHooks/useActiveTab';
import ViewIndicesDetails from '../components/views/ViewIndicesDetails';
import CustomModal from '../components/customComponents/CustomModal';
import ViewModalData from '../components/views/ViewModalData';


const HomeScreen = () => {

    const tabs = ["Stocks", "Forax", "Commodities", "Indices", "Crypto Currency", "Help", "ViewIndicesDetails"];
    const timeTabs = [ "5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

    const [activeBtn, setActiveBtn] = useState('Stocks');
    const [isModalVisible, setModalVisible] = useState(false);

    const { activeTab, fnActiveTab } = useActiveTab("30min")

    const fnOnpress = () => {
        console.log("Button pressed inside modal!");
        setModalVisible(true);
    };
    const fnActiveBtn = (tab) => {
         setActiveBtn(tab);
         console.log(`Active Tab: ${tab}`);
    };

    useFocusEffect(
        useCallback(() => {
            setActiveBtn('Stocks');
        }, [])
    );

    const fnPressItem = (item) => {
        console.log('Item pressed:', item);
    };

    const ChartIcon = () => {
        return (
            <CustomTouchableOpacity  >
                <Icon name={"linechart"} size={20} color={COLORS.WHITE} />
            </CustomTouchableOpacity>
        )
    }

    return (
        <CustomView right={<CustomSearchField />} >
            <HorizontalView variant="default" tabs={tabs} onTabChange={(tab) => fnActiveBtn(tab)} />
            <HorizontalView variant='button' onTabChange={(tab) => fnActiveTab(tab)} initialTab={activeTab} tabs={timeTabs} containerStyle={{paddingHorizontal:20}}  />

            {activeBtn === 'Stocks' && <StockScreen />}
            {activeBtn === 'Crypto Currency' && <CryptoCurrencyScreen />}
            {activeBtn === 'Forax' && <ForexScreen />}
            {activeBtn === 'Commodities' && <ComoditiesScreen />}
            {activeBtn === 'Indices' && <IndicesScreen />}
            {activeBtn === 'ViewIndicesDetails' && <ViewIndicesDetails  onPress={fnOnpress} />} 
           
            {activeBtn === 'Help' && <HelpScreen />}

            <CustomModal isVisible={isModalVisible} setIsVisible={setModalVisible} showBackIcon={true}>
            <View style={{ backgroundColor: COLORS.DARK_BLUE,  }}>

                    <ViewModalData title={"Moving Average Lines"} />
                 </View>
            </CustomModal>
        </CustomView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});

// import React, { useCallback, useState } from 'react';
// import { StyleSheet } from 'react-native';
// import CustomView from '../components/customComponents/CustomView';
// import HorizontalView from '../components/views/HorizontalView';
// import StockScreen from './StockScreen';
// import CryptoCurrencyScreen from './CryptoCurrencyScreen';
// import ForexScreen from './ForexScreen';
// import ComoditiesScreen from './ComoditiesScreen';
// import IndicesScreen from './IndicesScreen';
// import HelpScreen from './HelpScreen';
// import ViewIndicesRating from '../components/views/ViewIndicesRating';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import useNavigationManager from '../lib/customHooks/useNavigationManager';

// const HomeScreen = () => {

//     const navigation = useNavigation()
//     // const fnNavigateToCommodities = () => navigation.navigate(ROUTES.screenCommodities);


//     const tabs = [
//         { label: 'Stocks', action: fnNavigateToStocks },
//         { label: 'Forax', action: fnNavigateToForax },
//         { label: 'Commodities', action: fnNavigateToCommodities },
//         { label: 'Indices', action: fnNavigateToIndices },
//         { label: 'Crypto Currency', action: fnNavigateToCrypto },
//         { label: 'Help', action: fnNavigateToHelp },
//     ];
    
//     const { fnNavigateToForax,  fnNavigateToCrypto, fnNavigateToCommodities, fnNavigateToIndices, fnNavigateToHelp, fnNavigateToStocks } = useNavigationManager()

//     const fnActiveTabChange = (tab) => {
//         console.log('Clicked tab:', tab); // Debugging log

//         const selectedTab = tabs.find((t) => t.label === tab); // Find matching tab
//         if (selectedTab?.action) {
//             selectedTab.action(); // Call the associated navigation function
//         } else {
//             console.warn('Tab action not defined for:', tab); // Debugging fallback
//         }
        
//     };

//     return (
//         <CustomView>
//             {/* Horizontal Tab Navigation */}
//             <HorizontalView
//                 tabs={tabs.map((tab) => tab.label)}
//                 onTabChange={fnActiveTabChange}
//                 initialTab="Stocks"
//             />
//             {/* Dynamic Screen Rendering */}
//         </CustomView>
//     );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
