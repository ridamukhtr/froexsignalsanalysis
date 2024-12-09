import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Replace with your preferred icon library
// import Icon from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../styles/theme-styles'; // Update with your color definitions

const BottomNavigation = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('dashboard');

    const tabs = [
        { name: 'dashboard', icon: 'bar-chart' },
        { name: 'news', icon: 'heart' },
        { name: 'calendar', icon: 'event' },
        { name: 'favorites', icon: 'bookmark' },
    ];

    const onTabPress = (tab) => {
        setSelectedTab(tab);
        if (navigation) navigation.navigate(tab); // Optional navigation logic
    };

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    onPress={() => onTabPress(tab.name)}
                    style={styles.tab}
                >
                    <Icon
                        name={tab.icon}
                        size={24}
                        color={selectedTab === tab.name ? COLORS.WHITE : COLORS.DIM}
                    />
                    {selectedTab === tab.name && <View style={styles.indicator} />}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: COLORS.NAV_BLUE,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    indicator: {
        marginTop: 4,
        height: 4,
        width: 4,
        borderRadius: 2,
        backgroundColor: COLORS.WHITE,
    },
});

export default BottomNavigation;
