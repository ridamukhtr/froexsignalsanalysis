// import packages
import moment from 'moment-timezone';
import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
// import components
import HorizontalView from './HorizontalView';
import ViewIndicesDetails from './ViewIndicesDetails';
import CustomText from '../customComponents/CustomText';
import TechnicalIndicatorView from './TechnicalIndicatorView';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
// import styling
import { Loader } from '../loader/Loader';
import { COLORS } from '../../styles/theme-styles';
// import assets
import time_map from '../../../assets/time_map';

const AdvanceReport = ({ advanceDetail, info, selectedTime, onTabChange, indicators, isLoading }) => {

    const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const formattedTime = info?.update_time
        ? moment.utc(info.update_time, "YYYY-MM-DD hh:mm [UTC]")
            .tz(systemTimeZone)
            .format("YYYY-MM-DD hh:mm A z")
        : "No time available";

    const tabs = Object?.values(time_map);
    const selectedTimeLabel = selectedTime && time_map[selectedTime] ? time_map[selectedTime] : 'Unknown Time';
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const { textColor, bgColor } = useThemeManager();

    const { getMaSummaryColor } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(advanceDetail?.summary);

    const fnDetailsVisibility = () => {
        setIsDetailsVisible(prevState => !prevState);
        // Scroll to the details section when clicked
        scrollViewRef.current.scrollTo({ y: detailsSectionRef.current.offsetTop, animated: true });
    };

    const scrollViewRef = useRef(null); // Reference for ScrollView
    const detailsSectionRef = useRef(null); // Reference for the Details section

    return (
        <ScrollView ref={scrollViewRef} style={{ marginTop: 15 }}>
            <CustomText style={[styles.title, { fontSize: 16, color: textColor }]}>{'Advance Report for Professionals'}</CustomText>

            <HorizontalView tabs={tabs} variant={"button"} onTabChange={onTabChange} initialTab={time_map[selectedTime]} />
            <View style={styles.boxContainer}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                    <View style={styles.boxContent}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Updated Time'}</CustomText>
                    </View>

                    <CustomText style={{ fontSize: 13 }}>{formattedTime}</CustomText>
                    <CustomText style={{ fontSize: 13 }}>{info?.update_time}</CustomText>

                    <View style={[styles.boxContent, { marginTop: 10 }]}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Summary :'}</CustomText>
                        {isLoading ? (
                            <View style={{}}>
                                <Loader animationStyle={{ width: 25, height: 25 }} />
                            </View>
                        ) : (
                            <View style={styles.btn}>
                                <CustomText style={{ color: maSummaryColor }}>
                                    {advanceDetail?.summary || 'no signal'}
                                </CustomText>
                            </View>
                        )}
                    </View>
                </View>

                <CustomTouchableOpacity onPress={fnDetailsVisibility} style={[styles.btnContainer, { backgroundColor: "#784611" }]}>
                    <CustomText style={{ fontSize: 18, color: "white" }}>{'View Details'}</CustomText>
                </CustomTouchableOpacity>

                <View ref={detailsSectionRef}>
                    {isDetailsVisible && (
                        <View style={{ paddingVertical: 15 }}>
                            {isLoading ? (
                                <View style={{ paddingVertical: 20 }}>
                                    <Loader animationStyle={{ width: 50, height: 50 }} />
                                </View>
                            ) : (
                                <>
                                    <CustomText style={{ fontWeight: "bold", paddingHorizontal: 10 }} >  {` Pivot Points (${selectedTimeLabel}) `}</CustomText>
                                    <ViewIndicesDetails pivotData={advanceDetail?.pivot_point} />
                                    <CustomText style={{ fontWeight: "bold", paddingHorizontal: 10, paddingTop: 15 }} >  {`Technical Indicators (${selectedTimeLabel}) `}</CustomText>
                                    <TechnicalIndicatorView indicators={indicators} />
                                </>
                            )}
                        </View>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

export default AdvanceReport;

const styles = StyleSheet.create({
    boxContainer: { borderTopColor: COLORS.GREY, borderWidth: 1, borderColor: COLORS.GREY, borderRadius: 3, marginVertical: 15 },
    boxContent: { alignItems: 'center', flexDirection: 'row', gap: 20 },
    btnContainer: { alignItems: 'center', paddingVertical: 10, borderBottomRightRadius: 3, borderBottomLeftRadius: 3, },
    btn: { backgroundColor: COLORS.MED_GRAY, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 150 / 1 },

    title: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold'
    }
});
