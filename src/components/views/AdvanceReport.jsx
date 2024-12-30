// import packages
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import components
import HorizontalView from './HorizontalView';
import ViewIndicesDetails from './ViewIndicesDetails';
import CustomText from '../customComponents/CustomText';
import TechnicalIndicatorView from './TechnicalIndicatorView';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
// import hooks
import useThemeManager from '../../lib/customHooks/useThemeManager';
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions';
// import styling
import { COLORS } from '../../styles/theme-styles';
// import assets
import time_map from '../../../assets/time_map';

const AdvanceReport = ({ advanceDetail, selectedTime, onTabChange }) => {

    const tabs = Object?.values(time_map);
    const selectedTimeLabel = selectedTime && time_map[selectedTime] ? time_map[selectedTime] : 'Unknown Time';

    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const { textColor, bgColor } = useThemeManager();

    const { getMaSummaryColor } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(advanceDetail?.summary);

    const fnDetailsVisibility = () => {
        setIsDetailsVisible(prevState => !prevState);
    };

    return (
        <View style={{ marginTop: 15 }}>
            <CustomText style={[styles.title, { fontSize: 16, color: textColor }]}>{'Advance Report for Professionals'}</CustomText>

            <HorizontalView tabs={tabs} variant={"button"} onTabChange={onTabChange} initialTab={time_map[selectedTime]} />
            <View style={styles.boxContainer}>
                <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                    <View style={styles.boxContent}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Updated Time'}</CustomText>
                    </View>

                    <CustomText style={{ fontSize: 13 }}>{'Dec 12, 2024 01:12 PM (PST)'}</CustomText>
                    <CustomText style={{ fontSize: 13 }}>{'Dec 12, 2024 08:12 AM (UTC)'}</CustomText>

                    <View style={[styles.boxContent, { marginTop: 10 }]}>
                        <CustomText style={{ fontWeight: 'bold' }}>{'Summary :'}</CustomText>
                        <View style={styles.btn}>
                            <CustomText style={{ color: maSummaryColor }}>{advanceDetail?.summary}</CustomText>
                        </View>
                    </View>
                </View>

                <CustomTouchableOpacity onPress={fnDetailsVisibility} style={[styles.btnContainer, { backgroundColor: textColor }]}>
                    <CustomText style={{ fontSize: 18, color: "#FFA628" }}>{'View Details'}</CustomText>
                </CustomTouchableOpacity>

                {isDetailsVisible && (
                    <View style={{ paddingVertical: 15 }}>
                        <CustomText style={{ fontWeight: "bold", paddingHorizontal: 10 }} >  {` Pivot Points (${selectedTimeLabel}) `}</CustomText>
                        <ViewIndicesDetails pivotData={advanceDetail?.pivot_point} />
                        <CustomText style={{ fontWeight: "bold", paddingHorizontal: 10, paddingTop: 15 }} >Technical Indicators</CustomText>
                        <TechnicalIndicatorView />

                    </View>
                )}
            </View>
        </View>
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