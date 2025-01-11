// @import packages
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Search from 'react-native-vector-icons/Ionicons';
import Notification from 'react-native-vector-icons/MaterialCommunityIcons';
import Check from 'react-native-vector-icons/Ionicons';
// @import screens
import StockScreen from './StockScreen';
import ForexScreen from './ForexScreen';
import IndicesScreen from './IndicesScreen';
import ComoditiesScreen from './ComoditiesScreen';
import CryptoCurrencyScreen from './CryptoCurrencyScreen';
// @import components
import { Loader } from '../components/loader/Loader';
import HorizontalView from '../components/views/HorizontalView';
import CustomView from '../components/customComponents/CustomView';
import CustomText from '../components/customComponents/CustomText';
import CustomBottomSheet from '../components/customComponents/CustomBottomSheet';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
// @import hooks
import useActiveTab from '../lib/customHooks/useActiveTab';
import { useThemeManager } from '../lib/customHooks/useThemeManager';
// @import store
import { useGetMarketDataQuery } from '../redux/storeApis';
// @import assets
import time_map from '../../assets/time_map';
// import styling
import { COLORS } from '../styles/theme-styles';
import globalStyles from '../styles/global-styles';

const sortingOptions = [
	{ key: 'name', label: 'Name' },
	{ key: 'price', label: 'Price' },
	{ key: 'change%', label: 'Change%' },
	{ key: 'signal', label: 'Signal' },
];

const HomeScreen = () => {
	const tabs = ['Stocks', 'Forex', 'Indices', 'Crypto Currency', 'Commodities',];
	const [activeTime, setActiveTime] = useState('1800');
	const [activeSort, setActiveSort] = useState('price');
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
	const [bottomSheetType, setBottomSheetType] = useState('time');

	const { textColor, bgColor, dropdownColor, borderColor } = useThemeManager();
	const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');

	const { data, isLoading, refetch: setIsRefreshing, isFetching } = useGetMarketDataQuery({
		type: activeScreen?.toLowerCase(),
		time: activeTime,
	});

	const isApiLoading = isLoading || isFetching;

	const onRefresh = () => {
		setIsRefreshing();
	};

	const refreshControlProps = {
		refreshing: isFetching,
		onRefresh: onRefresh,
		isRefreshing: isFetching,
	};

	const handleBottomSheetType = (type) => {
		setBottomSheetType(type);
		setBottomSheetVisible(true);
	};

	const handleTimeSelect = (selectedTime) => {
		setActiveTime(selectedTime);
		setBottomSheetVisible(false);
	};

	const handleSortSelect = (selectedSort) => {
		setActiveSort(selectedSort);
		setBottomSheetVisible(false);
	};

	const RightView = () => {
		return (
			<View style={globalStyles.gapContainer} >
				<CustomTouchableOpacity >
					<Notification name="bell-outline" size={20} color={textColor} />
				</CustomTouchableOpacity>
				<CustomTouchableOpacity >
					<Search name="search" color={textColor} size={20} />
				</CustomTouchableOpacity>
			</View>
		);
	};

	return (
		<>
			<CustomView right={<RightView />} >
				{isApiLoading ? (
					<Loader />
				) : (
					<>
						<HorizontalView
							useScrollView={true}
							variant="default"
							tabs={tabs}
							initialTab={activeScreen}
							onTabChange={(tab) => setActiveScreen(tab)}
						/>

						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
							<CustomTouchableOpacity
								style={[styles.activeBg, globalStyles.container, { backgroundColor: dropdownColor }]}
								onPress={() => handleBottomSheetType('time')}
							>
								<CustomText style={{ color: textColor }}>{time_map[activeTime]}</CustomText>
								<Icon name="chevron-down" size={20} color={textColor} style={{ marginRight: -3 }} />
							</CustomTouchableOpacity>

							<CustomTouchableOpacity
								style={[styles.activeBg, globalStyles.container, { backgroundColor: dropdownColor }]}
								onPress={() => handleBottomSheetType('sort')}
							>
								<CustomText style={{ color: textColor }}>
									{sortingOptions?.find((option) => option?.key === activeSort)?.label || 'Sort'}
								</CustomText>

								<Icon name="chevron-down" size={20} color={textColor} style={{ marginRight: -3 }} />
							</CustomTouchableOpacity>
						</View>


						{activeScreen === 'Stocks' && <StockScreen data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} />}
						{activeScreen === 'Crypto Currency' && <CryptoCurrencyScreen data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} />}
						{activeScreen === 'Forex' && <ForexScreen data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} />}
						{activeScreen === 'Commodities' && <ComoditiesScreen data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} />}
						{activeScreen === 'Indices' && <IndicesScreen data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} />}
					</>
				)}
			</CustomView>

			{isBottomSheetVisible && (
				<CustomBottomSheet
					isVisible={isBottomSheetVisible}
					onClose={() => setBottomSheetVisible(false)}
				>
					<View style={{ paddingTop: 20 }}>
						{bottomSheetType === 'time'
							? Object.entries(time_map).map(([key, label]) => (
								<CustomTouchableOpacity
									key={key}
									style={[
										styles.timeOption,
										{
											borderBottomColor: borderColor,
											backgroundColor: activeTime === key ? dropdownColor : 'transparent',
										},
									]}
									onPress={() => handleTimeSelect(key)}
								>
									<CustomText style={{ color: textColor }}>{label}</CustomText>
									{activeTime === key && <Check name="checkmark-circle" size={20} color={COLORS.CHECK_BLUE} />}
								</CustomTouchableOpacity>
							))
							: sortingOptions?.map(({ key, label }) => (
								<CustomTouchableOpacity
									key={key}
									style={[
										styles.timeOption,
										{
											borderBottomColor: borderColor,
											backgroundColor: activeSort === key ? dropdownColor : 'transparent',
										},
									]}
									onPress={() => handleSortSelect(key)}
								>
									<CustomText style={{ color: textColor }}>{label}</CustomText>
									{activeSort === key && <Check name="checkmark-circle" size={20} color={COLORS.CHECK_BLUE} />}
								</CustomTouchableOpacity>
							))}
					</View>
				</CustomBottomSheet>
			)}
		</>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	activeBg: {
		// gap: 5,
		alignSelf: 'flex-start',
		marginVertical: 5,
		paddingHorizontal: 7,
		paddingVertical: 5,
		borderRadius: 5,
	},
	timeOption: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 15,
		borderBottomWidth: 1,
	},
});
