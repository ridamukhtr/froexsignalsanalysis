import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomView from '../components/customComponents/CustomView'
import ViewIndicesRating from '../components/views/ViewIndicesRating'
import { useNavigation, useRoute } from '@react-navigation/native'
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
import moment from 'moment-timezone';
import globalStyles from '../styles/global-styles'

const DetailsScreen = ({ itemId }) => {
    const navigation = useNavigation();

    const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

    const route = useRoute();
    const { item } = route?.params;

    const [detailData, setDetailData] = useState(null);
    const [timeData, setTimeData] = useState([]);
    const [allSignals, setAllSignals] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDetailData();
    }, []);

    const getUserCountry = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response.json();
            return data?.country_name || 'Unknown';
        } catch (error) {
            return 'Unknown';
        }
    };

    const fetchDetailData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://massyart.com/ringsignal/inv/api_data?id=${item?.page_id}`);
            const data = await response.json();

            if (data?.all?.length > 0) {
                const userCountry = await getUserCountry();

                const processedSignals = data.all.map((signal) => {
                    const activeFromParsed = signal?.active_from ? JSON.parse(signal.active_from) : null;
                    const rawTime = activeFromParsed?.ma?.time;

                    const formattedTime = rawTime
                        ? moment.tz(rawTime, moment.tz.guess()).format('YYYY-MM-DD hh:mm A z')
                        : 'N/A';

                    const mappedTime = time_map[signal.time] || `${signal.time} seconds`;

                    return {
                        ...signal,
                        activeTime: formattedTime,
                        userCountry,
                        mappedTime,
                    };
                });

                setAllSignals(processedSignals);


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

    const activeFrom = (updateTime) => {
        if (updateTime) {
            const momentTime = moment(updateTime);
            const formattedTime = momentTime.format('hh:mm A');
            const formattedDate = momentTime.format('YYYY-MM-DD');
            const timeZone = moment.tz.guess();
            const country = moment.tz(timeZone).format('z');

            return `${formattedDate} ${formattedTime} (${country})`;
        }
        return null;
    };

    const activeFromTime = activeFrom(detailData?.update_time);


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
                update_time={activeFromTime}

            />

            <CustomScrollView>
                <View style={{ marginVertical: 15 }}>
                    <CustomText style={[globalStyles.titleText, { fontSize: 16, paddingBottom: 10 }]}>
                        {'Signal Summary'}
                    </CustomText>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 60 }}>
                        <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
                            {'Time'}
                        </CustomText>
                        <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>{item?.symbol}</CustomText>
                    </View>
                    {allSignals?.map((signal) => {
                        return (
                            <SignalSummery
                                symbol={signal?.symbol}
                                maSummary={signal?.ma_summery}
                                ago={signal?.ago}
                                ma_summery={signal?.ma_summery}
                                activeTime={signal?.activeTime}
                                time={signal?.mappedTime}
                            />
                        )
                    })}
                </View>
                <ViewModalData title={"Moving Averages Lines"} timeData={maData} />

                <ViewModalData title={"Technical Indicators"} timeData={tecData} />

                <AdvanceReport />

            </CustomScrollView>
        </CustomView>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})