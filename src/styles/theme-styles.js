import { Dimensions, Platform } from "react-native";

export const COLORS = {
    WHITE : "#FFFFFF",
    PRIMARY : "#1A152A",
    YELLOW : "#EBB337",
    BLACK:"#000000",
    RED : "#772733",
    LIGHT_RED:"#DE4C4C",
    GREY : "#374151",
    DIM : "#FAFAFA",
    DIM_GRAY:'#1E3A8A0D',
    LIGHT_GRAY:'#37415166',
    MED_GRAY:'#374151CC',
    PINK:'pink',
    GREY_TEXT:'#999999'
};

export const IS_IOS = Platform.OS === "ios";
export const IS_ANDROID = Platform.OS === "android";

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;