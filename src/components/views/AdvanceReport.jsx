// import packages
import moment from 'moment-timezone';
import React, { useState, } from 'react';
import { StyleSheet, View, } from 'react-native';
// import components
import HorizontalView from './HorizontalView';
import CustomText from '../customComponents/CustomText';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
// import styling
import { Loader } from '../loader/Loader';
import globalStyles from '../../styles/global-styles';
// import assets
import time_map from '../../../assets/time_map';

const AdvanceReport = ({ advanceDetail, info, selectedTime, onTabChange, isLoading }) => {

    const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedTime = info?.update_time
        ? moment.utc(info.update_time, "YYYY-MM-DD hh:mm [UTC]")
            .tz(systemTimeZone)
            .format("YYYY-MM-DD hh:mm A z")
        : "No time available";

    const tabs = Object?.values(time_map);

    const { textColor, borderColor, dropdownColor } = useThemeManager();

    const { getMaSummaryColor } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(advanceDetail?.summary);

    return (
        <View style={{ marginTop: 15 }}>
            <CustomText style={[styles.title, { fontSize: 16, color: textColor }]}>{'Advance Report for Professionals'}</CustomText>

            <HorizontalView tabs={tabs} variant={"button"} onTabChange={onTabChange} initialTab={time_map[selectedTime]} />
            <View style={[globalStyles.boxContainer, { borderColor: borderColor }]}>
                <View style={{ paddingHorizontal: 10, }}>
                    <View style={styles.boxContent}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Updated Time'}</CustomText>
                    </View>

                    <CustomText style={{ fontSize: 13 }}>{formattedTime}</CustomText>
                    <CustomText style={{ fontSize: 13 }}>{info?.update_time}</CustomText>

                    <View style={[styles.boxContent, { marginVertical: 10, paddingBottom: 5 }]}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Summary :'}</CustomText>
                        {isLoading ? (
                            <View style={{}}>
                                <Loader animationStyle={{ width: 25, height: 25 }} />
                            </View>
                        ) : (
                            <View style={[styles.btn, { backgroundColor: dropdownColor }]}>
                                <CustomText style={{ color: maSummaryColor }}>
                                    {advanceDetail?.summary || 'no signal'}
                                </CustomText>
                            </View>
                        )}
                    </View>
                </View>


            </View>
        </View>
    );
};

export default AdvanceReport;

const styles = StyleSheet.create({
    boxContainer: { borderWidth: 1, borderRadius: 5, marginVertical: 15, },
    boxContent: { alignItems: 'center', flexDirection: 'row', gap: 20 },
    btnContainer: { alignItems: 'center', paddingVertical: 10, borderBottomRightRadius: 3, borderBottomLeftRadius: 3, },
    btn: { paddingVertical: 3, paddingHorizontal: 10, borderRadius: 150 / 1 },

    title: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});
