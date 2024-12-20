import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomView from '../components/customComponents/CustomView'
import ViewIndicesDetails from '../components/views/ViewIndicesDetails'
import ViewIndicesRating from '../components/views/ViewIndicesRating'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomModal from '../components/customComponents/CustomModal'
import ViewModalData from '../components/views/ViewModalData'
import { COLORS } from '../styles/theme-styles'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
import { ROUTES } from '../routes/RouteConstants'
import CustomScrollView from '../components/customComponents/CustomScrollView'
import SignalSummery from '../components/views/SignalSummery'
import time_map from '../../assets/time_map'
import CustomText from '../components/customComponents/CustomText'
import AdvanceReport from '../components/views/AdvanceReport'

const DetailsScreen = ({ itemId }) => {
    const navigation = useNavigation();

    const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

    const route = useRoute();
    const { item } = route?.params;

    const [detailData, setDetailData] = useState(null);
    const [timeData, setTimeData] = useState([]);
    const [apiData, setApiData] = useState(null); // New state to hold the fetched API data
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDetailData();
        fetchApiData();
    }, []);

    const fetchDetailData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://massyart.com/ringsignal/inv/api_data?id=${item?.page_id}`);

            const data = await response?.json();

            if (data?.all?.length > 0) {
                const relevantData = data?.all?.find(item => item?.page_id === item?.page_id);
                if (relevantData) {
                    setDetailData(relevantData);
                }
                else {
                    console.log('No matching item found');
                    setError('No matching item found');
                }
            }

            const timeIntervals = ['5m', '15m', '30m', '1h', '4h', '5h', '1d', '1w'];

            const timeData = timeIntervals?.map(interval => ({
                time: interval,
                maBuy: data?.average?.ma?.buy?.[interval] || 0,
                maSell: data?.average?.ma?.sell?.[interval] || 0,
                maSignal: data?.average?.ma?.signal?.[interval] || 0,
                tecBuy: data?.average?.tec?.buy?.[interval] || 0,
                tecSell: data?.average?.tec?.sell?.[interval] || 0,
                tecSignal: data?.average?.tec?.signal?.[interval] || 0,
            }));

            setTimeData(timeData);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err?.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchApiData = async () => {
        try {
            const response = await fetch(`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=1`);
            const data = await response?.json();
            const { summary, change_at } = data?.pp?.overall || {}; // Extract summary and change_at
            setApiData({ summary, change_at }); // Store it in state
        } catch (err) {
            console.error('Error fetching API data:', err);
            setError(err?.message);
        }
    };

console.log("api", apiData);

    const parseActiveFromTime = (activeFrom) => {
        console.log("active", activeFrom);
        
        try {
            const parsedData = JSON?.parse(activeFrom);
            return parsedData?.ma?.time || null;
        } catch (error) {
            console.error('Error parsing active_from:', error);
            return null;
        }
    };

    const activeFromTime = parseActiveFromTime(detailData?.active_from);

    const handlePressItem = () => {
        fnNavigateToDetails();
        console.log('Item pressed:',);
    };

    const ChartIcon = () => {
        return (
            <CustomTouchableOpacity onPress={handlePressItem} >
                <Icon name={"linechart"} size={20} color={COLORS.WHITE} />
            </CustomTouchableOpacity>
        )
    }

    const maData = timeData?.map(item => ({
        time: item?.time,
        maBuy: item?.maBuy ?? 0,
        maSell: item?.maSell ?? 0,
        maSignal: item?.maSignal ?? 0,
    })) || [];

    const tecData = timeData?.map(item => ({
        time: item?.time,
        tecBuy: item?.tecBuy ?? 0,
        tecSell: item?.tecSell ?? 0,
        tecSignal: item?.tecSignal ?? 0,
    })) || [];


    return (
        <CustomView showBackIcon title={item?.symbol} right={<ChartIcon />} >

            <ViewIndicesRating price={item?.price}
                summaryChange={item?.summaryChange}
                summaryChangeP={item?.summaryChangeP}
                ma_summery={item?.ma_summery}
                ago={detailData?.ago}
                active_from={activeFromTime}
            />

            <CustomScrollView>
                <SignalSummery
                    symbol={item?.symbol}
                    maSummary={item?.ma_summery}
                    ago={detailData?.ago}
                    ma_summery={item?.ma_summery}
                    updateTime={detailData?.update_time}
                />

                <ViewModalData title={"Moving Averages Lines"} timeData={maData} />

                <ViewModalData title={"Technical Indicators"} timeData={tecData} />

                <AdvanceReport />

            </CustomScrollView>
        </CustomView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})