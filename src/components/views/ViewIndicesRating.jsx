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

const ViewIndicesRating = ({ price, summaryChange, summaryChangeP, update_time }) => {
	const now = moment();
	const timeZone = moment.tz.guess();
	const currentTime = now.format('h:mm A');
	const currentDate = now.format('MM/DD/YYYY');
	const country = moment.tz(timeZone).format('z');

	const getTimeDifference = updateTime => {
		if (updateTime) {
			const cleanedTime = updateTime.replace(/\s\([A-Za-z]*\)$/, '');

			const updateMoment = moment(cleanedTime, 'YYYY-MM-DD hh:mm A');
			return updateMoment.fromNow();
		}
		return 'No update time available';
	};

	const timeDifference = getTimeDifference(update_time);

	const getMaSummaryColor = summaryChange => {
		const numericValue = parseFloat(summaryChange);
		if (!isNaN(numericValue)) {
			return numericValue > 0 ? COLORS.GREEN : COLORS.RED;
		}
		return COLORS.WHITE;
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
			<CustomText style={{ fontSize: 12, lineHeight: 12, }}>{timeDifference}</CustomText>
		</View>
		// <View style={{}}>
		// 	<View style={styles.colorContainer}>
		// 		<CustomText style={styles.titleText}>{`$ ${price}`}</CustomText>
		// 		<View style={{ flexDirection: 'row', marginRight: 10 }}>
		// 			{maSummaryColor === COLORS.RED && <Arrow name="sort-down" size={15} color={COLORS.RED} style={{ marginTop: -3 }} />}
		// 			{maSummaryColor === COLORS.GREEN && <Arrow name="sort-up" size={15} color={COLORS.GREEN} style={{ marginBottom: -5 }} />}

		//  <View style={{ flexDirection: 'row', }}> 
		// 	<CustomText style={[globalStyles.titleText, { color: maSummaryColor, }]}>{summaryChange}{`(${summaryChangeP}%)`}</CustomText>
		// </View>
		//  <CustomText style={[globalStyles.titleText, { color: maSummaryColor }]}>{`(${summaryChangeP}%)`} </CustomText> 
		//  </View> 

		// </View>
		// <CustomText style={{ fontSize: 12, lineHeight: 12, }}>{timeDifference}</CustomText>
		//  <View> 
		// {/* <View style={styles.boxContent}>
		// 				<CustomText style={[globalStyles.titleText, { fontSize: 14, }]}>{'Update Time :'}</CustomText>
		// 				<View>
		// 					<CustomText style={{ fontSize: 12, }}>{timeDifference}</CustomText>
		// 					<CustomText style={{ fontSize: 12, color: COLORS.WHITE }}>{update_time}</CustomText>
		// 				</View>
		// 			</View> */}
		// {/* <View style={styles.boxContent}>
		// 				<CustomText style={[globalStyles.titleText, { fontSize: 14, color: COLORS.WHITE }]}>{'Current Time :'}</CustomText>
		// 				<CustomText style={{ fontSize: 12, color: COLORS.WHITE }}>
		// 					{currentDate} {currentTime} {country}
		// 				</CustomText>
		// 			</View> */}
		// {/* </View> */ }
		// </View>
	);
};

export default ViewIndicesRating;

const styles = StyleSheet.create({
	titleText: { fontSize: 25, lineHeight: 40, fontWeight: '600' },
	colorContainer: { flexDirection: "row", alignItems: "center", gap: 7 },
	boxContent: { alignItems: 'center', flexDirection: 'row', gap: 20 }
});
