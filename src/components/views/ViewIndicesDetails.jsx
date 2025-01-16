// import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import components
import CustomText from '../customComponents/CustomText';
// import styling
import globalStyles from '../../styles/global-styles';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const PivotTableView = ({ pivotData }) => {

    if (!pivotData || Object?.keys(pivotData)?.length === 0) {
        return (
            <View style={{ paddingHorizontal: 20 }}>
                <CustomText>No Pivot Data Available</CustomText>
            </View>
        );
    }

    const { textColor, borderColor } = useThemeManager();

    const desiredOrder = ['r1', 'r2', 'r3', 'pp', 's3', 's2', 's1'];
    const displayOrder = ['R1', 'R2', 'R3', 'PP', 'S3', 'S2', 'S1'];

    const findKeyInCategory = (category, searchKey) => {
        return Object?.keys(category)?.find(key => key?.toLowerCase() === searchKey?.toLowerCase());
    };

    const rowHeaders = desiredOrder
        .filter((key, index) => Object?.values(pivotData)?.filter(category => findKeyInCategory(category, key) !== undefined)?.length > 0)
        ?.map((key, index) => displayOrder[index]);

    return (
        <View style={[globalStyles.boxContainer, { borderColor: borderColor, }]}>
            <View style={[globalStyles.rowContainer, { borderBottomColor: borderColor, }]}>
                <View style={globalStyles.column}>
                    <CustomText style={[globalStyles.titleText]}>{'#'}</CustomText>
                </View>
                {Object?.keys(pivotData)
                    ?.filter(key => key !== 'demark')
                    ?.map((key, index) => (
                        <View key={index} style={globalStyles.column}>
                            <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}> {key?.charAt(0)?.toUpperCase() + key?.slice(1)}</CustomText>
                        </View>
                    ))}
            </View>

            {rowHeaders?.map((rowHeader, rowIndex) => (
                <View key={rowIndex} style={[globalStyles.rowContainer, { borderBottomColor: borderColor, }]}>
                    <View style={globalStyles.cell}>
                        <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>{rowHeader}</CustomText>
                    </View>
                    {Object?.entries(pivotData)
                        ?.filter(([key]) => key !== 'demark')
                        ?.map(([category, values], colIndex) => {
                            const matchingKey = findKeyInCategory(values, desiredOrder[rowIndex]);
                            return (
                                <View key={colIndex} style={globalStyles.cell}>
                                    <CustomText style={[globalStyles.text]}>
                                        {matchingKey !== undefined ? Number(values[matchingKey]).toFixed(2) : '--'}
                                    </CustomText>
                                </View>
                            );
                        })}
                </View>
            ))}
        </View>
    );
};

export default PivotTableView;

const styles = StyleSheet.create({});
