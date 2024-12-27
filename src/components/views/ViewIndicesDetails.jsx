import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'
import { COLORS } from '../../styles/theme-styles'
import useThemeManager from '../../lib/customHooks/useThemeManager'

const ViewIndicesDetails = ({ onPress, title }) => {


    const { textColor } = useThemeManager()

    return (
        <>
            {/* <CustomText>Pivot Points</CustomText> */}
            <View style={[globalStyles.cardContainer, { gap: 12, marginTop: 15 }]}>
                <CustomText style={{ position: 'absolute', top: -10, left: 10, paddingHorizontal: 5, fontWeight: "bold" }}>{"Fibonssi"}</CustomText>
                <View style={{ gap: 6, }} >
                    <CustomText>{"Pivots"}</CustomText>
                    <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                        <CustomText style={{ textAlign: 'center' }} >{"1.8437"}</CustomText>
                    </View>
                </View>
                <View style={globalStyles.container}>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"R1"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.8437"}</CustomText>
                        </View>
                    </View>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"R2"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.843877"}</CustomText>
                        </View>
                    </View>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"R3"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.8437"}</CustomText>
                        </View>
                    </View>
                </View>
                <View style={globalStyles.container}>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"S1"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.8437"}</CustomText>
                        </View>
                    </View>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"S2"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.8437"}</CustomText>
                        </View>
                    </View>
                    <View style={{ gap: 3, }} >
                        <CustomText style={{ left: 5 }}>{"S3"}</CustomText>
                        <View style={{ borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }} >
                            <CustomText>{"1.843787778"}</CustomText>
                        </View>
                    </View>
                </View>

            </View>
        </>
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
