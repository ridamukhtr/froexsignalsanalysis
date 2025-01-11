import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView'
import CustomText from '../components/customComponents/CustomText'
import CustomSearchField from '../components/customComponents/CustomSearchField'
import globalStyles from '../styles/global-styles'

const SeacrhScreen = () => {
  return (
    <CustomView isSearchView={true}  >
      <View style={[globalStyles.container, {}]}>
        <CustomText>SeacrhScreen</CustomText>
      </View>
    </CustomView>
  )
}

export default SeacrhScreen

const styles = StyleSheet.create({})