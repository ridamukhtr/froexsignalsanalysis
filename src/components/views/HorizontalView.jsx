// import packages
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import styling
import { COLORS } from '../../styles/theme-styles';
// import components
import CustomScrollView from '../customComponents/CustomScrollView';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';

const HorizontalView = ({ tabs = [], containerStyle, initialTab = '', onTabChange = () => {}, customStyles, variant }) => {
	const [selectedTab, setSelectedTab] = useState(initialTab || tabs[0]);

	const fnTabPress = tab => {
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
			<CustomScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
				{tabs.map(tab => (
					<CustomTouchableOpacity key={tab} onPress={() => fnTabPress(tab)} style={variant === 'button' ? styles.tabButton : null}>
						{variant === 'default' ? (
							<>
								<Text style={[styles.tabText, selectedTab === tab ? styles.activeTabText : null]}>{tab}</Text>
								{selectedTab === tab && <View style={[styles.activeIndicator, customStyles]} />}
							</>
						) : variant === 'button' ? (
							<View style={[styles.activeTabText, selectedTab === tab ? styles.activeBg : null]}>
								<Text style={[styles.tabText, selectedTab === tab ? styles.activeBtnText : null]}>{tab}</Text>
							</View>
						) : (
							// Fallback: No variant provided
							<Text style={styles.tabText}>{tab}</Text>
						)}
					</CustomTouchableOpacity>
				))}
			</CustomScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10
	},
	scrollViewContent: {
		gap: 20,
		flexDirection: 'row',
		alignItems: 'center'
	},
	tabButton: {
		alignItems: 'center'
	},
	tabText: {
		fontSize: 16,
		color: COLORS.DIM
	},
	activeTabText: {
		fontWeight: 'bold',
		color: COLORS.YELLOW
	},
	activeBtnText: {
		fontWeight: 'bold',
		color: COLORS.WHITE
	},
	activeIndicator: {
		height: 2,
		width: '50%',
		backgroundColor: COLORS.YELLOW
	},

	// activeBtn: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1 },
	activeBg: { paddingHorizontal: 10, paddingVertical: 2, borderRadius: 150 / 1, backgroundColor: COLORS.PRIMARY }
});

export default HorizontalView;
