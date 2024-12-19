import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ViewScreens from '../components/views/ViewScreens';
import { ROUTES } from '../routes/RouteConstants';
import { useNavigation } from '@react-navigation/native';
import { useGetInnerScreenDataQuery } from '../redux/storeApis';

const IndicesScreen = ({ data }) => {
    const navigation = useNavigation();

    const transformedData = data?.index ? Object.values(data?.index) : [];

    const [selectedItem, setSelectedItem] = useState(null);

    const { data: detailData, isLoading } = useGetInnerScreenDataQuery(
        {
            id: selectedItem?.id,
            msg_id: selectedItem?.msg_id
        },
        {
            skip: !selectedItem,
            enabled: !!selectedItem
        }
    );

    useEffect(() => {
        if (detailData && selectedItem) {
            const params = {
                id: selectedItem?.id,
                msg_id: selectedItem?.msg_id,
                item: selectedItem,
                detailData
            };

            navigation.navigate(ROUTES.screenDetails, { item: selectedItem, params });
            setSelectedItem(null);
        }
    }, [detailData, selectedItem, navigation]);

    const handlePressItem = (item) => {
        setSelectedItem(item);
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