import { StyleSheet } from 'react-native';
import { COLORS } from './theme-styles';

const globalStyles = StyleSheet.create({
	screenHeadingTxt: { fontSize: 24, lineHeight: 30, color: COLORS.textColor, textAlign: 'center' },
	container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	gapContainer: { flexDirection: "row", alignItems: "center", gap: 15 },
	timeText: { fontSize: 12, fontWeight: '400', },
	titleText: { fontSize: 13, fontWeight: 'bold', lineHeight: 25 },
	text: { fontSize: 11, },
	screenDescTxt: { textAlign: 'center' },
	boxContainer: { paddingTop: 10, borderWidth: 1, marginVertical: 10, borderRadius: 5 },
	cell: { flex: 1, paddingVertical: 5, paddingHorizontal: 12, },
	column: { flex: 1, paddingHorizontal: 10, },
	rowContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1 },
	defaultTxt: { fontSize: 14, lineHeight: 20, color: COLORS.WHITE },
	alert: { marginTop: 15, backgroundColor: COLORS.INFO_TEXT_BLUE, borderRadius: 5, padding: 7 },
	cardContainer: {
		borderRadius: 10,
		borderColor: COLORS.GREY,
		borderWidth: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
		position: 'relative'
	},
});

export default globalStyles;
