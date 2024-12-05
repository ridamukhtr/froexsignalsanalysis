import { StyleSheet, Text, } from 'react-native'
import React from 'react'
import globalStyles from '../../styles/global-styles'

const CustomText = ({ children, onPress, numberOfLines, style }) => {
    return (
        <Text onPress={onPress} style={[globalStyles.defaultTxt, style]} numberOfLines={numberOfLines}>
            {children}

        </Text>
    )
}

export default CustomText

const styles = StyleSheet.create({})