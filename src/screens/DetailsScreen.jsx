//  import packages
import { StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import Theme from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useRef, useState } from 'react';
import Favourite from 'react-native-vector-icons/MaterialIcons';
import { useRoute } from '@react-navigation/native';
//  import components
import CustomView from '../components/customComponents/CustomView';
import ViewIndicesRating from '../components/views/ViewIndicesRating';
import ViewIndicesDetails from '../components/views/ViewIndicesDetails';
import TechnicalIndicatorView from '../components/views/TechnicalIndicatorView';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
import CustomScrollView from '../components/customComponents/CustomScrollView';
import CustomText from '../components/customComponents/CustomText';
import MovingAverageView from '../components/views/MovingAverageView';
import AdvanceReport from '../components/views/AdvanceReport';
import { Loader } from '../components/loader/Loader';
import SignalSummery from '../components/views/SignalSummery';
// import styles
import { COLORS, SCREEN_HEIGHT } from '../styles/theme-styles';
import globalStyles from '../styles/global-styles';
// import assets
import time_map from '../../assets/time_map';
// import hook
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import { useFavManager } from '../lib/customHooks/useFavManager';
import { hideLoader, showLoader } from '../redux/LoaderReducer';

const DetailsScreen = () => {

	const route = useRoute();
	const { page_id, msg_id, time } = route?.params;
	const [data, setData] = useState(null);

	const scrollViewRef = useRef();
	const [selectedTime, setSelectedTime] = useState(3600);
	const [advanceReportData, setAdvanceReportData] = useState(null);
	const [isSummaryLoading, setIsSummaryLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const selectedTimeLabel = selectedTime && time_map[selectedTime] ? time_map[selectedTime] : 'Unknown Time';

	const { bgColor, textColor } = useThemeManager();
	const { favorites, fnShare, toggleFavorite } = useFavManager();
	useEffect(() => {
		fetchDetailData();
	}, [page_id])

	useEffect(() => {
		if (msg_id && selectedTime) {
			fetchAdvancedReport(selectedTime);
		}
	}, [msg_id, selectedTime]);

	const fetchDetailData = async () => {
		try {
			showLoader();
			const response = await fetch(`https://massyart.com/ringsignal/inv/api_data?id=${page_id}`);
			const result = await response.json();
			setData(result);
		} catch (err) {
			setError('Failed to fetch data');
		} finally {
			hideLoader();
		}
	};
	const { all, info } = data || {};

	const selectedData = data?.all?.find((item) => item?.time === time);

	const getMappedTime = (time) => {
		return time_map[time] || 'Unknown Time';
	};

	const firstSignalUpdateTime = all?.find((signal) => signal?.ago !== "1 hour");

	const fetchAdvancedReport = async (period) => {
		try {
			showLoader();
			setIsSummaryLoading(true);
			const response = await fetch(
				`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${msg_id}&period=${period}&type=1`
			);
			const result = await response.json();
			setAdvanceReportData(result);
		} catch (err) {
			console.error('Failed to fetch advanced report:', err);
		}
		finally {
			hideLoader();
			setIsSummaryLoading(false);
		}
	};
	const overallSummary = advanceReportData?.indicator?.overall;
	const pivotData = advanceReportData?.pp;
	const smaData = advanceReportData?.ma_avg?.ma_avg?.SMA || {};
	const emaData = advanceReportData?.ma_avg?.ma_avg?.EMA || {};

	const transformIndicators = (indicatorsData) => {
		if (!indicatorsData) return [];
		return Object.entries(indicatorsData).map(([key, value]) => ({
			name: key,
			value: parseFloat(value?.v || 0),
			action: value?.s || "Neutral",
		}));
	};
	const technicalIndicators = transformIndicators(advanceReportData?.indicator?.indicators);

	const onTabChange = (newTab) => {
		const selectedPeriod = Object.keys(time_map).find((key) => time_map[key] === newTab);
		if (selectedPeriod) {
			const newTime = parseInt(selectedPeriod, 10);
			setSelectedTime(newTime);
		}
	};

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchDetailData();
		if (msg_id && selectedTime) {
			await fetchAdvancedReport(selectedTime);
		}
		setRefreshing(false);
	};

	const getItem = () => {
		const item = {
			page_id: selectedData.page_id,
			symbol: selectedData.symbol,
			symbol2: selectedData.symbol2,
			price: selectedData.price,
			ma_summery: selectedData.ma_summery,
			summaryChange: selectedData.summaryChange,
			summaryChangeP: selectedData.summaryChangeP,
			technical: selectedData.technical,
			type: selectedData.type,
			msg_id: selectedData.msg_id,
			time: selectedData.time
		};
		return item;
	}

	const RightView = () => {
		return (
			<View style={{ flexDirection: "row", alignItems: "center", gap: 15 }} >
				<CustomTouchableOpacity onPress={() => toggleFavorite(getItem())}>
					{favorites?.find((fav) => fav?.page_id == page_id) ? (
						<Favourite name="star" size={20} color={textColor} />
					) : (
						<Favourite name="star-outline" color={textColor} size={20} />
					)}
				</CustomTouchableOpacity>
				<CustomTouchableOpacity onPress={fnShare}>
					<Theme name="share" size={20} color={textColor} />
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<CustomView showBackIcon title={all?.[0]?.symbol} right={<RightView />}>
			{!data && !advanceReportData ? (
				<Loader />
			) : (
				<CustomScrollView scrollViewRef={scrollViewRef} refreshControl={
					<RefreshControl
						onRefresh={onRefresh}
						progressViewOffset={10}
						colors={[textColor]}
						tintColor={textColor}
						progressBackgroundColor={bgColor}
						refreshing={refreshing}
						renderIndicator={() => <Loader />}
					/>}>
					<ViewIndicesRating
						price={selectedData?.price}
						summaryChange={selectedData?.summaryChange}
						summaryChangeP={selectedData?.summaryChangeP}
						update_time={info?.update}
						ago={info?.ago}
					/>
					<View style={{ marginVertical: 15 }}>
						<CustomText
							style={[
								globalStyles.titleText,
								{ fontSize: 16, paddingBottom: 10 }
							]}
						>
							{'Signal Summary'}
						</CustomText>

						<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", }}>
							<View style={{ width: "33.3%", }}>

								<CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
									{'Time Frame'}
								</CustomText>
							</View>
							<View style={{ width: "33.3%", }}>
								<CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
									{"Signal"}
								</CustomText>
							</View>
							<View style={{ width: "33.3%", }}>
								<CustomText style={[globalStyles.titleText, { fontSize: 15 }]}>
									{"Update"}
								</CustomText>
							</View>
						</View>
						{all?.map((signal, index) => (
							<SignalSummery
								key={index}
								symbol={signal?.symbol}
								maSummary={signal?.ma_summery}
								ago={signal?.ago}
								ma_summery={signal?.ma_summery}
								time={getMappedTime(signal?.time)}
							/>
						))}

						{firstSignalUpdateTime && (
							<View style={globalStyles.alert}>
								<CustomText style={{ color: COLORS.INFO_BLUE }}>
									(From {firstSignalUpdateTime.ago}) means: Market in same direction from {firstSignalUpdateTime.ago}. When new sell signal generated
								</CustomText>
							</View>
						)}
					</View>

					<AdvanceReport advanceDetail={overallSummary} info={advanceReportData?.info} onTabChange={onTabChange} selectedTime={selectedTime} isLoading={isSummaryLoading} />

					<View style={{ minHeight: SCREEN_HEIGHT - 55, flex: 1, }}>
						{isSummaryLoading ? (
							<View style={{ paddingVertical: 20, }}>
								<Loader animationStyle={{ width: 50, height: 50 }} />
							</View>
						) : (
							<>
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Pivot Points (${selectedTimeLabel})`}</CustomText>
								<ViewIndicesDetails pivotData={pivotData?.pivot_point} />
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Technical Indicators (${selectedTimeLabel}) `}</CustomText>
								<TechnicalIndicatorView indicators={technicalIndicators} />
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Moving Averages (${selectedTimeLabel}) `}</CustomText>
								<MovingAverageView emaData={emaData} smaData={smaData} />
							</>
						)}
					</View>
				</CustomScrollView>
			)}
		</CustomView >
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({
	btnContainer: { alignItems: 'center', paddingVertical: 10, borderBottomRightRadius: 3, borderBottomLeftRadius: 3, },

});
