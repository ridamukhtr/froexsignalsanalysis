import { StyleSheet } from "react-native"
import { COLORS } from "./theme-styles";

const globalStyles = StyleSheet.create({
    screenHeadingTxt: { fontSize: 24, lineHeight: 30, color: COLORS.textColor, textAlign: 'center' },
    container: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    timeText: { fontSize: 15, fontWeight: '300', color: COLORS.GREY_TEXT },
    titleText: { fontSize: 13, fontWeight: 'bold', lineHeight: 25 },
    screenDescTxt: { textAlign: 'center' },
    defaultTxt: { fontSize: 14, lineHeight: 20, color: COLORS.WHITE, },
    cardContainer: { borderRadius: 10, borderColor: COLORS.GREY, borderWidth: 1, paddingVertical: 15, paddingHorizontal: 10, position: 'relative', },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.SEARCH_BLUE,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginLeft: 10,
        flex: 1,
    },
    searchInput: {
        flex: 1,
        color: COLORS.WHITE,
        fontSize: 16,
    },

});

export default globalStyles;