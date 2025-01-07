// import packeges
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import components
import CustomSearchField from '../components/customComponents/CustomSearchField';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
// import hook
import useInnerScreens from '../lib/customHooks/useInnerScreens';

const FavouriteScreen = () => {
    const [data, setData] = useState([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const { handlePressItem } = useInnerScreens();

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

    return (
        <CustomView right={<CustomSearchField />}>
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
