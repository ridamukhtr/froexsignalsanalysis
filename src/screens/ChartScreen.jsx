import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import { COLORS } from '../styles/theme-styles';
import HorizontalView from '../components/views/HorizontalView';
import CustomChart from '../components/customComponents/CustomChart';

const ChartScreen = () => {

    const tabs = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {

            Orientation.lockToLandscape();
        } else {

            Orientation.lockToPortrait();
        }
    }, [isFocused]);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.DARK_BG }}>
            <HorizontalView tabs={tabs} variant={"button"} />
            <CustomChart />
        </View>
    )
}

export default ChartScreen

const styles = StyleSheet.create({})