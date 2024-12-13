import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomView from '../components/customComponents/CustomView'
import CustomSearchField from '../components/customComponents/CustomSearchField'

const HistoryScreen = () => {
    return (
        <CustomView right={<CustomSearchField />}>
            <Text>HistoryScreen</Text>
        </CustomView>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({})