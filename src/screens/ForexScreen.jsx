import { StyleSheet, } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'

const ForexScreen = () => {
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

export default ForexScreen

const styles = StyleSheet.create({})