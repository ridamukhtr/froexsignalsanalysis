// import packages
import { StyleSheet, Vibration, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
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

	const toggleCheckbox = (item, value) => {
		setSelectedTime(prevState => {
			const currentSelectedTimes = prevState[item?.symbol] || [];
			if (currentSelectedTimes.includes(value)) {
				return {
					...prevState,
					[item?.symbol]: currentSelectedTimes.filter(time => time !== value)
				};
			} else {
				return {
					...prevState,
					[item?.symbol]: [...currentSelectedTimes, value]
				};
			}
		});
	};

	const toggleSubscription = item => {
		setIsSubscribed(prevState => {
			return {
				...prevState,
				[item?.symbol]: !prevState[item?.symbol]
			};
		});
	};

	const toggleSound = () => {
		setIsSoundEnabled(prev => !prev);
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

	const toggleVibration = () => {
		setIsVibrationEnabled(prev => !prev);
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
					<CustomText style={{ color: COLORS.DANGER_RED }}>Favourite List Notification</CustomText>
					<CustomText style={{ color: COLORS.DANGER_RED }}>You will get alert only from your favorite list.</CustomText>
				</View>
				<View style={styles.container(footerColor)}>
					<View style={[styles.body(borderColor), globalStyles.container]}>
						<CustomText>{'Sound'}</CustomText>
						<Switch
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
								isSoundEnabled ? <Icon name="check" size={15} color={iconColor} /> : <Icon name="times" size={15} color={iconColor} />
							}
						/>
					</View>
					<View style={[styles.body(borderColor), globalStyles.container, { borderBottomWidth: 0 }]}>
						<CustomText>{'Vibration'}</CustomText>
						<Switch
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
								isVibrationEnabled ? <Icon name="check" size={15} color={iconColor} /> : <Icon name="times" size={15} color={iconColor} />
							}
						/>
					</View>
				</View>
				{data?.length > 0 ? (
					data?.map((item, index) => (
						<ViewNotification
							key={index}
							item={item}
							selectedTime={selectedTime[item?.symbol] || []}
							onToggleCheckbox={value => toggleCheckbox(item, value)}
							isSubscribed={isSubscribed[item?.symbol] || false}
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
	container: footerColor => ({
		marginBottom: 15,
		backgroundColor: footerColor,
		borderRadius: 10,
		elevation: 3,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.1,
		shadowRadius: 2
	}),
	body: borderColor => ({
		borderBottomColor: borderColor,
		borderBottomWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 15
	})
});
