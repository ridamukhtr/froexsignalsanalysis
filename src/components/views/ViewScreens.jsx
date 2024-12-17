import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import Favourite from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const ViewScreens = ({ data, onPressItem, isFavoriteScreen = false }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    };

    const toggleFavorite = async (itemId) => {
        let updatedFavorites;

        if (favorites.includes(itemId)) {
            // Remove from favorites
            updatedFavorites = favorites.filter(id => id !== itemId);
        } else {
            // Add to favorites
            updatedFavorites = [...favorites, itemId];
        }

        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error('Error saving favorites:', error);
        }
    };

    // useFocusEffect(
    //     useCallback(() => {
    //         loadFavorites();
    //         return () => console.log('Cleanup when screen loses focus');
    //     }, [])
    // );

    // const displayData = isFavoriteScreen
    //     ? data.filter(item => favorites.includes(item?.id))
    //     : data;

    const renderItem = ({ item }) => {

        const isFavorite = favorites.includes(item.page_id);

        const getMaSummaryColor = (summary) => {
            switch (summary.toLowerCase()) {
                case 'strong buy':
                case 'buy':
                    return COLORS.GREEN;
                case 'neutral':
                    return COLORS.BLUE;
                case 'sell':
                case 'strong sell':
                    return COLORS.RED;
                default:
                    return COLORS.BLACK;
            }
        };

        const maSummaryColor = getMaSummaryColor(item.ma_summery);
        return (
            <View style={styles.itemContainer}>
                <CustomTouchableOpacity onPress={() => toggleFavorite(item.page_id)}>
                    {isFavorite  ? (<Favourite
                        name="heart"
                        size={20}
                        color={COLORS.GREEN}
                    />
                    ) : (
                        <Favourite
                            name="hearto"
                            color={COLORS.GREEN}
                            size={20}
                        />)}
                </CustomTouchableOpacity>

                <CustomTouchableOpacity style={{ flex: 1 }} onPress={() => onPressItem?.(item)}>
                    <View style={globalStyles.container}>
                        <View style={[globalStyles.container, { gap: 7 }]}>
                            <CustomText style={globalStyles.titleText}>{item.symbol}</CustomText>
                            <CustomText style={globalStyles.titleText}>|</CustomText>
                            <CustomText style={[globalStyles.titleText, { color: maSummaryColor }]}>{item.ma_summery}</CustomText>
                        </View>
                        <CustomText style={[globalStyles.titleText, { fontSize: 15, color: maSummaryColor }]}>{`Price: ${item.price}`}</CustomText>
                    </View>
                    <View style={globalStyles.container}>
                        <View style={[globalStyles.container, { gap: 7 }]}>
                            <CustomText style={[globalStyles.timeText, { maxWidth: '95%' }]} numberOfLines={1} ellipsizeMode={"tail"} >{item?.symbol2}</CustomText>
                        </View>
                        <View style={[globalStyles.container, { gap: 4 }]}>
                            <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{item.summaryChange}</CustomText>
                            <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{"("}</CustomText>
                            <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{item.summaryChangeP}{"%"}</CustomText>
                            <CustomText style={[globalStyles.timeText, { color: maSummaryColor }]}>{")"}</CustomText>
                        </View>
                    </View>
                </CustomTouchableOpacity>
            </View>
        )
    }

    return (
        <SafeAreaView style={{}}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.page_id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '55%' }}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,

        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: COLORS.GREY,
    },
});

export default ViewScreens;