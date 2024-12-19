import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import HorizontalView from './HorizontalView'
import { COLORS } from '../../styles/theme-styles'
import Icon from 'react-native-vector-icons/Entypo';
import Arrow from 'react-native-vector-icons/Fontisto';
import time_map from '../../../assets/time_map'

const ViewModalData = ({ title, maSell, maBuy, tiSell, tiBuy }) => {

    const summaryTab = [
        <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
        <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,
    ];

    return (
        <View>
            <View style={styles.container}>
                <CustomText style={styles.text}>{title}</CustomText>
            </View>

            <View style={{ gap: 10 }}>
                {/* Time Map */}
                <View style={styles.body}>
                    <View style={[styles.details, { paddingRight: 10 }]}>
                        <CustomText style={styles.text}>{"Signal"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        {/* <HorizontalView tabs /> */}
                    </View>
                </View>

                {/* Buy Data */}
                <View style={styles.body}>
                    <View style={styles.details}>
                        <CustomText style={styles.text}>{"Buy"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        <HorizontalView tabs={maBuy} />
                    </View>
                </View>

                {/* Sell Data */}
                <View style={styles.body}>
                    <View style={styles.details}>
                        <CustomText style={styles.text}>{"Sell"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        <HorizontalView tabs={maSell} />
                    </View>
                </View>

                {/* Summary */}
                <View style={styles.body}>
                    <View style={[styles.details, { paddingRight: 10 }]}>
                        <CustomText style={[styles.text, { fontSize: 12 }]}>{"Summary"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        <HorizontalView tabs={summaryTab} />
                    </View>
                </View>

                {/* Ti Buy and Ti Sell */}
                <View style={styles.body}>
                    <View style={styles.details}>
                        <CustomText style={styles.text}>{"Ti Buy"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        <HorizontalView tabs={tiBuy} />
                    </View>
                </View>
                
                <View style={styles.body}>
                    <View style={styles.details}>
                        <CustomText style={styles.text}>{"Ti Sell"}</CustomText>
                    </View>
                    <View style={styles.tab}>
                        <HorizontalView tabs={tiSell} />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ViewModalData;

const styles = StyleSheet.create({
    container: { alignItems: "center", marginVertical: 15 },
    text: { color: COLORS.WHITE, fontSize: 17, fontWeight: "bold" },
    body: { flexDirection: "row", alignItems: "center" },
    details: { paddingRight: 30, borderRightWidth: 1, borderRightColor: COLORS.WHITE },
    tab: { width: "85%", paddingHorizontal: 10 }
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import CustomText from '../customComponents/CustomText'
// import HorizontalView from './HorizontalView'
// import { COLORS } from '../../styles/theme-styles'
// import Icon from 'react-native-vector-icons/Entypo';
// import Arrow from 'react-native-vector-icons/Fontisto';
// import time_map from '../../../assets/time_map'

// const ViewModalData = ({ title, maSell, maBuy, tiSell, tiBuy }) => {

//     const summaryTab = [
//         <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,
//         <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
//         <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
//         <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
//         <Arrow name={"arrow-h"} size={17} color={COLORS.GREEN} />,
//         <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
//         <Icon name={"arrow-down"} size={17} color={COLORS.GREEN} />,
//         <Icon name={"arrow-up"} size={17} color={COLORS.GREEN} />,
//     ];

//     return (
//         <View>
//             <View style={styles.container}>
//                 <CustomText style={styles.text}>{title}</CustomText>
//             </View>

//             <View style={{ gap: 10 }}>
//                 {/* Loop through time_map to display time-related data */}
//                 <View style={styles.body}>
//                     <View style={[styles.details, { paddingRight: 10 }]}>
//                         <CustomText style={styles.text}>{"Signal"}</CustomText>
//                     </View>
//                     <View style={styles.tab}>
//                         {Object.entries(time_map).map(([time, label]) => (
//                             <View key={time} style={{ marginRight: 10 }}>
//                                 <CustomText style={styles.text}>{label}</CustomText>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Mapping through Buy data */}
//                 <View style={styles.body}>
//                     <View style={styles.details}>
//                         <CustomText style={styles.text}>{"Buy"}</CustomText>
//                     </View>
//                     <View style={styles.tab}>
//                         {maBuy?.map((item, index) => (
//                             <View key={index} style={{ marginRight: 10 }}>
//                                 <CustomText style={styles.text}>{item}</CustomText>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Mapping through Sell data */}
//                 <View style={styles.body}>
//                     <View style={styles.details}>
//                         <CustomText style={styles.text}>{"Sell"}</CustomText>
//                     </View>
//                     <View style={styles.tab}>
//                         {maSell?.map((item, index) => (
//                             <View key={index} style={{ marginRight: 10 }}>
//                                 <CustomText style={styles.text}>{item}</CustomText>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Mapping through Summary data */}
//                 <View style={styles.body}>
//                     <View style={[styles.details, { paddingRight: 10 }]}>
//                         <CustomText style={[styles.text, { fontSize: 12 }]}>{"Summary"}</CustomText>
//                     </View>
//                     <View style={styles.tab}>
//                         {summaryTab?.map((item, index) => (
//                             <View key={index} style={{ marginRight: 10 }}>
//                                 {item}
//                             </View>
//                         ))}
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// }

// export default ViewModalData;

// const styles = StyleSheet.create({
//     container: { alignItems: "center", marginVertical: 15 },
//     text: { color: COLORS.WHITE, fontSize: 17, fontWeight: "bold" },
//     body: { flexDirection: "row", alignItems: "center" },
//     details: { paddingRight: 30, borderRightWidth: 1, borderRightColor: COLORS.WHITE },
//     tab: { width: "85%", paddingHorizontal: 10 }
// });
