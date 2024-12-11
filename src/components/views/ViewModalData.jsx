import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import HorizontalView from './HorizontalView'
import { COLORS } from '../../styles/theme-styles'
import Icon from 'react-native-vector-icons/Entypo';
import Arrow from 'react-native-vector-icons/Fontisto';

const ViewModalData = ({ title }) => {

    const timeTabs = ["5M", "15M", "30M", "1H", "4H", "5H", "1D", "1W"];
    const buyTab = ["3%", "4%", "6%", "10%", "8%", "11%", "8%", "2%"];
    const sellTab = ["1%", "3%", "5%", "10%", "6%", "11%", "8%", "2%"];
    const summaryTab = [
        <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,

    ];


    return (
        <View  >
            <View style={styles.container} >
                <CustomText style={styles.text}>{title}</CustomText>
            </View>

            <View style={{ gap: 10 }} >
                <View style={styles.body} >
                    <View style={[styles.details, { paddingRight: 10 }]} >

                        <CustomText style={styles.text} > {"Signal"}</CustomText>
                    </View>
                    <View style={styles.tab} >

                        <HorizontalView tabs={timeTabs} />
                    </View>

                </View>
                <View style={styles.body} >
                    <View style={styles.details} >

                        <CustomText style={styles.text} > {"Buy"}</CustomText>
                    </View>
                    <View style={styles.tab} >

                        <HorizontalView tabs={buyTab} />
                    </View>

                </View>
                <View style={styles.body} >
                    <View style={styles.details} >

                        <CustomText style={styles.text} > {"Sell"}</CustomText>
                    </View>
                    <View style={styles.tab} >

                        <HorizontalView tabs={sellTab} />
                    </View>

                </View>
                <View style={styles.body} >
                    <View style={[styles.details, { paddingRight: 10 }]} >

                        <CustomText style={[styles.text, { fontSize: 12 }]} > {"Summery"}</CustomText>
                    </View>
                    <View style={styles.tab} >

                        <HorizontalView tabs={summaryTab} />
                    </View>

                </View>
            </View>




        </View>
    )
}

export default ViewModalData

const styles = StyleSheet.create({
    container: { alignItems: "center", marginVertical: 15 },
    text: { color: COLORS.WHITE, fontSize: 17, fontWeight: "bold" },
    body: { flexDirection: "row", alignItems: "center", },
    details: { paddingRight: 30, borderRightWidth: 1, borderRightColor: COLORS.WHITE, },
    tab: { width: "85%", paddingHorizontal: 10 }
})