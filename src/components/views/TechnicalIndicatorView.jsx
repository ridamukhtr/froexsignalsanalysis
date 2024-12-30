import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../styles/theme-styles'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'

const TechnicalIndicatorView = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", paddingHorizontal: 10, }} >
      <View style={{ gap: 3, width: "33%" }} >
        <CustomText style={{ left: 5 }}>{"Name"}</CustomText>
        <View style={{ borderColor: COLORS.GREY, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, paddingHorizontal: 12, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, paddingVertical: 7 }} >
          <CustomText style={{ fontSize: 12 }} >{"STOCHRSI(14)"}</CustomText>
        </View>
      </View>
      <View style={{ gap: 3, width: "33%" }} >
        <CustomText style={{ left: 5 }}>{"Value"}</CustomText>
        <View style={{ borderColor: COLORS.GREY, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, paddingHorizontal: 12, paddingVertical: 7 }} >
          <CustomText>{"1.843877"}</CustomText>
        </View>
      </View>
      <View style={{ gap: 3, width: "33%" }} >
        <CustomText style={{ left: 5 }}>{"Action"}</CustomText>
        <View style={{ borderColor: COLORS.GREY, borderLeftWidth: 1, borderTopWidth: 1, borderBottomWidth: 1, borderRightWidth: 1, paddingHorizontal: 12, paddingVertical: 7 }} >
          <CustomText>{"1.843877"}</CustomText>
        </View>
      </View>
    </View>
  )
}

export default TechnicalIndicatorView

const styles = StyleSheet.create({})