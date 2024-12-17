import React from 'react';
import { StyleSheet } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import CustomSearchField from '../components/customComponents/CustomSearchField';

const FavouriteScreen = () => {

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView right={<CustomSearchField />} >

            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
            // onFavoriteChange={handleFavoriteChange}
            />
        </CustomView>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});