import { StyleSheet, } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Entypo'
import CustomTouchableOpacity from './CustomTouchableOpacity';
import CustomText from './CustomText';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import globalStyles from '../../styles/global-styles';

const CustomAccordion = ({ children, isCollapsed = false, onPress, titleStyle, title }) => {

  const { iconColor, dropdownColor } = useThemeManager();
  return (
    <>
      <CustomTouchableOpacity style={[styles.title, titleStyle, { backgroundColor: dropdownColor }]}
        onPress={onPress} activeOpacity={0.5}>
        <CustomText style={globalStyles.titleText}>{title}</CustomText>
        <Icon name={isCollapsed ? 'chevron-small-up' : 'chevron-small-down'} color={iconColor} size={20} />
      </CustomTouchableOpacity>
      {isCollapsed &&
        <Animatable.View key={isCollapsed} animation={'fadeInDown'} duration={300}>
          {children}
        </Animatable.View>
      }
    </>
  )
}

export default CustomAccordion

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    marginVertical: 6,
    paddingHorizontal: 10,
  },
})