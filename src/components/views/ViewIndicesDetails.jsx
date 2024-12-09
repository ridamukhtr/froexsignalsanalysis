import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import globalStyles from '../../styles/global-styles'
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity'
import { COLORS } from '../../styles/theme-styles'
import Arrow from 'react-native-vector-icons/Entypo'
import ArrowDown from 'react-native-vector-icons/Entypo'


const ViewIndicesDetails = () => {
    
    return (
        <View style={{  }} >
            <View style={globalStyles.container} >
                <CustomText style={styles.title}>Moving Averages</CustomText>
                <View style={styles.statusContainer}>
                    <CustomText style={styles.statusText}>Strong sell</CustomText>
                    <View style={styles.redDot} />
                </View>
            </View>

            <View style={globalStyles.container} >
                <CustomTouchableOpacity style={styles.btnContainer} >
                    <View style={[globalStyles.container, { gap: 20 }]} >
                        <View style={[globalStyles.container, { gap: 5 }]}>

                            <Arrow name={"arrow-up"} size={25} color={COLORS.GREEN} />

                            <CustomText>{"Buy"}</CustomText>
                        </View>
                        <CustomText style={[globalStyles.titleText, { fontSize: 23 }]} >{"2"}</CustomText>
                    </View>
                </CustomTouchableOpacity>
                <CustomTouchableOpacity style={styles.btnContainer} >
                    <View style={[globalStyles.container, { gap: 20 }]} >
                        <View style={[globalStyles.container, { gap: 5 }]}>

                            <ArrowDown name={"arrow-down"} size={25} color={COLORS.GREEN} />


                            <CustomText>{"Buy"}</CustomText>
                        </View>
                        <CustomText style={[globalStyles.titleText, { fontSize: 23 }]} >{"2"}</CustomText>
                    </View>
                </CustomTouchableOpacity>

            </View>
        </View>
    )
}

export default ViewIndicesDetails

const styles = StyleSheet.create({
    redDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusText: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 4,
    },
    title: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnContainer: { padding: 20, width: '48%', borderRadius: 10, borderWidth: 1, borderColor: COLORS.GREY, marginVertical: 20 }

})

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const ViewIndicesDetails = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.title}>Moving Averages</Text>
//                 <View style={styles.statusContainer}>
//                     <Text style={styles.statusText}>Strong sell</Text>
//                     <View style={styles.redDot} />
//                 </View>
//             </View>

//             <View style={styles.metricsContainer}>
//                 <View style={styles.metric}>
//                     <Text style={styles.metricIcon}>⬇</Text>
//                     <Text style={styles.metricLabel}>Buy</Text>
//                     <Text style={styles.metricValue}>2</Text>
//                 </View>
//                 <View style={styles.metric}>
//                     <Text style={styles.metricIcon}>⬆</Text>
//                     <Text style={styles.metricLabel}>Sell</Text>
//                     <Text style={styles.metricValue}>10</Text>
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#1a1a2e',
//         padding: 16,
//         borderRadius: 8,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     title: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     statusContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     statusText: {
//         color: 'red',
//         fontSize: 14,
//         fontWeight: 'bold',
//         marginRight: 4,
//     },
//     redDot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: 'red',
//     },
//     metricsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//     },
//     metric: {
//         alignItems: 'center',
//     },
//     metricIcon: {
//         fontSize: 24,
//         color: 'green',
//         marginBottom: 4,
//     },
//     metricLabel: {
//         color: '#ffffff',
//         fontSize: 14,
//         marginBottom: 4,
//     },
//     metricValue: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default ViewIndicesDetails;
