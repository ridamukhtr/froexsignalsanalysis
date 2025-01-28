//  import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../customComponents/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';
import CheckBox from '@react-native-community/checkbox';
// import style
import globalStyles from '../../styles/global-styles';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import { COLORS } from '../../styles/theme-styles';

const timeOptions = [
	{ label: '5m', value: '5m' },
	{ label: '15m', value: '15m' },
	{ label: '30m', value: '30m' },
	{ label: '1h', value: '1h' },
	{ label: '4h', value: '4h' },
	{ label: '9h', value: '9h' },
	{ label: '1d', value: '1d' },
	{ label: '1w', value: '1w' }
];
const ViewNotification = ({ item, selectedTime, onToggleCheckbox, isSubscribed, onToggleSubscription }) => {
	const { dropdownColor, iconColor } = useThemeManager();
	return (
		<View>
			<View style={globalStyles.container}>
				<CustomText style={{ left: 5 }}>{item?.symbol}</CustomText>
				<Switch
					value={isSubscribed}
					onValueChange={() => onToggleSubscription(item)}
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
						isSubscribed ? <Icon name="check" size={15} color={COLORS.GREEN} /> : <Icon name="times" size={15} color={iconColor} />
					}
				/>
			</View>

			<View style={styles.checkboxContainer}>
				{timeOptions.map(option => (
					<View key={option.value} style={styles.checkboxItem}>
						<CheckBox
							disabled={!isSubscribed}
							value={selectedTime.includes(option.value)}
							onValueChange={() => onToggleCheckbox(option.value)}
							tintColors={{ true: dropdownColor, false: dropdownColor }}
							style={styles.checkbox}
							onCheckColor={dropdownColor}
						/>
						<CustomText style={{ fontSize: 14 }}>{option.label}</CustomText>
					</View>
				))}
			</View>
		</View>
	);
};

export default ViewNotification;

const styles = StyleSheet.create({
	checkboxContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginVertical: 8
	},
	checkboxItem: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '22%',
		marginBottom: 8
	}
});
