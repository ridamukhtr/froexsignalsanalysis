//  import packages
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
//  import components
import CustomView from '../components/customComponents/CustomView';
import ViewIndicesRating from '../components/views/ViewIndicesRating';
import ViewModalData from '../components/views/ViewModalData';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
import CustomScrollView from '../components/customComponents/CustomScrollView';
import SignalSummery from '../components/views/SignalSummery';
import CustomText from '../components/customComponents/CustomText';
import AdvanceReport from '../components/views/AdvanceReport';
//  import route
import { ROUTES } from '../routes/RouteConstants';
// import styles
import globalStyles from '../styles/global-styles';
import { COLORS } from '../styles/theme-styles';
// import assets
import { Loader } from '../components/loader/Loader';
import { RefreshControl } from 'react-native-gesture-handler';
// import hook
import useThemeManager from '../lib/customHooks/useThemeManager';
import useDetailsScreen from '../lib/customHooks/useDetailData';
import { useGetDetailsAdvanceReportQuery } from '../redux/storeApis';
import time_map from '../../assets/time_map';
import useLoadingHooks from '../lib/customHooks/useLoadingHook';

const DetailsScreen = ({ itemId }) => {
	const navigation = useNavigation();

	const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

	const route = useRoute();
	const { item } = route?.params;

	const [selectedTime, setSelectedTime] = useState(1800);
	const [advanceReportData, setAdvanceReportData] = useState(null);
	const [error, setError] = useState(null);

	const { bgColor, textColor } = useThemeManager();
	const { allSignals, detailData, onRefresh, refreshing, timeData, activeFromTime } = useDetailsScreen(item);
	const { showLoader, hideLoader } = useLoadingHooks();

	const fetchAdvanceReport = async (item, type, period) => {
		console.log("item---->>", item);
		console.log("type---->>", type);
		console.log("selectedTime (period)---->>", period);
		showLoader();
		try {
			const response = await fetch(
				`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${item?.msg_id}&period=${period}&type=${'stock'}`
			);
			console.log("response", response);

			const data = await response.json();
			console.log("data", data);

			// if (data?.pp?.overall) {
			// 	const { summary } = data?.pp?.overall;
			// 	setAdvanceReportData({ summary });
			// } else {
			// 	console.log("No data found for overall in the response");
			// }

			if (data?.pp) {
				const { pivot_point, overall } = data.pp;
				setAdvanceReportData({ pivot_point, summary: overall?.summary });
			} else {
				console.log("No data found in the response");
			}

		} catch (err) {
			console.error('Error fetching advance report:', err.message);
			setError(err?.message);
		}
		finally {
			hideLoader();
		}
	};

	useEffect(() => {
		if (item?.msg_id, selectedTime) {
			fetchAdvanceReport(item, item?.type, selectedTime);
		}
	}, [item, selectedTime]);

	console.log("advancee", advanceReportData);
	console.log("msg_id", item?.msg_id);

	const onTabChange = (newTab) => {
		const selectedPeriod = Object?.keys(time_map)?.find(key => time_map[key] === newTab);
		if (selectedPeriod) {
			setSelectedTime(parseInt(selectedPeriod, 10)); // Update the selectedTime state
		}
	};




	const handlePressItem = () => {
		fnNavigateToDetails();
		console.log('Item pressed:');
	};

	const ChartIcon = () => {
		return (
			<CustomTouchableOpacity onPress={handlePressItem}>
				<Icon name={'linechart'} size={20} color={COLORS.WHITE} />
			</CustomTouchableOpacity>
		);
	};

	const maData =
		timeData?.map(item => ({
			time: item?.time,
			maBuy: item?.maBuy ?? 0,
			maSell: item?.maSell ?? 0,
			maSignal: item?.maSignal ?? 0
		})) || [];

	const tecData =
		timeData?.map(item => ({
			time: item?.time,
			tecBuy: item?.tecBuy ?? 0,
			tecSell: item?.tecSell ?? 0,
			tecSignal: item?.tecSignal ?? 0
		})) || [];

	return (
		<CustomView showBackIcon title={item?.symbol} right={<ChartIcon />}>
			{!detailData && !advanceReportData ? (
				<Loader />
			) : (
				<>
					<ViewIndicesRating
						price={item?.price}
						summaryChange={item?.summaryChange}
						summaryChangeP={item?.summaryChangeP}
						update_time={activeFromTime}
					/>

					<CustomScrollView refreshControl={
						<RefreshControl
							onRefresh={onRefresh}
							progressViewOffset={10}
							colors={[textColor]}
							tintColor={textColor}
							progressBackgroundColor={bgColor}
							refreshing={refreshing}
							renderIndicator={() => <Loader />}
						/>
					}>
						<View style={{ marginVertical: 15 }}>
							<CustomText
								style={[
									globalStyles.titleText,
									{ fontSize: 16, paddingBottom: 10 }
								]}
							>
								{'Signal Summary'}
							</CustomText>
							<View style={{ flexDirection: 'row', alignItems: 'center', gap: 60 }}>
								<CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
									{'Time'}
								</CustomText>
								<CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
									{item?.symbol}
								</CustomText>
							</View>

							{allSignals?.map((signal, index) => (
								<SignalSummery
									key={index}
									symbol={signal?.symbol}
									maSummary={signal?.ma_summery}
									ago={signal?.ago}
									ma_summery={signal?.ma_summery}
									activeTime={signal?.activeTime}
									time={signal?.mappedTime}
								/>
							))}
						</View>

						<ViewModalData title={'Moving Averages Lines'} timeData={maData} />

						<ViewModalData title={'Technical Indicators'} timeData={tecData} />

						<AdvanceReport advanceDetail={advanceReportData} onTabChange={onTabChange} selectedTime={selectedTime} />
					</CustomScrollView>
				</>
			)}
		</CustomView>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({});
