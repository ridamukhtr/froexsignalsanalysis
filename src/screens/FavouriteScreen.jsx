import React from 'react';
import { StyleSheet } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import CustomText from '../components/customComponents/CustomText';

const FavouriteScreen = () => {

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView addScroll={true}>
            <CustomText style={{marginTop:50}} >
                Favourite screen
            </CustomText>
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