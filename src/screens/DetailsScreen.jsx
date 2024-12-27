//  import packages
import { StyleSheet, View } from 'react-native';
import React from 'react';
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

const DetailsScreen = ({ itemId }) => {
	const navigation = useNavigation();

	const fnNavigateToDetails = () => navigation.navigate(ROUTES?.screenChart);

	const route = useRoute();
	const { item } = route?.params;

	const { bgColor, textColor } = useThemeManager();
	const { advanceReportData, allSignals, detailData, onRefresh, refreshing, timeData, activeFromTime } = useDetailsScreen(item);

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

						<AdvanceReport key={item?.msg_id} />
					</CustomScrollView>
				</>
			)}
		</CustomView>
	);
};

export default DetailsScreen;

const styles = StyleSheet.create({});
