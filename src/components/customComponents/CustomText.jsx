import { StyleSheet, Text, } from 'react-native'
import React from 'react'
import globalStyles, { FONTS } from '../../styles/global-styles'
import useThemeManager from '../../lib/customHooks/useThemeManager'
import { COLORS } from '../../styles/theme-styles'

const CustomText = ({ children, onPress, numberOfLines, style, ellipsizeMode }) => {

    const { textColor } = useThemeManager();
    return (
        <Text onPress={onPress} style={[styles.defaultTxt(textColor), style]} numberOfLines={numberOfLines} ellipsizeMode="tail">
            {children}

        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    defaultTxt: (textColor) => ({ fontSize: 16, lineHeight: 20, color: textColor,  }),

})