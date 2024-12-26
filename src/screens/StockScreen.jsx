// import packeges
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import screens
import ViewScreens from '../components/views/ViewScreens';
// import routes
import { ROUTES } from '../routes/RouteConstants';
// import store
import { useGetInnerScreenDataQuery } from '../redux/storeApis';

const StockScreen = ({ data }) => {
	const navigation = useNavigation();

	const [selectedItem, setSelectedItem] = useState(null);

	const transformedData = data?.stock ? Object.values(data.stock) : [];

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
				id: selectedItem.id,
				msg_id: selectedItem.msg_id,
				item: selectedItem,
				detailData
			};

			navigation.navigate(ROUTES.screenDetails, { item: selectedItem, params });
			setSelectedItem(null);
		}
	}, [detailData, selectedItem, navigation]);

	const handlePressItem = item => {
		setSelectedItem(item);
		console.log('Item pressed:', item);
	};

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} />;
};

export default StockScreen;

const styles = StyleSheet.create({});
