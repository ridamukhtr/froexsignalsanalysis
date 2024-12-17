import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'

const IndicesScreen = ({data}) => {
    const transformedData = data?.index ? Object.values(data.index) : [];

    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <>
            <ViewScreens
                data={transformedData}
                onPressItem={handlePressItem}
            />
        </>
    )
}

export default IndicesScreen

const styles = StyleSheet.create({})