import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/theme-styles'
import globalStyles from '../../styles/global-styles'
import CustomText from '../customComponents/CustomText'
import Arrow from 'react-native-vector-icons/Entypo'
import Icon from 'react-native-vector-icons/AntDesign'
import useThemeManager from '../../lib/customHooks/useThemeManager'

const ViewIndicesRating = () => {

    const { bgColor, textColor } = useThemeManager()
    return (
        <View style={{ backgroundColor: COLORS.DARK_BLUE, padding: 20, }}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center", }} >
                <Arrow name={"arrow-up"} size={25} color={COLORS.GREEN} />
                <CustomText style={styles.titleText}>{"23,45.78"}</CustomText>
                <View style={{ flexDirection: "row", alignContent: "flex-end" }}>

                    <CustomText style={[globalStyles.timeText, { color: COLORS.GREEN, lineHeight: 20 }]}>{"+0.57"}</CustomText>
                    <CustomText style={[globalStyles.timeText, { color: COLORS.RED }]}>{"(+0.67%)"}</CustomText>
                </View>

            </View>
            <View style={{ paddingHorizontal: 37, flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Icon name="clockcircle" size={15} color={COLORS.YELLOW} />
                <CustomText style={[globalStyles.timeText, { color: COLORS.DIM }]}>{"13/6 - Delayed Currency in FRC"}</CustomText>

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
})