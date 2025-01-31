// import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import components
import CustomText from '../customComponents/CustomText';
// import hooks
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
// import styling
import globalStyles from '../../styles/global-styles';
import time_map from '../../../assets/time_map';

const SignalSummery = ({ maSummary, time, ago, ma_summery, }) => {

	const { borderColor, textColor } = useThemeManager();
	const { getMaSummaryColor } = useCommonFunctions();

	const maSummaryColor = ma_summery ? getMaSummaryColor(ma_summery) : textColor;

	return (

		<View style={[styles.container, { borderColor: borderColor, }]}>
			<View style={styles.content}>
				<View style={{ width: "33.3%", }}>

					<CustomText style={globalStyles.titleText}>{time}</CustomText>
				</View>
				<View style={{ width: "33.3%", }}>

					<CustomText style={{ fontSize: 14, color: maSummaryColor }}>{maSummary || "no signal"}</CustomText>
				</View>
				<View style={{ width: "33.3%", }}>

					<CustomText style={{ fontSize: 14, textAlign: "left" }}>{ago || "no time"} {'ago'}</CustomText>
				</View>

			</View>
		</View>
	);
};

export default SignalSummery;

const styles = StyleSheet.create({
	container: { paddingVertical: 7, borderBottomWidth: 1, },
	content: { flexDirection: 'row', alignItems: 'center', }
});
