import { ScrollView, StyleSheet,} from 'react-native'
import React from 'react'

const CustomScrollView = ({ children, keyboardShouldPersistTaps, scrollViewRef, contentContainerStyle, showsHorizontalScrollIndicator = false, showsVerticalScrollIndicator = false, style }) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps ?? 'always'}
      style={style}
      ref={scrollViewRef}
    >
      {children}
    </ScrollView>
  )
}

export default CustomScrollView

const styles = StyleSheet.create({})