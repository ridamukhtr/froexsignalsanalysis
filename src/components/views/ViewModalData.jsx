import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../customComponents/CustomText';
import { COLORS } from '../../styles/theme-styles';
import Icon from 'react-native-vector-icons/Fontisto';
import Arrow from 'react-native-vector-icons/Entypo';
import time_map from '../../../assets/time_map';
import useCommonFunctions from '../../lib/customHooks/useCommonFunctions';
import globalStyles from '../../styles/global-styles';

const ViewModalData = ({ title, timeData }) => {
    const { getMaSummaryColor } = useCommonFunctions();

    return (
        <View>
            <View style={{ marginVertical: 15 }}>
                <CustomText style={[globalStyles.titleText, { fontSize: 20 }]}>{title}</CustomText>
            </View>

            <View >

                <View style={styles.headerRow}>
                    <View style={styles.timeColumn}>
                        <CustomText style={globalStyles.titleText}>Time</CustomText>
                    </View>
                    <View style={styles.valueColumn}>
                        <CustomText style={globalStyles.titleText}>Buy</CustomText>
                    </View>
                    <View style={styles.valueColumn}>
                        <CustomText style={globalStyles.titleText}>Sell</CustomText>
                    </View>
                    <View style={styles.signalColumn}>
                        <CustomText style={globalStyles.titleText}>Summary</CustomText>
                    </View>
                </View>

                {timeData?.map((item, index) => {

                    const buyValue = item?.maBuy || item?.tecBuy;
                    const sellValue = item?.maSell || item?.tecSell;
                    const signalValue = item?.maSignal || item?.tecSignal;
                    const maSummaryColor = getMaSummaryColor(signalValue);

                    return (
                        <View key={index} style={styles.headerRow}>
                            <View style={styles.timeColumn}>
                                <CustomText style={globalStyles?.titleText}>{item?.time}</CustomText>
                            </View>

                            <View style={styles.valueColumn}>
                                <CustomText >{buyValue}</CustomText>
                            </View>
                            <View style={styles.valueColumn}>
                                <CustomText >{sellValue}</CustomText>
                            </View>

                            <View style={[styles.valueColumn, { width: '25%' }]}>
                                {maSummaryColor === COLORS.RED && (
                                    <Arrow name="arrow-down" size={25} color={COLORS.RED} />
                                )}
                                {maSummaryColor === COLORS.GREEN && (
                                    <Arrow name="arrow-up" size={25} color={COLORS.GREEN} />
                                )}
                                {maSummaryColor === COLORS.BLUE && (
                                    <Icon name="arrow-h" size={25} color={COLORS.BLUE} />
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ViewModalData;

const styles = StyleSheet.create({
    headerRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: COLORS.GREY },
    timeColumn: { width: '30%', paddingLeft: 10 },
    valueColumn: { width: '20%', alignItems: 'center' },

})