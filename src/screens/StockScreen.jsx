import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import CustomScrollView from '../components/customComponents/CustomScrollView';

const StockScreen = () => {

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <View  >
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
            />
        </View>
    )
}

export default StockScreen

const styles = StyleSheet.create({})