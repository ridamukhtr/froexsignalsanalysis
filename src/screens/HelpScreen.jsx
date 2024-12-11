import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
import CustomDropdown from '../components/customComponents/CustomDropdown'
import Theme from 'react-native-vector-icons/MaterialCommunityIcons'
import useThemeManager from '../lib/customHooks/useThemeManager'
import CustomText from '../components/customComponents/CustomText'

const HelpScreen = () => {

    const items = [
        { label: 'Dark', },
        { label: 'Light', },
    ];

    
    const { currentTheme,textColor, fnToggleTheme } = useThemeManager()

    const fnThemeChange = (selectedTheme) => {
        if (currentTheme !== selectedTheme.toLowerCase()) {
            fnToggleTheme(); // Toggle the theme
        }
    };

    
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }} >

            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 15 }} >

                <Theme name={"theme-light-dark"} size={30} color={textColor} />
                <CustomText>Themes</CustomText>
            </View>
            <CustomTouchableOpacity>
                <CustomDropdown item={items} activeTheme={currentTheme === 'dark' ? 'Dark' : 'Light'} onPress={fnThemeChange} />
            </CustomTouchableOpacity>
        </View>
    )
}

export default HelpScreen

const styles = StyleSheet.create({})