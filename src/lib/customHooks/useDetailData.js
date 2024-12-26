//  import packeges
import { useState, useEffect } from 'react';
import moment from 'moment-timezone';
//  import hook
import useLoadingHooks from './useLoadingHook';

export const useDetailData = (pageId) => {

    const [detailData, setDetailData] = useState(null);
    const [allSignals, setAllSignals] = useState([]);
    const [timeData, setTimeData] = useState([]);
    const [error, setError] = useState(null);

    const { hideLoader, showLoader } = useLoadingHooks();

    useEffect(() => {
        if (pageId) {
            fetchDetailData();
        }
    }, [pageId]);

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
            const response = await fetch(`https://massyart.com/ringsignal/inv/api_data?id=${pageId}`);
            const data = await response.json();

            if (data?.all?.length > 0) {
                const userCountry = await getUserCountry();

                const processedSignals = data?.all?.map((signal) => {
                    const activeFromParsed = signal?.active_from ? JSON.parse(signal?.active_from) : null;
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
            const timeData = timeIntervals.map(interval => ({
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

    return { detailData, allSignals, timeData, error };
};
