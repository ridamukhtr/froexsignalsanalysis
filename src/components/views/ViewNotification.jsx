//  import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from '../customComponents/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Switch } from 'react-native-switch';
import CheckBox from '@react-native-community/checkbox';
// import style
import globalStyles from '../../styles/global-styles';
import { COLORS } from '../../styles/theme-styles';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import time_map from '../../../assets/time_map';

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
				{Object.entries(time_map).map(([value, label]) => (
					<View key={value} style={styles.checkboxItem}>
						<CheckBox
							disabled={!isSubscribed}
							value={selectedTime.includes(value)}
							onValueChange={() => onToggleCheckbox(value)}
							tintColors={{ true: dropdownColor, false: dropdownColor }}
							style={styles.checkbox}
							onCheckColor={dropdownColor}
						/>
						<CustomText style={{ fontSize: 14 }}>{label}</CustomText>
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
