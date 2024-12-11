import { Dimensions, Platform } from "react-native";

export const COLORS = {
    WHITE : "#FFFFFF",
    PRIMARY : "#1A152A",
    YELLOW : "#EEBD54",
    BLACK:"#000000",
    RED : "#f73f46",
    DARK_BLUE:"#0E0B1A",
    NAV_BLUE:"#211C37",
    SEARCH_BLUE:"#312E43",
    LIGHT_RED:"#DE4C4C",
    GREY : "#374151",
    DIM : "#9d96b5",
    GREEN:"#0C9686",
    DIM_GRAY:'#1E3A8A0D',
    LIGHT_GRAY:'#37415166',
    MED_GRAY:'#d7d7dd',
    PINK:'pink',
    GREY_TEXT:'#999999'
};

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;