//  import packages
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';
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
import time_map from '../../assets/time_map';
import { setIsLoading } from '../redux/LoaderReducer';
import { useDispatch } from 'react-redux';

const DetailsScreen = ({ itemId }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

	const route = useRoute();
	const { item } = route?.params;

	const [detailData, setDetailData] = useState(null);
	const [timeData, setTimeData] = useState([]);
	const [allSignals, setAllSignals] = useState([]);
	const [advanceReportData, setAdvanceReportData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchDetailData();
		fetchAdvanceReport();
	}, []);

	const getUserCountry = async () => {
		try {
			const response = await fetch('https://ipapi.co/json/');
			const data = await response?.json();
			return data?.country_name || 'Unknown';
		} catch (error) {
			return 'Unknown';
		}
	};

	const fetchDetailData = async () => {
		try {
			dispatch(setIsLoading(true));
			const response = await fetch(
				`https://massyart.com/ringsignal/inv/api_data?id=${item?.page_id}`
			);
			const data = await response.json();

			if (data?.all?.length > 0) {
				const userCountry = await getUserCountry();

				const processedSignals = data?.all?.map(signal => {
					const activeFromParsed = signal?.active_from
						? JSON.parse(signal?.active_from)
						: null;
					const rawTime = activeFromParsed?.ma?.time;

					const formattedTime = rawTime
						? moment
								?.tz(rawTime, moment?.tz?.guess())
								?.format('YYYY-MM-DD hh:mm A z')
						: 'N/A';

					const mappedTime =
						time_map[signal?.time] || `${signal?.time} seconds`;

					return {
						...signal,
						activeTime: formattedTime,
						userCountry,
						mappedTime
					};
				});

				setAllSignals(processedSignals);

				const relevantData = data?.all?.find(
					item => item?.page_id === item?.page_id
				);
				if (relevantData) {
					setDetailData(relevantData);
				} else {
					console.log('No matching item found');
					setError('No matching item found');
				}
			}

			const timeIntervals = ['5m', '15m', '30m', '1h', '4h', '5h', '1d', '1w'];

			const timeData = timeIntervals?.map(interval => ({
				time: interval,
				maBuy: data?.average?.ma?.buy?.[interval] || 0,
				maSell: data?.average?.ma?.sell?.[interval] || 0,
				maSignal: data?.average?.ma?.signal?.[interval] || 0,
				tecBuy: data?.average?.tec?.buy?.[interval] || 0,
				tecSell: data?.average?.tec?.sell?.[interval] || 0,
				tecSignal: data?.average?.tec?.signal?.[interval] || 0
			}));

			setTimeData(timeData);
		} catch (err) {
			console.error('Error fetching data:', err);
			setError(err?.message);
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	const activeFrom = updateTime => {
		if (updateTime) {
			const momentTime = moment(updateTime);
			const formattedTime = momentTime.format('hh:mm A');
			const formattedDate = momentTime.format('YYYY-MM-DD');
			const timeZone = moment.tz.guess();
			const country = moment.tz(timeZone).format('z');

			return `${formattedDate} ${formattedTime} (${country})`;
		}
		return null;
	};

	const activeFromTime = activeFrom(detailData?.update_time);

	const fetchAdvanceReport = async () => {
		dispatch(setIsLoading(true));
		try {
			const response = await fetch(
				`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${item?.msg_id}`
				// `https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${msg_id}`
			);

			if (response?.ok) {
				const data = await response.json();
				console.log('data', data);

				const { summary, change_at } = data?.pp?.overall || {};

				console.log('Extracted Summary and Change At:', { summary, change_at });

				setAdvanceReportData({ summary, change_at });

				console.log('Fetched report:', { summary, change_at });
			} else {
				console.error('API call failed with status:', response?.status);
			}
		} catch (err) {
			console.error('Error fetching Advance Report:', err);
			setError(err?.message || 'An error occurred');
		} finally {
			dispatch(setIsLoading(false));
		}
	};

	// Call fetchAdvanceReport on component mount or when `item` changes

	// To check what's in advanceReportData after the fetch call
	console.log('Advance Report Data:', advanceReportData);
	console.log('Advance Report Data2:', detailData);

	console.log('msgId value:', item?.msg_id);

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
			<ViewIndicesRating
				price={item?.price}
				summaryChange={item?.summaryChange}
				summaryChangeP={item?.summaryChangeP}
				update_time={activeFromTime}
			/>

			<CustomScrollView>
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

				<AdvanceReport key={item?.msg_id} />
			</CustomScrollView>
		</CustomView>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({});
