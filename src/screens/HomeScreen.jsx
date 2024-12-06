import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import FavouriteScreen from './FavouriteScreen';
import data from '../../assets/all_data.json'

const HomeScreen = () => {
    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView addScroll={true}>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
            />
            <Text>jedhjh</Text>
            <FavouriteScreen />
        </CustomView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});