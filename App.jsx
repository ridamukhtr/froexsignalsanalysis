import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigators/AppNavigator'

const App = () => {
  return (
    <View style={{flex:1}} >
      <AppNavigator />
    </View>
  )
}

export default App

const styles = StyleSheet.create({})