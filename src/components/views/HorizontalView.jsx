// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
// } from 'react-native';
// import CustomScrollView from '../customComponents/CustomScrollView';
// import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
// import { COLORS } from '../../styles/theme-styles';

// const HorizontalView = ({ tabs = [], containerStyle, showIndicator = true, initialTab = '', onTabChange = () => { }, customStyles }) => {

//     const [selectedTab, setSelectedTab] = useState(initialTab || tabs[0]);

//     const fnTabPress = (tab) => {
//         setSelectedTab(tab);
//         onTabChange(tab);
//     };

//     useEffect(() => {
//         if (initialTab && initialTab !== selectedTab) {
//             setSelectedTab(initialTab);
//         }
//     }, [initialTab, selectedTab]);

//     return (

//         <View style={[styles.container, containerStyle]}>
//             <CustomScrollView
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 contentContainerStyle={styles.scrollViewContent}
//             >
//                 {tabs.map((tab) => (
//                     <CustomTouchableOpacity
//                         key={tab}
//                         onPress={() => fnTabPress(tab)}
//                     >
//                         <Text
//                             style={[
//                                 styles.tabText,
//                                 selectedTab === tab ? styles.activeTabText : null,
//                             ]}
//                         >
//                             {tab}
//                         </Text>
//                         {selectedTab === tab && showIndicator && (
//                             <View
//                                 style={[
//                                     styles.activeIndicator,
//                                     customStyles,
//                                 ]}
//                             />
//                         )}
//                     </CustomTouchableOpacity>
//                 ))}
//                 {tabs.map((tab) => (
//                     <CustomTouchableOpacity
//                         key={tab}
//                         style={styles.tabButton}
//                         onPress={() => fnTabPress(tab)}
//                     >
//                         <View style={[styles.activeTabText,  selectedTab === tab ? styles.activeBg : null]} >

//                             <Text
//                                 style={[
//                                     styles.tabText,
//                                     selectedTab === tab ? styles.activeBtnText : null,
//                                 ]}
//                             >
//                                 {tab}
//                             </Text>

//                         </View>

//                     </CustomTouchableOpacity>
//                 ))}
//             </CustomScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         paddingVertical: 10,
//     },
//     scrollViewContent: {
//         gap: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     tabButton: {
//         alignItems: 'center',
//     },
//     tabText: {
//         fontSize: 16,
//         color: COLORS.DIM,
//     },
//     activeTabText: {
//         fontWeight:'bold',
//         color: COLORS.YELLOW,
//     },
//     activeBtnText: {
//         fontWeight:'bold',
//         color: COLORS.WHITE,
//     },
//     activeIndicator: {
//         height: 2,
//         width: '50%',
//         backgroundColor: COLORS.YELLOW,
//     },

//     // activeBtn: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1 },
//     activeBg: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1, backgroundColor: COLORS.DARK_BLUE,},
// });

// export default HorizontalView;

import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import CustomScrollView from '../customComponents/CustomScrollView';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import { COLORS } from '../../styles/theme-styles';

const HorizontalView = ({
    tabs = [],
    containerStyle,
    showIndicator = true,
    initialTab = '',
    onTabChange = () => { },
    customStyles,
    variant = 'default', // 'default' or 'button'
}) => {
    const [selectedTab, setSelectedTab] = useState(initialTab || tabs[0]);

    const fnTabPress = (tab) => {
        setSelectedTab(tab);
        onTabChange(tab);
    };

    useEffect(() => {
        if (initialTab && initialTab !== selectedTab) {
            setSelectedTab(initialTab);
        }
    }, [initialTab, selectedTab]);

    return (
        <View style={[styles.container, containerStyle]}>
            <CustomScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {tabs.map((tab) => (
                    <CustomTouchableOpacity
                        key={tab}
                        onPress={() => fnTabPress(tab)}
                        style={variant === 'button' ? styles.tabButton : null}
                    >
                        {variant === 'default' ? (
                            <>
                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === tab ? styles.activeTabText : null,
                                    ]}
                                >
                                    {tab}
                                </Text>
                                {selectedTab === tab && (
                                    <View
                                        style={[
                                            styles.activeIndicator,
                                            customStyles,
                                        ]}
                                    />
                                )}
                            </>
                        ) : (
                            <View style={[styles.activeTabText, selectedTab === tab ? styles.activeBg : null]} >

                                <Text
                                    style={[
                                        styles.tabText,
                                        selectedTab === tab ? styles.activeBtnText : null,
                                    ]}
                                >
                                    {tab}
                                </Text>

                            </View>
                        )}
                    </CustomTouchableOpacity>
                ))}
            </CustomScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    scrollViewContent: {
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabButton: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: COLORS.DIM,
    },
    activeTabText: {
        fontWeight: 'bold',
        color: COLORS.YELLOW,
    },
    activeBtnText: {
        fontWeight: 'bold',
        color: COLORS.WHITE,
    },
    activeIndicator: {
        height: 2,
        width: '50%',
        backgroundColor: COLORS.YELLOW,
    },

    // activeBtn: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1 },
    activeBg: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1, backgroundColor: COLORS.DARK_BLUE, },
});

export default HorizontalView;

