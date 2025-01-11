import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView'
import CustomText from '../components/customComponents/CustomText'
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity'
import { useThemeManager } from '../lib/customHooks/useThemeManager'
import CustomDropdown from '../components/customComponents/CustomDropdown'
import globalStyles from '../styles/global-styles'
import { changeTheme } from '../redux/themeReducer'
import { useDispatch } from 'react-redux'

const MoreScreen = () => {
  const dispatch = useDispatch();

  const { bgColor, textColor, currentTheme, } = useThemeManager();


  const items = [{ label: 'Dark' }, { label: 'Light' }];

  const fnThemeChange = (selectedTheme) => {
    const themeToSet = selectedTheme.toLowerCase();
    if (currentTheme !== themeToSet) {
      dispatch(changeTheme(themeToSet));
    }
  };
  return (
    <CustomView>
      <View style={[globalStyles.container, {}]}>
        <CustomText style={{ color: textColor }}>Themes</CustomText>
        <CustomTouchableOpacity>
          <CustomDropdown item={items} activeTheme={currentTheme === 'dark' ? 'Dark' : 'Light'} onPress={fnThemeChange} />
        </CustomTouchableOpacity>
      </View>
    </CustomView>
  )
}

export default MoreScreen

const styles = StyleSheet.create({})