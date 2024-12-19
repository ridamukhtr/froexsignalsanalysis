import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'
import { COLORS } from '../../styles/theme-styles'
import Arrow from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/Fontisto'
import time_map from '../../../assets/time_map'
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions'


const SignalSummery = ({ symbol, maSummary, ago, updateTime, ma_summery }) => {

    const { getMaSummaryColor } = useCommonFunctions();

    const maSummaryColor = getMaSummaryColor(ma_summery);

    return (

        <View style={{ paddingVertical: 20 }}>
            <CustomText style={[globalStyles.titleText,]}>
                {'Signal Summary'}
            </CustomText>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 60 }}>
                <CustomText style={globalStyles.titleText}>
                    {'Time'}
                </CustomText>
                <CustomText style={globalStyles.titleText}>{symbol}</CustomText>
            </View>
            {Object?.entries(time_map)?.map(([key, label]) => (
                <View key={key} style={styles.container} >

                    <View style={{ width: "18%" }}>
                        <CustomText>{label}</CustomText>
                    </View>

                    <View>

                        <View style={styles.content}>
                            {maSummaryColor === COLORS.RED && (
                                <Arrow name="arrow-down" size={25} color={COLORS.RED} />
                            )}
                            {maSummaryColor === COLORS.GREEN && (
                                <Arrow name="arrow-up" size={25} color={COLORS.GREEN} />
                            )}
                            {maSummaryColor === COLORS.BLUE && (
                                <Icon name="arrow-h" size={25} color={COLORS.BLUE} />
                            )}
                            <CustomText style={{ fontSize: 14 }}>{maSummary}</CustomText>
                            <CustomText style={{ fontSize: 14 }}>
                                {"(update"} {ago} {"ago)"}
                            </CustomText>
                        </View>

                        <View style={styles.content}>
                            <CustomText style={{ fontSize: 14 }}>{updateTime}</CustomText>
                            <CustomText style={{ fontSize: 14 }}>
                                {"(PST)"}
                            </CustomText>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default SignalSummery

const styles = StyleSheet.create({
    container: { flexDirection: "row", alignItems: "center", gap: 25, paddingVertical:7, borderBottomWidth: 1, borderColor: COLORS.GREY, },
    content: { flexDirection: "row", alignItems: "center", gap: 5 }
})