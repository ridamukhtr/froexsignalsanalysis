import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppNavigator from './src/navigators/AppNavigator'
import HomeScreen from './src/screens/HomeScreen'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <Provider store={store}>

      <View style={{ flex: 1 }} >
        <HomeScreen />
        {/* <AppNavigator /> */}
      </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})