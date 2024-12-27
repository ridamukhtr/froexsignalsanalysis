// import packeges
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
// import assets
import time_map from '../../../assets/time_map';
//  import hook
import useLoadingHooks from './useLoadingHook';

const useDetailsScreen = (item) => {
    const { showLoader, hideLoader } = useLoadingHooks();

    const [error, setError] = useState(null);
    const [timeData, setTimeData] = useState([]);
    const [allSignals, setAllSignals] = useState([]);
    const [detailData, setDetailData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [advanceReportData, setAdvanceReportData] = useState(null);

    useEffect(() => {
        fetchDetailData();
        fetchAdvanceReport();
    }, [item]);

    const getUserCountry = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data = await response?.json();
            return data?.country_name || 'Unknown';
        } catch (error) {
            return 'Unknown';
        }
    };

    const fetchDetailData = async () => {
        try {
            showLoader();
            const response = await fetch(
                `https://massyart.com/ringsignal/inv/api_data?id=${item?.page_id}`
            );
            const data = await response.json();

            if (data?.all?.length > 0) {
                const userCountry = await getUserCountry();
                const processedSignals = data?.all?.map((signal) => {
                    const activeFromParsed = signal?.active_from
                        ? JSON.parse(signal?.active_from)
                        : null;
                    const rawTime = activeFromParsed?.ma?.time;

                    const formattedTime = rawTime
                        ? moment?.tz(rawTime, moment?.tz?.guess())?.format('YYYY-MM-DD hh:mm A z')
                        : 'N/A';

                    const mappedTime = time_map[signal?.time] || `${signal?.time} seconds`;

                    return {
                        ...signal,
                        activeTime: formattedTime,
                        userCountry,
                        mappedTime,
                    };
                });

                setAllSignals(processedSignals);

                const relevantData = data?.all?.find((item) => item?.page_id === item?.page_id);
                setDetailData(relevantData || null);
            }

            const timeIntervals = ['5m', '15m', '30m', '1h', '4h', '5h', '1d', '1w'];
            const timeData = timeIntervals.map((interval) => ({
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
            setError(err?.message);
        } finally {
            hideLoader();
        }
    };

    const activeFrom = updateTime => {
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

    const fetchAdvanceReport = async () => {
        showLoader();
        try {
            const response = await fetch(
                `https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${item?.msg_id}`
            );
            if (response?.ok) {
                const data = await response.json();
                const { summary, change_at } = data?.pp?.overall || {};
                setAdvanceReportData({ summary, change_at });
            } else {
                throw new Error(`API call failed with status: ${response?.status}`);
            }
        } catch (err) {
            setError(err?.message);
        } finally {
            hideLoader();
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchDetailData();
        await fetchAdvanceReport();
        setRefreshing(false);
    };

    return {
        detailData,
        advanceReportData,
        allSignals,
        timeData,
        error,
        refreshing,
        activeFromTime,
        onRefresh,
    };
};

export default useDetailsScreen;
