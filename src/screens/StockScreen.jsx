import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ViewScreens from '../components/views/ViewScreens';
import data from '../../assets/all_data.json'
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes/RouteConstants';

const StockScreen = () => {
    const navigation = useNavigation()

    const fnNavigateToDetails = (item) => navigation.navigate(ROUTES.screenDetails, { item });


    const handlePressItem = (item) => {
        fnNavigateToDetails(item.title); // Pass item data to details screen
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