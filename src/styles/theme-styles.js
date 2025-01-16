import { Dimensions, Platform } from "react-native";

export const COLORS = {
    //  dark color theme
    DARK_BG: "#0D1216",
    DARK_BORDER: "#1C2533",
    DARK_DROPDOWN: "#323546",
    DARK_FOOTER_BG: "#141B23",
    DARK_ICON: "#4f5268",
    //  light color theme
    LIGHT_BG: "#FCFDFF",
    LIGHT_BORDER: "#ECF2F0",
    LIGHT_DROPDOWN: "#EFF2F4",
    LIGHT_ICON: "#909bb2",
    // LIGHT_ICON: "#9fa6b5",

    // COMMON COLORS
    WHITE: "#E3E8EE",
    YELLOW: "#e2ad41",
    BLACK: "#424752",
    RED: "#E4372D",
    LIGHT_RED: "#F8D7DA",
    DIM_BG: 'rgba(0, 0, 0, 0.5)',

    PRIMARY: "#ffffff",
    SECONDARY: "#000",
    DARK_BLUE: "#0D1216",
    NAV_BLUE: "#211C37",
    SEARCH_BLUE: "#312E43",
    LIGHT_RED: "#F8D7DA",
    BLUE: "#06A9F2",
    CHECK_BLUE: "#445CF7",
    GREY: "#1C2533",
    DIM: "#9d96b5",
    GREEN: "#35C564",
    DIM_GRAY: '#1E3A8A0D',
    LIGHT_GRAY: '#37415166',
    MED_GRAY: '#d7d7dd',
    PINK: 'pink',
    GREY_TEXT: '#999999'
};

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;