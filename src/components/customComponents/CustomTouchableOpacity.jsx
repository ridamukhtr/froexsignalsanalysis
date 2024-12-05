import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomTouchableOpacity = ({ children, style, onPress, activeOpacity }) => {
    return (
        <>
            <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity ?? 0.7} style={style}>
                {children}
            </TouchableOpacity>
        </>
    );
}

export default CustomTouchableOpacity

const styles = StyleSheet.create({})