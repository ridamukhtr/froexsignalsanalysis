// import packages
import React from 'react';
import { StyleSheet, View } from 'react-native';
import globalStyles from '../../styles/global-styles';
// import components
import CustomText from '../customComponents/CustomText';
// import hooks
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const MovingAverageView = ({ emaData, smaData }) => {
  const { textColor, borderColor } = useThemeManager();
  const { getMaSummaryColor } = useCommonFunctions();


  const commonKeys = Object?.keys(emaData)?.filter((key) => key in smaData);

  if (!emaData || !smaData) {
    return (
      <View style={{ paddingHorizontal: 20 }}>
        <CustomText>No Data Available</CustomText>
      </View>
    );
  }
  return (
    <View style={[globalStyles.boxContainer, { borderColor: borderColor, }]}>
      <View style={[globalStyles.rowContainer, { borderBottomColor: borderColor }]}>
        <View style={[globalStyles.column]}>
          <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>Period</CustomText>
        </View>
        <View style={globalStyles.column}>
          <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>Simple</CustomText>
        </View>
        <View style={globalStyles.column}>
          <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>Exponential</CustomText>
        </View>
        <View style={globalStyles.column}>
          <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>Action</CustomText>
        </View>
      </View>

      {commonKeys?.map((key, index) => (
        <View key={index} style={[globalStyles.rowContainer, { borderBottomColor: borderColor }]}>
          <View style={globalStyles.cell}>
            <CustomText style={[globalStyles.titleText, { fontSize: 11 }]}>{key}</CustomText>
          </View>
          <View style={globalStyles.cell}>
            <CustomText style={globalStyles.text}>{Number(smaData[key]?.v).toFixed(2)}</CustomText>
          </View>
          <View style={globalStyles.cell}>
            <CustomText style={globalStyles.text}>{Number(emaData[key]?.v).toFixed(2)}</CustomText>
          </View>
          <View style={globalStyles.cell}>
            <CustomText
              style={[
                globalStyles.text,
                { color: getMaSummaryColor(emaData[key]?.s, textColor) },
              ]}
            >
              {emaData[key]?.s}
            </CustomText>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MovingAverageView;

const styles = StyleSheet.create({});
