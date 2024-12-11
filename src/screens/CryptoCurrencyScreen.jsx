import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'

const CryptoCurrencyScreen = () => {
    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
            />
        </>
    )
}

export default CryptoCurrencyScreen

const styles = StyleSheet.create({})