// import packages
import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
// import routes
import { ROUTES } from '../routes/RouteConstants';
// import components
import ViewScreens from '../components/views/ViewScreens';
// import store
import { useGetInnerScreenDataQuery } from '../redux/storeApis';

const CryptoCurrencyScreen = ({ data, refreshControlProps }) => {
	const navigation = useNavigation();

	const [selectedItem, setSelectedItem] = useState(null);

	const transformedData = data?.crypto ? Object?.values(data.crypto) : [];

	const { data: detailData } = useGetInnerScreenDataQuery(
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

	const handlePressItem = item => {
		setSelectedItem(item);
		console.log('Item pressed:', item);
	};

	return <ViewScreens data={transformedData} onPressItem={handlePressItem} refreshControlProps={refreshControlProps} />;
};

export default CryptoCurrencyScreen;

const styles = StyleSheet.create({});
