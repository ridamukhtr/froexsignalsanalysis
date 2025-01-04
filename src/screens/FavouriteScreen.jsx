

import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomSearchField from '../components/customComponents/CustomSearchField';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import { useGetMarketDataQuery } from '../redux/storeApis';
import { useFocusEffect } from '@react-navigation/native';

const FavouriteScreen = () => {

    const [data, setData] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const loadFavorites = async () => {
                try {
                    const storedFavorites = await AsyncStorage.getItem('favorites');
                    const favourites = storedFavorites ? JSON.parse(storedFavorites) : [];
                    console.log("ids", favourites);
                    setData(favourites);

                    // Uncomment and modify if filtering logic is needed:
                    // setData(allData?.filter((item) => favourites?.includes(item?.page_id)));
                } catch (error) {
                    console.error('Error loading favorites:', error);
                }
            };

            loadFavorites();
        }, [])
    );

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
        // Add navigation logic if needed
    };

    return (
        <CustomView right={<CustomSearchField />}>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
            />
        </CustomView>
    );
};

export default FavouriteScreen;


const styles = StyleSheet.create({});
