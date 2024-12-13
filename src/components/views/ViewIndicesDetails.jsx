import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity'
import { COLORS } from '../../styles/theme-styles'
import Arrow from 'react-native-vector-icons/Entypo'
import ArrowDown from 'react-native-vector-icons/Entypo'
import useThemeManager from '../../lib/customHooks/useThemeManager'
import { ClicktoNextIcon } from '../../../assets/svg'
import AnimatedIcon from '../../../assets/svg/AnimatedIcon'
import HorizontalView from './HorizontalView'


const ViewIndicesDetails = ({ onPress, title }) => {


    const { textColor } = useThemeManager()

    return (
        <View>
            <View style={globalStyles.container} >
                <CustomText style={[styles.title, { color: textColor }]}>{title}</CustomText>
                <View style={styles.statusContainer}>
                    <CustomText style={styles.statusText}>Strong sell</CustomText>
                    <View style={styles.redDot} />
                </View>
            </View>

            <CustomTouchableOpacity style={styles.btnContainer} onPress={onPress}>
                <View style={[globalStyles.container, { justifyContent: "space-around", paddingBottom: 10 }]} >
                    <View style={[globalStyles.container, { gap: 20, }]} >
                        <View style={[globalStyles.container, { gap: 5 }]}>

                            <Arrow name={"arrow-up"} size={25} color={COLORS.GREEN} />

                            <CustomText style={{ color: COLORS.WHITE }}>{"Buy"}</CustomText>
                        </View>
                        <CustomText style={[globalStyles.titleText, { fontSize: 23, color: COLORS.WHITE }]} >{"2"}</CustomText>
                    </View>
                    <View style={[globalStyles.container, { gap: 20 }]} >
                        <View style={[globalStyles.container, { gap: 5 }]}>

                            <ArrowDown name={"arrow-down"} size={25} color={COLORS.GREEN} />


                            <CustomText style={{ color: COLORS.WHITE }} >{"Sell"}</CustomText>
                        </View>
                        <CustomText style={[globalStyles.titleText, { fontSize: 23, color: COLORS.WHITE }]} >{"2"}</CustomText>
                    </View>

                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", paddingLeft:30 }} >
                    <CustomText style={{ color: COLORS.YELLOW }}>{"Click to view details"}</CustomText>
                    <AnimatedIcon direction="right" color={COLORS.YELLOW} size={24}/>
                </View>
            </CustomTouchableOpacity>
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
