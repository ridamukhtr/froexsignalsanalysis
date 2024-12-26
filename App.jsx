// import packeges
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Provider, useSelector } from 'react-redux'
// import store
import { store } from './src/redux/store'
import { selectedIsLoading } from './src/redux/LoaderReducer'
// import navigator 
import AppNavigator from './src/navigators/AppNavigator'
//  import components
import { COLORS } from './src/styles/theme-styles'
import { Loader } from './src/components/loader/Loader'

const App = () => {
  // const appId = "ae8020dd-afb4-49c2-9ec5-a8003e99b36a"

  const LoaderView = () => {
    const isLoading = useSelector(state => Object?.values(state?.forexSignalapi?.queries)?.some((item) => item?.status === 'pending'));
    const loading = useSelector(selectedIsLoading);

    return (
      (loading || isLoading) &&
      < View style={{ opacity: 0.7, position: 'absolute', height: '100%', width: '100%' }}>
        <Loader />
      </View>
    )
  };

  return (
    <Provider store={store}>

      <View style={{ flex: 1, backgroundColor: COLORS.NAV_BLUE, }} >
        <AppNavigator />
      </View>
      <LoaderView />
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})