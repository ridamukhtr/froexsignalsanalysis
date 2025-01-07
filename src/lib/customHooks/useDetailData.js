// import packeges
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
// import assets
import time_map from '../../../assets/time_map';
//  import hook
import useLoadingHooks from './useLoadingHook';

const useDetailsScreen = (item, selectedTime) => {
    const { msg_id, type, page_id } = item || {};
    const { showLoader, hideLoader } = useLoadingHooks();

    const [error, setError] = useState(null);
    const [timeData, setTimeData] = useState([]);
    const [allSignals, setAllSignals] = useState([]);
    const [detailData, setDetailData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [advanceReportData, setAdvanceReportData] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);

    useEffect(() => {
        fetchDetailData();
    }, [page_id]);

    useEffect(() => {
        if (msg_id && selectedTime) {
            fetchAdvanceReport(selectedTime);
        }
    }, [msg_id, selectedTime]);

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

            const timeIntervals = ['300', '900', '1800', '3600', '14400', '18000', '86400', '604800'];

            const timeData = timeIntervals?.map((interval) => ({
                time: time_map[interval] || interval,
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

    const fetchAdvanceReport = async (period) => {
        if (!msg_id || !type) {
            console.error('Missing msg_id or type for fetchAdvanceReport:', { msg_id, type });
            return;
        }

        try {
            showLoader();
            setIsSummaryLoading(true);

            const response = await fetch(
                `https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${msg_id}&period=${period}&type=${type}`
            );
            const data = await response.json();

            if (data?.pp) {
                const { pivot_point, overall } = data?.pp;
                const info = data.info;
                const indicators = data?.indicator?.indicators
                    ? Object?.entries(data?.indicator?.indicators)
                        .slice(0, -1)
                        .map(([key, value]) => ({
                            name: key,
                            value: value?.v || null,
                            action: value?.s || null,
                        }))
                    : [];

                setAdvanceReportData({ pivot_point, summary: overall?.summary, indicators, info });
            } else {
                console.log('No data found in the response');
            }
        } catch (err) {
            console.error('Error fetching advance report:', err?.message);
            setError(err?.message);
        } finally {
            hideLoader();
            setIsSummaryLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchDetailData();
        if (msg_id && selectedTime) {
            await fetchAdvanceReport(selectedTime);
        }
        setRefreshing(false);
    };

    const activeFromTime = detailData?.update_time
        ? moment(detailData?.update_time)?.format('YYYY-MM-DD hh:mm A z')
        : null;

    return {
        detailData,
        advanceReportData,
        allSignals,
        timeData,
        error,
        refreshing,
        isSummaryLoading,
        activeFromTime,
        onRefresh,
    };
};

export default useDetailsScreen;
