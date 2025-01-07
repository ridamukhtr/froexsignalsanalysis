import { StyleSheet, View } from 'react-native';
import React from 'react';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const ViewIndicesDetails = ({ pivotData }) => {
    const { textColor, bgColor } = useThemeManager();

    if (!pivotData) {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <CustomText>No Pivot Points Data Available</CustomText>
            </View>
        );
    }

    return (
        <>
            {Object?.entries(pivotData)?.map(([name, values], index) => (
                <View key={index} style={[globalStyles.cardContainer, { gap: 12, marginTop: 15, marginHorizontal: 10 }]}>
                    <CustomText style={[styles.mainHeading, { backgroundColor: bgColor }]}>
                        {name?.charAt(0)?.toUpperCase() + name?.slice(1)}
                    </CustomText>

                    {name === "demark" && (
                        <>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                <View style={{ width: '30%' }}>
                                    <CustomText style={{ left: 5 }}>{"High"}</CustomText>
                                    <View style={styles.numContainer}>
                                        <CustomText>{Number(values?.high)?.toFixed(2)}</CustomText>
                                    </View>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <CustomText style={{ left: 5 }}>{"Low"}</CustomText>
                                    <View style={styles.numContainer}>
                                        <CustomText>{Number(values?.low)?.toFixed(2)}</CustomText>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
                                <View style={{ width: '30%' }}>
                                    <CustomText style={{ left: 5 }}>{"R1"}</CustomText>
                                    <View style={styles.numContainer}>
                                        <CustomText>{Number(values?.R1)?.toFixed(2)}</CustomText>
                                    </View>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <CustomText style={{ left: 5 }}>{"S1"}</CustomText>
                                    <View style={styles.numContainer}>
                                        <CustomText>{Number(values?.S1)?.toFixed(2)}</CustomText>
                                    </View>
                                </View>

                            </View>
                        </>
                    )}

                    {name !== "demark" && Object?.entries(values)?.length > 0 && (
                        <View>
                            <CustomText style={{ left: 5 }}>{Object?.keys(values)[0]}</CustomText>
                            <View style={styles.firstRow}>
                                <CustomText>{Object?.values(values)?.[0]}</CustomText>
                            </View>
                        </View>
                    )}

                    <View style={styles.valueContainer}>
                        {Object?.entries(values)?.slice(1)?.filter(([key]) => !['high', 'low', 'R1', 'S1'].includes(key))?.map(([key, value], idx) => (
                            <View key={idx} style={{ width: '30%' }}>
                                <CustomText style={{ left: 5 }}>{key}</CustomText>
                                <View style={styles.numContainer}>
                                    <CustomText>{Number(value)?.toFixed(2)}</CustomText>
                                </View>
                            </View>
                        ))}
                    </View>
                </View >
            ))}
        </>
    );
};

export default ViewIndicesDetails;

const styles = StyleSheet.create({
    mainHeading: { position: 'absolute', top: -10, left: 10, paddingHorizontal: 5, fontWeight: 'bold' },
    firstRow: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.GREY,
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 7,
        marginBottom: 10,
    },
    valueContainer: { gap: 16, flexWrap: 'wrap', flexDirection: 'row', },
    numContainer: { borderColor: COLORS.GREY, borderWidth: 1, borderRadius: 6, paddingHorizontal: 12, paddingVertical: 7 }
});
