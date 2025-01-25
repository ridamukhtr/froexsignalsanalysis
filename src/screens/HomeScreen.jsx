// @import packages
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
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
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
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
import { ROUTES } from '../routes/RouteConstants';

const sortingOptions = [
	{ key: 'name', label: 'Name' },
	{ key: 'price', label: 'Price' },
	{ key: 'change%', label: '% Change' },
	{ key: 'signal', label: 'Signal' },
];

const HomeScreen = () => {
	const navigation = useNavigation();
	const tabs = ['Stocks', 'Forex', 'Indices', 'Crypto Currency', 'Commodities',];
	const [activeTime, setActiveTime] = useState('1800');
	const [activeSort, setActiveSort] = useState('price');
	const [sortOrder, setSortOrder] = useState('asc');
	const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
	const [bottomSheetType, setBottomSheetType] = useState('time');
	const [searchQuery, setSearchQuery] = useState('');

	const { textColor, dropdownColor, borderColor } = useThemeManager();
	const { activeTab: activeScreen, fnActiveTab: setActiveScreen } = useActiveTab('Stocks');

	const { data, isLoading, refetch: setIsRefreshing, isFetching } = useGetMarketDataQuery({
		type: activeScreen?.toLowerCase(),
		time: activeTime,
	},
		{
			refetchOnMountOrArgChange: true,
			refetchOnWindowFocus: false,
			cacheTime: 0,
		}
	);

	const isApiLoading = isLoading || isFetching;

	const onRefresh = () => {
		setIsRefreshing();
	};

	const refreshControlProps = {
		refreshing: isFetching,
		onRefresh: onRefresh,
		isRefreshing: isFetching,
	};

	const handleSearch = (query) => {
		setSearchQuery(query);
	};

	const handleBottomSheetType = (type) => {
		setBottomSheetType(type);
		setBottomSheetVisible(true);
	};

	const handleTimeSelect = (selectedTime) => {
		if (selectedTime === activeTime) {
			setIsRefreshing();
		} else {
			setActiveTime(selectedTime);
		}
		setBottomSheetVisible(false);
	};


	const handleSortSelect = (selectedSort) => {
		setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
		setActiveSort(selectedSort);
		setBottomSheetVisible(false);
	};

	useEffect(() => {
		const unsubscribeNotification = messaging().onMessage(async remoteMessage => {
			console.log('Foreground notification:', remoteMessage);

			const { title, message, topic } = remoteMessage.data;

			if (topic) {
				// Navigate to detail screen with topic
				navigation.navigate(ROUTES.screenDetails, { topic });
			} else {
				console.log('No topic found in notification');
			}

			PushNotification.localNotification({
				channelId: 'default-channel-id', // Ensure you have created this channel
				title: title || 'Notification',
				message: message || 'You have a new notification',
				priority: 'high',
			});
		});

		return () => unsubscribeNotification();
	}, []);

	const checkUserPermission = async () => {
		const enabled = await messaging().hasPermission();
		if (enabled !== -1) {
			getFcmToken();
		} else {
			requestUserPermission();
		}
	};

	const requestUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			getFcmToken();
		}
	};

	const getFcmToken = async () => {
		const fcmToken = await messaging().getToken();
		if (fcmToken) {
			console.log('Your Firebase Token is:', fcmToken);
		} else {
			console.log('Failed', 'No token received');
		}
	};


	return (
		<>
			<CustomView onSearch={handleSearch} >

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
				{isApiLoading ? (
					<Loader />
				) : (
					<>
						{activeScreen === 'Stocks' && <StockScreen data={data} searchQuery={searchQuery} refreshControlProps={refreshControlProps} activeSort={activeSort} sortOrder={sortOrder} />}
						{activeScreen === 'Crypto Currency' && <CryptoCurrencyScreen searchQuery={searchQuery} data={data} refreshControlProps={refreshControlProps} activeSort={activeSort} sortOrder={sortOrder} />}
						{activeScreen === 'Forex' && <ForexScreen data={data} searchQuery={searchQuery} refreshControlProps={refreshControlProps} activeSort={activeSort} sortOrder={sortOrder} />}
						{activeScreen === 'Commodities' && <ComoditiesScreen data={data} searchQuery={searchQuery} refreshControlProps={refreshControlProps} activeSort={activeSort} sortOrder={sortOrder} />}
						{activeScreen === 'Indices' && <IndicesScreen data={data} searchQuery={searchQuery} refreshControlProps={refreshControlProps} activeSort={activeSort} sortOrder={sortOrder} />}
					</>
				)}
			</CustomView >

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
											justifyContent: 'space-between',
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
									<CustomText style={{ color: textColor }}>{label} </CustomText>
									<Check
										name={"arrow-up-outline"}
										size={15}
										color={activeSort === key && sortOrder === 'asc' ? COLORS.CHECK_BLUE : COLORS.WHITE}
									/>
									<Check
										name={"arrow-down-outline"}
										size={15}
										color={activeSort === key && sortOrder === 'desc' ? COLORS.CHECK_BLUE : COLORS.WHITE}
									/>
								</CustomTouchableOpacity>
							))}
					</View>
				</CustomBottomSheet>
			)
			}
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
		padding: 15,
		borderBottomWidth: 1,
	},
});
