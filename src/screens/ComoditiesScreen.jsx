import { View, Text } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView';
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import CustomText from '../components/customComponents/CustomText';

const ComoditiesScreen = ({ data }) => {

    const transformedData = data?.commo ? Object.values(data.commo) : [];
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

export default ComoditiesScreen