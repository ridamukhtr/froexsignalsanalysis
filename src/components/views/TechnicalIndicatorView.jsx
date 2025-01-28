// import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
// import styling
import globalStyles from '../../styles/global-styles';
// import component
import CustomText from '../customComponents/CustomText';
// import hooks
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const TechnicalIndicatorView = ({ indicators }) => {

  const { textColor, borderColor } = useThemeManager();
  const { getMaSummaryColor } = useCommonFunctions();

  if (!indicators || indicators.length === 0) {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText>No Indicators Data Available</CustomText>
      </View>
    );
  }

  return (
    <View style={[globalStyles.boxContainer, { borderColor: borderColor, }]}>
      {indicators?.map((indicator, index) => (
        <View key={index}>

          {index === 0 && (
            <View style={[globalStyles.rowContainer, { borderBottomColor: borderColor }]}>
              <View style={[globalStyles.column]}>
                <CustomText style={[globalStyles.titleText, { fontSize: 11, }]}>{"Name"}</CustomText>
              </View>

              <View style={globalStyles.column}>
                <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>{"Value"}</CustomText>
              </View>

              <View style={globalStyles.column}>
                <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>{"Action"}</CustomText>
              </View>
            </View>
          )}

          <View style={[globalStyles.rowContainer, { borderBottomColor: borderColor }]}>
            <View style={globalStyles.cell}>
              <CustomText style={[globalStyles.titleText, {
                fontSize: 11, flexgrow: 1
              }]}>{indicator?.name}</CustomText>
            </View>
            <View style={globalStyles.cell}>
              <CustomText style={globalStyles.text}>{Number(indicator?.value).toFixed(2)}</CustomText>
            </View>
            <View style={globalStyles.cell}>
              <CustomText
                style={[globalStyles.text, { color: getMaSummaryColor(indicator?.action, textColor) },]}
              >{indicator?.action}</CustomText>
            </View>
          </View>

        </View>
      ))}
    </View>
  );
};

export default TechnicalIndicatorView;

const styles = StyleSheet.create({});
