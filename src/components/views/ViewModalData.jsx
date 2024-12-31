// import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Arrow from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Fontisto';
// import styling
import { COLORS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// import components
import CustomText from '../customComponents/CustomText';
// import hooks
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';

const ViewModalData = ({ title, timeData }) => {
	const { getMaSummaryColor } = useCommonFunctions();

	return (
		<View style={{ marginVertical: 15 }}>
			<View style={{ marginVertical: 10 }}>
				<CustomText style={[globalStyles.titleText, { fontSize: 16 }]}>{title}</CustomText>
			</View>

			<View>
				<View style={styles.headerRow}>
					<View style={styles.timeColumn}>
						<CustomText style={[globalStyles.titleText, { fontSize: 14 }]}>Time</CustomText>
					</View>
					<View style={styles.valueColumn}>
						<CustomText style={[globalStyles.titleText, { fontSize: 14 }]}>Buy</CustomText>
					</View>
					<View style={styles.valueColumn}>
						<CustomText style={[globalStyles.titleText, { fontSize: 14 }]}>Sell</CustomText>
					</View>
					<View style={styles.signalColumn}>
						<CustomText style={[globalStyles.titleText, { fontSize: 14 }]}>Summary</CustomText>
					</View>
				</View>

				{timeData?.map((item, index) => {
					const buyValue = item?.maBuy || item?.tecBuy || 0;
					const sellValue = item?.maSell || item?.tecSell || 0;
					const signalValue = item?.maSignal || item?.tecSignal || 'no data';

					const maSummaryColor = getMaSummaryColor(signalValue);

					return (
						<View key={index} style={styles.headerRow}>
							<View style={styles.timeColumn}>
								<CustomText>{item?.time}</CustomText>
							</View>

							<View style={styles.valueColumn}>
								<CustomText>
									{buyValue}
									{'%'}
								</CustomText>
							</View>
							<View style={styles.valueColumn}>
								<CustomText>
									{sellValue}
									{'%'}
								</CustomText>
							</View>

							<View style={[styles.valueColumn, { width: '20%' }]}>
								{maSummaryColor === COLORS.RED && <Arrow name="arrow-down" size={20} color={COLORS.RED} />}
								{maSummaryColor === COLORS.GREEN && <Arrow name="arrow-up" size={20} color={COLORS.GREEN} />}
								{maSummaryColor === COLORS.BLUE && <Icon name="arrow-h" size={20} color={COLORS.BLUE} />}
							</View>
						</View>
					);
				})}
			</View>
		</View>
	);
};

export default ViewModalData;

const styles = StyleSheet.create({
	headerRow: {
		flexDirection: 'row',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.GREY
	},
	timeColumn: { width: '30%', paddingLeft: 10 },
	valueColumn: { width: '20%', alignItems: 'center' }
});
