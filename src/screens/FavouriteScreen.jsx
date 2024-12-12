import React from 'react';
import { StyleSheet } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import CustomText from '../components/customComponents/CustomText';
import CustomChart from '../components/customComponents/CustomChart';
import HorizontalView from '../components/views/HorizontalView';

const FavouriteScreen = () => {

    const tabs = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView showBackIcon title={"Favourite Screen"} >
           
            {/* <ViewScreens
                data={data}
                onPressItem={handlePressItem}
                isFavoriteScreen={true}
                // onFavoriteChange={handleFavoriteChange}
            /> */}

            <HorizontalView tabs={tabs} variant={"button"}/>
            <CustomChart/>
        </CustomView>
    );
};

export default FavouriteScreen;

const styles = StyleSheet.create({});