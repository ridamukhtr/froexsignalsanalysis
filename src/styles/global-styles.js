import { StyleSheet } from "react-native"

export const FONTS = {
    bold : "Montserrat-Bold",
    semi_bold : "Montserrat-SemiBold",
    medium : "Montserrat-Medium",
    regular : "Montserrat-Regular",
}

const globalStyles = StyleSheet.create({
    screenHeadingTxt : { fontSize: 24, lineHeight: 30, color: COLORS.PRIMARY, fontFamily: FONTS.bold, textAlign: 'center' },
    screenDescTxt : { textAlign:'center' },
    defaultTxt : { fontSize: 16, lineHeight: 20, color: COLORS.GREY, fontFamily: FONTS.regular },
    authContentContainerStyle : {flexGrow: 1, alignItems:'center', gap: 36, paddingTop : SCREEN_HEIGHT > 700 ? '28%' : '18%', paddingBottom: SCREEN_HEIGHT > 700 ? '15%' : '8%'},
    authContentBox : {gap:12, width:'100%'},
    imgContainer:{gap:12, width:128, height:128, borderRadius:64,backgroundColor: COLORS.DIM_GRAY,justifyContent:"center", alignItems:"center" },
    cardContainer:{ borderRadius: 20, backgroundColor: COLORS.WHITE, borderColor: '#3741510D', borderWidth: 1,padding:20, width:"99%",  gap: 20, position:'relative', },

    shadowDefault:{
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
        elevation: 2,
    },
    shadowInput : {
        shadowColor: '#1E3A8A35',
        shadowOffset: {
          width: 0,
          height: 16,
        },
        shadowOpacity: 0.02,
        shadowRadius: 3.84,
        elevation: 5, 
    }
});

export default globalStyles;