import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import { COLORS } from '../../styles/theme-styles'
import Arrow from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Fontisto'
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions'

const SignalSummery = ({ maSummary, time, ago, activeTime, ma_summery }) => {

    const { getMaSummaryColor } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(ma_summery);

    return (
        <View style={styles.container} >

            <View style={{ width: "18%" }}>
                <CustomText>{time}</CustomText>
            </View>

            <View>
                <View style={styles.content}>
                    {maSummaryColor === COLORS.RED && (
                        <Arrow name="arrow-down" size={20} color={COLORS.RED} />
                    )}
                    {maSummaryColor === COLORS.GREEN && (
                        <Arrow name="arrow-up" size={20} color={COLORS.GREEN} />
                    )}
                    {maSummaryColor === COLORS.BLUE && (
                        <Icon name="arrow-h" size={20} color={COLORS.BLUE} />
                    )}
                    <CustomText style={{ fontSize: 14 }}>{maSummary}</CustomText>
                    <CustomText style={{ fontSize: 14 }}>
                        {"(update"} {ago} {"ago)"}
                    </CustomText>
                </View>
                <CustomText style={{ fontSize: 14 }}>{activeTime}</CustomText>
            </View>
        </View>
    )
}

export default SignalSummery

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", gap: 25, paddingVertical: 7, borderBottomWidth: 1, borderColor: COLORS.GREY, },
    content: { flexDirection: "row", alignItems: "center", gap: 5 }
})