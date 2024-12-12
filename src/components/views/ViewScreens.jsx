import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Favourite from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useThemeManager from '../../lib/customHooks/useThemeManager';

const ViewScreens = ({ data, onPressItem, isFavoriteScreen = false }) => {
    const [favorites, setFavorites] = useState([]);

    const { bgColor, textColor } = useThemeManager()

    // Load favorites from AsyncStorage on mount
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

    const displayData = isFavoriteScreen
        ? data.filter(item => favorites.includes(item.id))
        : data;

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <CustomTouchableOpacity onPress={() => toggleFavorite(item.id)}>
                {favorites.includes(item.id) ? (<Favourite
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
                        <CustomText style={globalStyles.titleText}>{item?.title}</CustomText>
                        <CustomText style={globalStyles.titleText}>|</CustomText>
                        <CustomText style={[globalStyles.titleText, { color: COLORS.GREEN }]}>{item?.status}</CustomText>
                    </View>
                    <CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>{item?.amount}</CustomText>
                </View>
                <View style={globalStyles.container}>
                    <View style={[globalStyles.container, { gap: 7 }]}>
                        <Icon name="clockcircle" size={15} color={COLORS.GREEN} />
                        <CustomText style={globalStyles.timeText}>{item?.time}</CustomText>
                        <CustomText style={globalStyles.timeText}>|</CustomText>
                        <CustomText style={globalStyles.timeText}>{item?.description}</CustomText>
                    </View>
                    <View style={[globalStyles.container, { gap: 7 }]}>
                        <CustomText style={[globalStyles.timeText, { color: COLORS.GREEN }]}>{item?.change}</CustomText>
                        <CustomText style={[globalStyles.timeText, { color: COLORS.RED }]}>{item?.percentage}</CustomText>
                    </View>
                </View>
            </CustomTouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={{  }}>

            <FlatList
                data={displayData}
                renderItem={renderItem}
                keyExtractor={item => item?.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: '55%' }} 
            // scrollEnabled={false}
            />
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex:1,
        
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderColor: COLORS.GREY,
    },
    // titleText: { fontSize: 16, fontWeight: '700', lineHeight: 25 },
    // timeText: { fontSize: 14, fontWeight: '300', color: COLORS.DIM },
});

export default ViewScreens;
