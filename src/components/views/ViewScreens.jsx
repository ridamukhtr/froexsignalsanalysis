import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import useThemeManager from '../../lib/customHooks/useThemeManager';

const ViewScreens = ({ data, onPressItem, renderRightSection }) => {

    const {textColor, } = useThemeManager();

    const renderItem = ({ item }) => (
    
        <CustomTouchableOpacity
            style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: COLORS.GREY }}
            onPress={() => onPressItem?.(item)}
        >

            <View style={globalStyles.container}>
                <View style={[globalStyles.container, { gap: 7 }]}>

                    <CustomText style={styles.title} >{item?.title}</CustomText>
                    <CustomText>|</CustomText>
                    <CustomText>{item?.status}</CustomText>
                </View>
                <CustomText>{item?.amount}</CustomText>
            </View>

            <View style={globalStyles.container}>

                <View style={[globalStyles.container, { gap: 7 }]}>
                    <CustomText>{item?.type}</CustomText>
                    <CustomText>{item?.time}</CustomText>
                    <CustomText>|</CustomText>
                    <CustomText>{item?.description}</CustomText>
                </View>

                {renderRightSection ? (
                    renderRightSection(item)
                ) : (
                    <View style={[globalStyles.container, { gap: 7 }]}>
                        <CustomText>{item?.change}</CustomText>
                        <CustomText>{item?.percentage}</CustomText>
                    </View>
                )}
            </View>

        </CustomTouchableOpacity>
    );

    return (

        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item?.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
        />

    );
};

export default ViewScreens;

const styles = StyleSheet.create({
    title: {}
});
