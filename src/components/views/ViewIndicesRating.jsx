// import packages
import React from 'react';
import moment from 'moment-timezone';
import { StyleSheet, View } from 'react-native';
import Arrow from 'react-native-vector-icons/FontAwesome5';
// import styling
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomText from '../customComponents/CustomText';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const ViewIndicesRating = ({ price, summaryChange, summaryChangeP, update_time, ago }) => {

	const { textColor } = useThemeManager();

	const localTime = moment(update_time, 'YYYY-MM-DD').local().format('YYYY-MM-DD hh:mm A');
	const timezone = moment.tz.guess();
	const timezoneAbbr = moment.tz(timezone).zoneAbbr();

	const getMaSummaryColor = summaryChange => {
		const numericValue = parseFloat(summaryChange);
		if (!isNaN(numericValue)) {
			return numericValue > 0 ? COLORS.GREEN : COLORS.RED;
		}
		return textColor;
	};

	const maSummaryColor = getMaSummaryColor(summaryChangeP);

	return (
		<View>
			<View style={styles.colorContainer} >
				<CustomText style={{ fontSize: 30, lineHeight: 30, fontWeight: "bold" }}>{`$${price}`}</CustomText>
				<View style={[styles.colorContainer, { gap: 3 }]}>
					<CustomText style={[globalStyles.titleText, { color: maSummaryColor, paddingBottom: 6, }]}>{summaryChange}{`(${summaryChangeP}%)`}</CustomText>
					{maSummaryColor === COLORS.RED && <Arrow name="sort-down" size={15} color={COLORS.RED} style={{ marginTop: -7 }} />}
					{maSummaryColor === COLORS.GREEN && <Arrow name="sort-up" size={15} color={COLORS.GREEN} style={{}} />}
				</View>
			</View>
			<CustomText style={{ fontSize: 12, lineHeight: 12, }}>{localTime} {timezoneAbbr}</CustomText>
			<CustomText style={{ fontSize: 12, lineHeight: 12, }}>{ago}</CustomText>
		</View>
	);
};

export default ViewIndicesRating;

const styles = StyleSheet.create({
	titleText: { fontSize: 25, lineHeight: 40, fontWeight: '600' },
	colorContainer: { flexDirection: "row", alignItems: "center", gap: 7 },
	boxContent: { alignItems: 'center', flexDirection: 'row', gap: 20 }
});
