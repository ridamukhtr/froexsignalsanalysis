//  import packages
import { StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import Theme from 'react-native-vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
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
// import styles
import { COLORS, SCREEN_HEIGHT } from '../styles/theme-styles';
// import assets
import time_map from '../../assets/time_map';
// import hook
import useDetailsScreen from '../lib/customHooks/useDetailData';
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import { useFavManager } from '../lib/customHooks/useFavManager';
import SignalSummery from '../components/views/SignalSummery';
import globalStyles from '../styles/global-styles';

const DetailsScreen = ({ itemId }) => {

	const route = useRoute();
	const { item } = route?.params;
	const scrollViewRef = useRef();

	const [selectedTime, setSelectedTime] = useState(1800);

	const selectedTimeLabel = selectedTime && time_map[selectedTime] ? time_map[selectedTime] : 'Unknown Time';

	const { bgColor, textColor } = useThemeManager();
	const { favorites, fnShare, toggleFavorite } = useFavManager();
	const { update, ago, allSignals, detailData, refreshing, activeFromTime, advanceReportData, isSummaryLoading, onRefresh, }
		= useDetailsScreen(item, selectedTime);

	const onTabChange = (newTab) => {
		const selectedPeriod = Object?.keys(time_map)?.find(key => time_map[key] === newTab);
		if (selectedPeriod) {
			setSelectedTime(parseInt(selectedPeriod, 10));
		}
	};


	const RightView = () => {
		return (
			<View style={{ flexDirection: "row", alignItems: "center", gap: 15 }} >
				<CustomTouchableOpacity onPress={() => toggleFavorite(item)}>
					{favorites?.find((fav) => fav?.page_id == item?.page_id) ? (
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

	const firstSignalUpdateTime = allSignals?.find(signal => signal?.ago !== "1 hour");

	return (
		<CustomView showBackIcon title={item?.symbol} right={<RightView />}>
			{!detailData && !advanceReportData ? (
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
					/>
				}>
					<ViewIndicesRating
						price={item?.price}
						summaryChange={item?.summaryChange}
						summaryChangeP={item?.summaryChangeP}
						update_time={update}
						ago={ago}
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
						{firstSignalUpdateTime && (
							<View style={globalStyles.alert}>
								<CustomText style={{ color: COLORS.DANGER_RED }}>
									(From {firstSignalUpdateTime.ago}) means: Market in same direction from {firstSignalUpdateTime.ago}. When new sell signal generated
								</CustomText>
							</View>
						)}
					</View>

					<AdvanceReport advanceDetail={advanceReportData} info={advanceReportData?.info} onTabChange={onTabChange} selectedTime={selectedTime} isLoading={isSummaryLoading} />

					<View style={{ minHeight: SCREEN_HEIGHT - 55, flex: 1, }}>
						{isSummaryLoading ? (
							<View style={{ paddingVertical: 20, }}>
								<Loader animationStyle={{ width: 50, height: 50 }} />
							</View>
						) : (
							<>
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Pivot Points (${selectedTimeLabel})`}</CustomText>
								<ViewIndicesDetails pivotData={advanceReportData?.pivot_point} />
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Technical Indicators (${selectedTimeLabel}) `}</CustomText>
								<TechnicalIndicatorView indicators={advanceReportData?.indicators} />
								<CustomText style={{ fontWeight: "bold", paddingTop: 15 }} >  {`Moving Averages (${selectedTimeLabel}) `}</CustomText>
								<MovingAverageView emaData={advanceReportData?.emaData} smaData={advanceReportData?.smaData} />
							</>
						)}
					</View>
				</CustomScrollView>

			)
			}
		</CustomView >
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({
	btnContainer: { alignItems: 'center', paddingVertical: 10, borderBottomRightRadius: 3, borderBottomLeftRadius: 3, },

});
