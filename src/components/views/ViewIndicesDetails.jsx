import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'
import { COLORS } from '../../styles/theme-styles'
import useThemeManager from '../../lib/customHooks/useThemeManager'

const ViewIndicesDetails = ({ onPress, title }) => {


    const { textColor } = useThemeManager()

    return (
        <View style={globalStyles.cardContainer}>
            <CustomText style={{ position: 'absolute', top: -10, left: 10, paddingHorizontal: 5 }}>{"Fibonssi"}</CustomText>
            <View style={{ gap: 6 }} >
                <CustomText>{"Pivots"}</CustomText>
                <View style={{ width: "auto", borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                    <CustomText>{"1.8437"}</CustomText>
                </View>
            </View>
            <CustomText>{"R1"}</CustomText>
            <CustomText>{"R2"}</CustomText>
            <CustomText>{"R3"}</CustomText>
            <CustomText>{"S1"}</CustomText>
            <CustomText>{"S2"}</CustomText>
            <CustomText>{"S3"}</CustomText>
        </View>
    )
}

export default ViewIndicesDetails

const styles = StyleSheet.create({
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 4,
    },
    title: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnContainer: { backgroundColor: COLORS.DARK_BLUE, padding: 20, borderRadius: 10, borderWidth: 1, borderColor: COLORS.GREY, marginVertical: 20, marginHorizontal: 30 }

})
