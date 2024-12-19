import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import HorizontalView from './HorizontalView'
import useThemeManager from '../../lib/customHooks/useThemeManager'
import { COLORS } from '../../styles/theme-styles'
import globalStyles from '../../styles/global-styles'

const AdvanceReport = ({ reportData }) => {
    const tabs = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

    const { textColor, bgColor } = useThemeManager()

    return (
        <View style={{ marginVertical: 20 }} >
            <CustomText style={[styles.title, { color: textColor }]}>
                {"Advance Report for Professionals"}
            </CustomText>
            <HorizontalView tabs={tabs} variant={"button"} />
            <View style={styles.boxContainer} >
                <View style={styles.boxContent}>

                    <CustomText>{"Update:"}</CustomText>
                    <CustomText>{reportData?.change_at}</CustomText>
                </View>
                {/* <View style={{alignItems:"center", flexDirection:"row", gap:20}}> */}

                <CustomText style={{ fontSize: 12 }} >{"Dec 12, 2024 01:12 PM (Pakistan Standard Time)"}</CustomText>
                <CustomText style={{ fontSize: 12 }} >{"Dec 12, 2024 08:12 AM (UTC)"}</CustomText>

                {/* </View> */}

                <View style={[styles.boxContent, { marginTop: 15 }]}>

                    <CustomText>{"Summary:"}</CustomText>
                    <View style={styles.btn(textColor)}>
                        <CustomText style={{ color: "#07639D" }} >{reportData?.summary}</CustomText>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default AdvanceReport

const styles = StyleSheet.create({

    boxContainer: { borderTopColor: COLORS.GREY, borderTopWidth: 1, borderBottomColor: COLORS.GREY, borderBottomWidth: 1, paddingVertical: 20, },
    boxContent: { alignItems: "center", flexDirection: "row", gap: 20 },
    btn: (textColor) => ({ backgroundColor: textColor, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 150 / 1 }),

    title: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },

})