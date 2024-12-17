import { StyleSheet, } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';

const ForexScreen = ({data}) => {

    const transformedData = data?.forex ? Object.values(data.forex) : [];

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

export default ForexScreen

const styles = StyleSheet.create({})