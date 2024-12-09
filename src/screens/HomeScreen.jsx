import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import FavouriteScreen from './FavouriteScreen';
import data from '../../assets/all_data.json'
import CustomSearchField from '../components/customComponents/CustomSearchField';
import ViewTechnical from '../components/views/ViewTechnical';
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../styles/theme-styles';


const HomeScreen = () => {
    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    const ChartIcon = () => {
        return (
            <View style={{alignItems:"flex-end"}}  >
                <Icon name={"linechart"} size={20} color={COLORS.WHITE} />
            </View>
        )
    }

    return (
        <CustomView right={<ChartIcon />} showBackIcon title={"Screen"} >
            <ViewTechnical />
            {/* <CustomSearchField/> */}
            {/* <ViewScreens
                data={data}
                onPressItem={handlePressItem}
            /> */}
        </CustomView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});