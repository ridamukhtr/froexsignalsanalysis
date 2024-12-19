import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/theme-styles'
import globalStyles from '../../styles/global-styles'
import CustomText from '../customComponents/CustomText'
import Arrow from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Fontisto'
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions'

const ViewIndicesRating = ({ price, summaryChange, summaryChangeP, ma_summery, ago, active_from }) => {

    const { getMaSummaryColor, convertToPST } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(ma_summery);

  
    return (

        <View style={{ backgroundColor: COLORS.DARK_BLUE, padding: 20, }}>

            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center" }} >
                {maSummaryColor === COLORS.RED && (
                    <Arrow name="arrow-down" size={25} color={COLORS.RED} />
                )}
                {maSummaryColor === COLORS.GREEN && (
                    <Arrow name="arrow-up" size={25} color={COLORS.GREEN} />
                )}
                {maSummaryColor === COLORS.BLUE && (
                    <Icon name="arrow-h" size={25} color={COLORS.BLUE} />
                )}

                <CustomText style={styles.titleText}>{price}</CustomText>
                <View style={{ flexDirection: "row", alignContent: "flex-end" }}>

                    <CustomText style={[globalStyles.timeText, { color: maSummaryColor, lineHeight: 20 }]}>{summaryChange}</CustomText>
                    <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{"("}{summaryChangeP}{"%)"}</CustomText>
                </View>

            </View>
            <View >
                <View style={styles.boxContent}>
                    <CustomText style={[globalStyles.titleText, { color: COLORS.WHITE }]}>{"Update Time:"}</CustomText>
                    <CustomText style={{ color: COLORS.WHITE, }}>{ago} {"ago"}</CustomText>
                </View>
                <View style={styles.boxContent}>
                    <CustomText style={[globalStyles.titleText, { color: COLORS.WHITE }]}>{"Current Time:"}</CustomText>
                    <CustomText style={{ color: COLORS.WHITE, }}>{active_from}</CustomText>
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