// import packages
import { StyleSheet, Vibration, View } from 'react-native';
import Toast from 'react-native-toast-message';
import React, { useCallback, useEffect, useState } from 'react';
import messaging from "@react-native-firebase/messaging";
import { useFocusEffect } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Sound from 'react-native-sound';
// components
import ViewNotification from '../components/views/ViewNotification';
import CustomScrollView from '../components/customComponents/CustomScrollView';
import CustomText from '../components/customComponents/CustomText';
import CustomView from '../components/customComponents/CustomView';
// styling
import globalStyles from '../styles/global-styles';
import { COLORS } from '../styles/theme-styles';
// import hooks
import { useThemeManager } from '../lib/customHooks/useThemeManager';

const NotificationScreen = () => {
	const [data, setData] = useState([]);
	const [selectedTime, setSelectedTime] = useState({});
	const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
	const [isSoundEnabled, setIsSoundEnabled] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState({});

	const { dropdownColor, borderColor, footerColor, iconColor } = useThemeManager();

	useFocusEffect(
		useCallback(() => {
			const loadFavorites = async () => {
				try {
					const storedFavorites = await AsyncStorage?.getItem('favorites');
					const favourites = storedFavorites ? JSON.parse(storedFavorites) : [];
					setData(favourites);
				} catch (error) {
					console.error('Error loading favorites:', error);
				}
			};

			loadFavorites();
		}, [])
	);

	useEffect(() => {
		loadSelectedTimes();
		loadPreferences();
	}, []);

	const toggleCheckbox = async (item, value) => {
		setSelectedTime(prevState => {
			const currentSelectedTimes = prevState[item?.page_id] || [];
			let updatedTimes;

			if (currentSelectedTimes.includes(value)) {
				updatedTimes = currentSelectedTimes.filter(time => time !== value);
			} else {
				updatedTimes = [...currentSelectedTimes, value];
			}
			const updatedSelectedTimes = {
				...prevState,
				[item?.page_id]: updatedTimes,
			};
			AsyncStorage.setItem('selectedTimes', JSON.stringify(updatedSelectedTimes));

			return updatedSelectedTimes;
		});
	};

	const toggleSubscription = async (item) => {
		const pageId = item?.page_id;
		console.log("page", pageId);
		console.log("page", item.msg_id);

		const symbol = item?.symbol || 'Unknown Symbol';
		const isCurrentlySubscribed = isSubscribed[pageId] || false;

		try {
			if (isCurrentlySubscribed) {
				await messaging().unsubscribeFromTopic(pageId);
				Toast.show({
					type: 'info',
					text1: 'Unsubscribed',
					text2: `You have unsubscribed from ${symbol}.`,
				});
			} else {
				await messaging().subscribeToTopic(pageId);
				Toast.show({
					type: 'success',
					text1: 'Subscribed',
					text2: `You have subscribed to ${symbol}.`,
				});
			}
			setIsSubscribed(prevState => ({
				...prevState,
				[pageId]: !isCurrentlySubscribed,
			}));

			const updatedSubscriptions = {
				...isSubscribed,
				[pageId]: !isCurrentlySubscribed,
			};
			await AsyncStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));

		} catch (error) {
			console.error('Error while subscribing/unsubscribing:', error);
		}
	};

	const loadSelectedTimes = async () => {
		try {
			const storedTimes = await AsyncStorage.getItem('selectedTimes');
			if (storedTimes) {
				setSelectedTime(JSON.parse(storedTimes));
			}
		} catch (error) {
			console.error('Error loading selected times:', error);
		}
	};

	const loadPreferences = async () => {
		try {
			const storedTimes = await AsyncStorage.getItem('selectedTimes');
			const soundPref = await AsyncStorage.getItem('soundEnabled');
			const vibrationPref = await AsyncStorage.getItem('vibrationEnabled');
			if (soundPref !== null) setIsSoundEnabled(JSON.parse(soundPref));
			if (vibrationPref !== null) setIsVibrationEnabled(JSON.parse(vibrationPref));
			if (storedTimes) {
				setSelectedTime(JSON.parse(storedTimes));
			}

			const storedSubscriptions = await AsyncStorage.getItem('subscriptions');
			if (storedSubscriptions) {
				setIsSubscribed(JSON.parse(storedSubscriptions));
			}
		} catch (error) {
			console.error('Error loading preferences:', error);
		}
	};

	const toggleSound = async () => {
		const newSoundState = !isSoundEnabled;
		setIsSoundEnabled(newSoundState);
		await AsyncStorage.setItem('soundEnabled', JSON.stringify(newSoundState));
		if (!isSoundEnabled) {
			sound.play(success => {
				if (!success) {
					console.log('Sound playback failed');
				}
			});
		}
	};

	const sound = new Sound(require('../../assets/sound.mp3'), error => {
		if (error) {
			console.log('Failed to load the sound', error);
			return;
		}
	});

	const toggleVibration = async () => {
		const newVibrationState = !isVibrationEnabled;
		setIsVibrationEnabled(newVibrationState);
		await AsyncStorage.setItem('vibrationEnabled', JSON.stringify(newVibrationState));
		if (!isVibrationEnabled) {
			Vibration.vibrate(500);
		} else {
			Vibration.cancel();
		}
	};

	return (
		<CustomView showBackIcon title={'Notifications'}>
			<CustomScrollView>
				<View style={[globalStyles.alert, { marginBottom: 10 }]}>
					<CustomText style={{ color: COLORS.INFO_BLUE }}>Favourite List Notification</CustomText>
					<CustomText style={{ color: COLORS.INFO_BLUE }}>You will get alert only from your favorite list.</CustomText>
				</View>
				<View style={styles.container(footerColor)}>
					<View style={[styles.body(borderColor), globalStyles.container]}>
						<CustomText>{'Sound'}</CustomText>
						{/* <Switch
							value={isSoundEnabled}
							onValueChange={toggleSound}
							activeText={''}
							inActiveText={''}
							circleSize={20}
							barHeight={25}
							circleBorderWidth={0}
							switchWidthMultiplier={2.5}
							backgroundActive={dropdownColor}
							backgroundInactive={dropdownColor}
							innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
							renderInsideCircle={() =>
								isSoundEnabled ? <Icon name="check" size={15} color={COLORS.GREEN} /> : <Icon name="times" size={15} color={iconColor} />
							}
						/> */}

						<ToggleSwitch
							isOn={isSoundEnabled}
							onColor={dropdownColor}
							offColor={dropdownColor}
							size="medium"
							thumbOnStyle={{ backgroundColor: COLORS.GREEN }}
							thumbOffStyle={{ backgroundColor: COLORS.OFF_RED }}
							onToggle={toggleSound}
						/>
					</View>
					<View style={[styles.body(borderColor), globalStyles.container, { borderBottomWidth: 0 }]}>
						<CustomText>{'Vibration'}</CustomText>
						{/* <Switch
							value={isVibrationEnabled}
							onValueChange={toggleVibration}
							activeText={''}
							inActiveText={''}
							circleSize={20}
							barHeight={25}
							circleBorderWidth={0}
							switchWidthMultiplier={2.5}
							backgroundActive={dropdownColor}
							backgroundInactive={dropdownColor}
							innerCircleStyle={{ alignItems: 'center', justifyContent: 'center' }}
							renderInsideCircle={() =>
								isVibrationEnabled ? <Icon name="check" size={15} color={COLORS.GREEN} /> : <Icon name="times" size={15} color={iconColor} />
							}
						/> */}

						<ToggleSwitch
							isOn={isVibrationEnabled}
							onColor={dropdownColor}
							offColor={dropdownColor}
							size="medium"
							thumbOnStyle={{ backgroundColor: COLORS.GREEN }}
							thumbOffStyle={{ backgroundColor: COLORS.OFF_RED }}
							onToggle={toggleVibration}
						/>
					</View>
				</View>
				<Toast
					position="top"
					visibilityTime={3000}
					autoHide
					topOffset={20}
					style={{ backgroundColor: 'white', borderRadius: 8 }}
				/>
				{data?.length > 0 ? (
					data?.map((item, index) => (
						<ViewNotification
							key={item?.page_id}
							item={item}
							selectedTime={selectedTime[item?.page_id] || []}
							onToggleCheckbox={(value) => toggleCheckbox(item, value)}
							isSubscribed={isSubscribed[item?.page_id] || false}
							onToggleSubscription={() => toggleSubscription(item)}
						/>

					))
				) : (
					<CustomText>
						Your favorite list is empty. You can only get notification alert from your fav list. To add currency/stock in your fav list,
						click on "Star" ⭐ icon, that show on main screen before currency/stock name
					</CustomText>
				)}
			</CustomScrollView>
		</CustomView>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: (footerColor) => ({
		marginBottom: 15,
		backgroundColor: footerColor,
		borderRadius: 10,
		elevation: 3,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	}),
	body: (borderColor) => ({
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 15
	})
});
