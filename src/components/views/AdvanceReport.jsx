import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../customComponents/CustomText'
import HorizontalView from './HorizontalView'
import useThemeManager from '../../lib/customHooks/useThemeManager'
import { COLORS } from '../../styles/theme-styles'
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity'
import ViewIndicesDetails from './ViewIndicesDetails'

const AdvanceReport = ({ additionalData, selectedTime }) => {
    console.log("additional", additionalData);
    
    const { textColor, bgColor } = useThemeManager()

    return (
        <View style={{ marginVertical: 15 }} >
            <CustomText style={[styles.title, { fontSize: 16, color: textColor }]}>
                {"Advance Report for Professionals"}
            </CustomText>
            
            {/* <HorizontalView tabs={tabs} variant={"button"} onTabChange={''}  initialTab={selectedTime} /> */}
            <View style={styles.boxContainer} >
                <View style={styles.boxContent}>

                    <CustomText  style={{fontWeight:"bold"}} >{"Updated Time"}</CustomText>
                    {/* <CustomText>{"change_at"}</CustomText> */}
                </View>
                {/* <View style={{alignItems:"center", flexDirection:"row", gap:20}}> */}

                <CustomText style={{ fontSize: 13 }} >{"Dec 12, 2024 01:12 PM (PST)"}</CustomText>
                <CustomText style={{ fontSize: 13 }} >{"Dec 12, 2024 08:12 AM (UTC)"}</CustomText>

                {/* </View> */}

                <View style={[styles.boxContent, { marginTop: 15 }]}>

                    <CustomText style={{fontWeight:"bold"}} >{"Summary :"}</CustomText>
                    <View style={styles.btn(textColor)}>
                        <CustomText style={{ color: "#07639D" }} > {'summary'}</CustomText>
                    </View>
                </View>
                <CustomTouchableOpacity style={{alignItems:"center", marginTop:10, }} >
                    <CustomText  style={{ fontSize: 18 }} >{"View Details"}</CustomText>
                </CustomTouchableOpacity>
            </View>
        </View>

    )
}

export default AdvanceReport

const styles = StyleSheet.create({

    boxContainer: { borderTopColor: COLORS.GREY, borderWidth:1, borderColor:COLORS.GREY, borderRadius:10, paddingHorizontal:10, paddingVertical: 20,marginVertical:15 },
    boxContent: { alignItems: "center",flexDirection:"row", gap: 20 },
    btn: (textColor) => ({ backgroundColor: textColor, paddingVertical: 3, paddingHorizontal: 10, borderRadius: 150 / 1 }),

    title: {
        color: COLORS.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
    },

})

// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import CustomText from '../customComponents/CustomText';
// import HorizontalView from './HorizontalView';
// import useThemeManager from '../../lib/customHooks/useThemeManager';
// import { COLORS } from '../../styles/theme-styles';
// import time_map from '../../../assets/time_map';

// const AdvanceReport = ({ selectedTime }) => {
//     const [additionalData, setAdditionalData] = useState(null);  // Store fetched data
//     const [error, setError] = useState(null);  // To store errors if any

//     const tabs = ["5min", "15min", "30min", "1Hour", "4Hours", "5Hours", "1Day", "1Week"];

//     const { textColor, bgColor } = useThemeManager();

//     // Function to fetch data based on time interval
//     const fetchApiData = async (selectedTime) => {
//         try {
//             const timeInSeconds = Object.keys(time_map).find(key => time_map[key] === selectedTime);
            
//             if (timeInSeconds) {
//                 const response = await fetch(`https://massyart.com/ringsignal/inv/app_details_pp?msg_id=${timeInSeconds}`);
//                 const data = await response?.json();
//                 const { summary, change_at } = data?.pp?.overall || {};  // Extract summary and change_at
//                 setAdditionalData({ summary, change_at });
//             } else {
//                 console.log('Invalid time interval selected');
//             }
//         } catch (err) {
//             console.error('Error fetching API data:', err);
//             setError(err?.message);
//         }
//     };

//     // Fetch data whenever selectedTime changes
//     useEffect(() => {
//         if (selectedTime) {
//             fetchApiData(selectedTime);
//         }
//     }, [selectedTime]);

//     return (
//         <View style={{ marginVertical: 20 }}>
//             <CustomText style={[styles.title, { fontSize: 16, color: textColor }]}>
//                 {"Advance Report for Professionals"}
//             </CustomText>

//             {/* Horizontal tabs to select time interval */}
//             <HorizontalView
//                 tabs={tabs}
//                 variant={"button"}
//                 onTabChange={(newTime) => fetchApiData(newTime)}  // Trigger data fetch when tab changes
//                 initialTab={selectedTime}
//             />

//             <View style={styles.boxContainer}>
//                 <View style={styles.boxContent}>
//                     <CustomText>{"Update:"}</CustomText>
//                     {/* Displaying the time when the data was last updated */}
//                     <CustomText>{additionalData?.change_at || "Loading..."}</CustomText>
//                 </View>

//                 <CustomText style={{ fontSize: 12 }}>
//                     {"Dec 12, 2024 01:12 PM (Pakistan Standard Time)"}
//                 </CustomText>
//                 <CustomText style={{ fontSize: 12 }}>
//                     {"Dec 12, 2024 08:12 AM (UTC)"}
//                 </CustomText>

//                 <View style={[styles.boxContent, { marginTop: 15 }]}>
//                     <CustomText>{"Summary:"}</CustomText>
//                     <View style={styles.btn(textColor)}>
//                         <CustomText style={{ color: "#07639D" }}>
//                             {additionalData?.summary || "Loading..."}
//                         </CustomText>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default AdvanceReport;

// const styles = StyleSheet.create({
//     boxContainer: {
//         borderTopColor: COLORS.GREY,
//         borderTopWidth: 1,
//         borderBottomColor: COLORS.GREY,
//         borderBottomWidth: 1,
//         paddingVertical: 20,
//     },
//     boxContent: {
//         alignItems: "center",
//         flexDirection: "row",
//         gap: 20,
//     },
//     btn: (textColor) => ({
//         backgroundColor: textColor,
//         paddingVertical: 3,
//         paddingHorizontal: 10,
//         borderRadius: 150 / 1,
//     }),
//     title: {
//         color: COLORS.WHITE,
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });
