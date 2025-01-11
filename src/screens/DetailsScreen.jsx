//  import packages
import { StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import Theme from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
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
//  import route
import { ROUTES } from '../routes/RouteConstants';
// import styles
import { COLORS } from '../styles/theme-styles';
// import assets
import time_map from '../../assets/time_map';
// import hook
import useDetailsScreen from '../lib/customHooks/useDetailData';
import { useThemeManager } from '../lib/customHooks/useThemeManager';
import { useFavManager } from '../lib/customHooks/useFavManager';

const DetailsScreen = ({ itemId }) => {

	const route = useRoute();
	const { item } = route?.params;

	const [selectedTime, setSelectedTime] = useState(1800);

	const selectedTimeLabel = selectedTime && time_map[selectedTime] ? time_map[selectedTime] : 'Unknown Time';

	const { bgColor, textColor } = useThemeManager();
	const { favorites, fnShare, toggleFavorite } = useFavManager();
	const { detailData, refreshing, activeFromTime, advanceReportData, isSummaryLoading, onRefresh, }
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

	return (
		<CustomView showBackIcon title={item?.symbol} right={<RightView />}>
			{!detailData && !advanceReportData ? (
				<Loader />
			) : (
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
					<ViewIndicesRating
						price={item?.price}
						summaryChange={item?.summaryChange}
						summaryChangeP={item?.summaryChangeP}
						update_time={activeFromTime}
					/>

					<AdvanceReport advanceDetail={advanceReportData} info={advanceReportData?.info} onTabChange={onTabChange} selectedTime={selectedTime} isLoading={isSummaryLoading} />

					<View style={{}}>
						{isSummaryLoading ? (
							<View style={{ paddingVertical: 20 }}>
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
