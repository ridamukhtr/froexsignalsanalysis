// import { StyleSheet, View } from 'react-native';
// import React from 'react';
// import { COLORS } from '../../styles/theme-styles';
// import CustomText from '../customComponents/CustomText';
// import globalStyles from '../../styles/global-styles';

// const TechnicalIndicatorView = ({ indicators }) => {

//   return (
//     <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
//       {indicators?.map((indicator, index) => (
//         <View key={index}  >

//           {index === 0 && (
//             <View style={{ flexDirection: "row", alignItems: "center", width: "100%", }} >
//               <View style={styles.column}>
//                 <CustomText style={[globalStyles.titleText, { left: 5 }]}>{"Name"}</CustomText>
//               </View>

//               <View style={styles.column}>
//                 <CustomText style={[globalStyles.titleText, { left: 5 }]}>{"Value"}</CustomText>
//               </View>

//               <View style={styles.column}>
//                 <CustomText style={[globalStyles.titleText, { left: 5 }]}>{"Action"}</CustomText>
//               </View>
//             </View>
//           )}

//           <View style={{ width: '100%', flexDirection: "row", alignItems: "center", marginVertical: 5 }}>
//             <View style={[styles.cell, styles.leftCell]}>
//               <CustomText style={globalStyles.text}>{indicator?.name}</CustomText>
//             </View>
//             <View style={styles.cell}>
//               <CustomText style={globalStyles.text}>{indicator?.value}</CustomText>
//             </View>
//             <View style={[styles.cell, styles.rightCell]}>
//               <CustomText style={globalStyles.text}>{indicator?.action}</CustomText>
//             </View>
//           </View>

//         </View>
//       ))}
//     </View>
//   );
// };

// export default TechnicalIndicatorView;

// const styles = StyleSheet.create({
//   column: {
//     width: "33%",
//     gap: 3,
//   },
//   cell: {
//     width: "33%",
//     paddingVertical: 5,
//     borderColor: COLORS.GREY,
//     borderLeftWidth: 1,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     paddingHorizontal: 12,
//     // paddingVertical: 7,
//   },
//   leftCell: {
//     borderTopLeftRadius: 5,
//     borderBottomLeftRadius: 5,
//   },
//   rightCell: {
//     borderRightWidth: 1,
//     borderTopRightRadius: 5,
//     borderBottomRightRadius: 5,
//   },
// });


import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../styles/theme-styles';
import CustomText from '../customComponents/CustomText';
import globalStyles from '../../styles/global-styles';
import { useCommonFunctions } from '../../lib/customHooks/useCommonFunctions';

const TechnicalIndicatorView = ({ indicators }) => {

  const { getMaSummaryColor } = useCommonFunctions();

  return (
    <View style={{ paddingTop: 10, borderColor: COLORS.GREY, borderWidth: 1, margin: 10, borderRadius: 5 }}>
      {indicators?.map((indicator, index) => (
        <View key={index}>

          {/* Render the headings only for the first row */}
          {index === 0 && (
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", borderBottomColor: COLORS.GREY, borderBottomWidth: 1 }}>
              <View style={[styles.column]}>
                <CustomText style={[globalStyles.titleText, {}]}>{"Name"}</CustomText>
              </View>

              <View style={styles.column}>
                <CustomText style={[globalStyles.titleText, {}]}>{"Value"}</CustomText>
              </View>

              <View style={styles.column}>
                <CustomText style={[globalStyles.titleText, {}]}>{"Action"}</CustomText>
              </View>
            </View>
          )}

          {/* Wrap the name, value, and action in a single bordered container */}
          <View style={[styles.rowContainer, { borderBottomWidth: index !== indicators.length - 1 ? 1 : 0 }]}>
            <View style={[styles.cell, styles.leftCell]}>
              <CustomText style={globalStyles.text}>{indicator?.name}</CustomText>
            </View>
            <View style={styles.cell}>
              <CustomText style={globalStyles.text}>{indicator?.value}</CustomText>
            </View>
            <View style={[styles.cell, styles.rightCell]}>
              <CustomText style={[globalStyles.text, { color: getMaSummaryColor(indicator?.action) }]}>{indicator?.action}</CustomText>
            </View>
          </View>

        </View>
      ))}
    </View>
  );
};

export default TechnicalIndicatorView;

const styles = StyleSheet.create({
  column: {
    width: "33%",
    paddingHorizontal: 10
  },
  cell: {
    width: "33.3%",
    paddingVertical: 5,
    borderRightColor: COLORS.GREY,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY,
    // borderLeftWidth: 1,
    paddingHorizontal: 12,
  },
  leftCell: {
    // borderTopLeftRadius: 5,
    // borderBottomLeftRadius: 5,
  },
  rightCell: {
    // borderRightWidth: 1,
    // borderTopRightRadius: 5,
    // borderBottomRightRadius: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    // borderColor: COLORS.GREY,
    // borderTopWidth: 1,
    // borderTopRightRadius: 5,
    // borderTopBottomtRadius: 5
  },
});
