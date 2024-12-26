//  import packages
import { useState, useEffect } from 'react';
//  import hook
import useLoadingHooks from './useLoadingHook';

export const useAdvanceReport = (msgId) => {
    const [advanceReportData, setAdvanceReportData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (msgId) {
            fetchAdvanceReport();
        }
    }, [msgId]);

    const { hideLoader, showLoader } = useLoadingHooks();


    const fetchAdvanceReport = async () => {
        try {
            showLoader();
            const response = await fetch(`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${msgId}`);
            if (response?.ok) {
                const data = await response.json();
                const { summary, change_at } = data?.pp?.overall || {};
                setAdvanceReportData({ summary, change_at });
            } else {
                setError(`API call failed with status: ${response.status}`);
            }
        } catch (err) {
            setError(err?.message || 'An error occurred');
        } finally {
            hideLoader();
        }
    };

    return { advanceReportData, error };
};
