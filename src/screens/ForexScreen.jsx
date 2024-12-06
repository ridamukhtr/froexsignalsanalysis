import { StyleSheet, } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';

const ForexScreen = () => {
    const handlePressItem = (item) => {
        console.log('Item pressed:', item);
    };

    return (
        <CustomView addScroll={true}>
            <ViewScreens
                data={data}
                onPressItem={handlePressItem}
            />
        </CustomView>
    )
}

export default ForexScreen

const styles = StyleSheet.create({})