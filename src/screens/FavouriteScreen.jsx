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
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import globalStyles from '../styles/global-styles';

const FavouriteScreen = () => {
    const [data, setData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { handlePressItem } = useInnerScreens();
    const { textColor } = useThemeManager();

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

    const RightView = () => {
        return (
            <View style={globalStyles.gapContainer} >
                <CustomTouchableOpacity >
                    <Notification name="bell-outline" size={20} color={textColor} />
                </CustomTouchableOpacity>
                <CustomTouchableOpacity >
                    <Search name="search" color={textColor} size={20} />
                </CustomTouchableOpacity>
            </View>
        );
    };

    return (
        <CustomView right={<RightView />}>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
                refreshControlProps={{ onRefresh: refreshFavorites }}
            />
        </CustomView>
    );
};

export default FavouriteScreen;


const styles = StyleSheet.create({});
