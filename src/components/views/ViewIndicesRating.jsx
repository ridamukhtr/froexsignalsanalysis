import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/theme-styles'
import globalStyles from '../../styles/global-styles'
import CustomText from '../customComponents/CustomText'
import Arrow from 'react-native-vector-icons/Entypo'
import moment from 'moment-timezone';

const ViewIndicesRating = ({ price, summaryChange, summaryChangeP, update_time, }) => {

    const now = moment();
    const timeZone = moment.tz.guess();
    const currentDate = now.format('MM/DD/YYYY');
    const currentTime = now.format('h:mm A');
    const country = moment.tz(timeZone).format('z');

    const getTimeDifference = (updateTime) => {
        if (updateTime) {
            const cleanedTime = updateTime.replace(/\s\([A-Za-z]*\)$/, '');

            const updateMoment = moment(cleanedTime, 'YYYY-MM-DD hh:mm A');
            return updateMoment.fromNow();
        }
        return 'No update time available';
    };

    const timeDifference = getTimeDifference(update_time);

    const getMaSummaryColor = (summaryChange) => {
        const numericValue = parseFloat(summaryChange);
        if (!isNaN(numericValue)) {
            return numericValue > 0 ? COLORS.GREEN : COLORS.RED;
        }
        return COLORS.WHITE;
    };

    const maSummaryColor = getMaSummaryColor(summaryChangeP);

    return (

        <View style={{ backgroundColor: COLORS.DARK_BLUE, padding: 20, }}>

            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center" }} >
                {maSummaryColor === COLORS.RED && (
                    <Arrow name="arrow-down" size={25} color={COLORS.RED} />
                )}
                {maSummaryColor === COLORS.GREEN && (
                    <Arrow name="arrow-up" size={25} color={COLORS.GREEN} />
                )}


                <CustomText style={styles.titleText}>{price}</CustomText>
                <View style={{ flexDirection: "row", alignContent: "flex-end" }}>

                    <CustomText style={[globalStyles.timeText, { color: maSummaryColor, lineHeight: 20 }]}>{summaryChange}</CustomText>
                    <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{"("}{summaryChangeP}{"%)"}</CustomText>
                </View>

            </View>
            <View >
                <View style={styles.boxContent}>
                    <CustomText style={[globalStyles.titleText, { fontSize: 14, color: COLORS.WHITE }]}>{"Update Time :"}</CustomText>
                    <View >
                        <CustomText style={{ fontSize: 12, color: COLORS.WHITE, }}>{timeDifference}</CustomText>
                        <CustomText style={{ fontSize: 12, color: COLORS.WHITE, }}>{update_time}</CustomText>
                    </View>
                </View>
                <View style={styles.boxContent}>
                    <CustomText style={[globalStyles.titleText, { fontSize: 14, color: COLORS.WHITE }]}>{"Current Time :"}</CustomText>
                    <CustomText style={{ fontSize: 12, color: COLORS.WHITE, }}>{currentDate} {currentTime} {country}</CustomText>
                </View>
            </View>
        </View>
    )
}

export default ViewIndicesRating

const styles = StyleSheet.create({
    titleText: {
        color: COLORS.WHITE,
        fontSize: 25,
        lineHeight: 45,
        fontWeight: '600',
    },
    boxContent: { alignItems: "center", flexDirection: "row", gap: 20 },
})