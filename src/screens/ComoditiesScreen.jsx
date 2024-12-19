import React, { useEffect, useState } from 'react'
import ViewScreens from '../components/views/ViewScreens';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../routes/RouteConstants';
import { useGetInnerScreenDataQuery } from '../redux/storeApis';

const ComoditiesScreen = ({ data }) => {
    const navigation = useNavigation();

    const transformedData = data?.commo ? Object?.values(data?.commo) : [];

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

export default ComoditiesScreen