import { StatusBar } from 'react-native'
import React from 'react'
import { COLORS } from './theme-styles'
import { useThemeManager } from '../lib/customHooks/useThemeManager'

const Statusbar = () => {

  const { textColor, bgColor } = useThemeManager();


  return (
    <StatusBar
      barStyle={textColor === COLORS.WHITE ? 'light-content' : 'dark-content'}
      backgroundColor={bgColor}
      translucent={true}
    />
  )
}

export default Statusbar