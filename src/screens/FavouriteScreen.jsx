// import packeges
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import Search from 'react-native-vector-icons/Ionicons';
import Notification from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import CustomText from '../components/customComponents/CustomText';

const FavouriteScreen = () => {
    const [data, setData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const { handlePressItem, filterData } = useInnerScreens();
    const { textColor } = useThemeManager();
    const filteredData = filterData(data, searchQuery);
    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                try {
                    const storedFavorites = await AsyncStorage?.getItem('favorites');
                    const favourites = storedFavorites ? JSON.parse(storedFavorites) : [];
                    setData(favourites);
                } catch (error) {
                    console.error('Error loading favorites:', error);
                }
            };

            loadFavorites();
        }, [refreshTrigger])
    );

    const refreshFavorites = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <CustomView onSearch={handleSearch} >
            {filteredData.length === 0 ? (
                <View>
                    <CustomText>
                        No favorites added yet
                    </CustomText>
                    <CustomText>
                        Add items to your favorites to see them here
                    </CustomText>
                </View>
            ) : (
                <ViewScreens
                    data={filteredData}
                    onPressItem={handlePressItem}
                    isFavoriteScreen={true}
                    refreshControlProps={{ onRefresh: refreshFavorites }}
                />
            )}
        </CustomView>
    );
};

export default FavouriteScreen;


const styles = StyleSheet.create({});
