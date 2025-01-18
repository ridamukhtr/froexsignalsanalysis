// import packages
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
// import styling
import { COLORS } from '../../styles/theme-styles';
// import components
import CustomScrollView from '../customComponents/CustomScrollView';
import CustomTouchableOpacity from '../customComponents/CustomTouchableOpacity';
import CustomText from '../customComponents/CustomText';
// import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

const HorizontalView = ({
	tabs = [],
	useScrollView,
	containerStyle,
	initialTab = '',
	onTabChange = () => { }, customStyles, variant }) => {

	const scrollViewRef = useRef();
	const tabPositions = useRef([]);
	const [selectedTab, setSelectedTab] = useState(initialTab || tabs[0]);

	const { dropdownColor, textColor, footerColor, tabColor } = useThemeManager();
	const fnTabPress = (tab, index) => {
		Keyboard.dismiss();
		setSelectedTab(tab);
		onTabChange(tab);

		// if (scrollViewRef.current) {
		// 	scrollViewRef.current.scrollToEnd({ animated: true }); // Scroll to end
		// }
	};

	useEffect(() => {
		if (initialTab && initialTab !== selectedTab) {
			setSelectedTab(initialTab);
		}
	}, [initialTab, selectedTab]);

	return (
		<View style={[styles.container, containerStyle]}>

			{useScrollView ? (
				<View style={{ marginRight: -13 }}>
					<CustomScrollView scrollViewRef={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
						{tabs.map((tab, index) => (
							<CustomTouchableOpacity
								key={tab}
								onPress={() => fnTabPress(tab)}
								style={[variant === 'button' ? styles.tabButton : null,
								index === tabs.length - 1 ? { marginRight: 10 } : null,
								]}
								onLayout={(event) => {
									// Capture the layout of each tab
									const { x, width } = event.nativeEvent.layout;
									tabPositions.current[index] = { x, width };
								}}>
								{variant === 'default' ? (
									<>
										<CustomText style={[styles.tabText, selectedTab === tab ? styles.activeTabText : null]}>{tab}</CustomText>
										{selectedTab === tab && <View style={[styles.activeIndicator, customStyles]} />}
									</>
								) : variant === 'button' ? (
									<View style={[styles.activeTabText, selectedTab === tab ? styles.activeBg : null]}>
										<CustomText style={[styles.tabText, selectedTab === tab ? styles.activeBtnText : null]}>{tab}</CustomText>
									</View>
								) : (
									// Fallback: No variant provided
									<CustomText style={styles.tabText}>{tab}</CustomText>
								)}
							</CustomTouchableOpacity>
						))}
					</CustomScrollView>
				</View>
			) : (
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: dropdownColor, borderRadius: 5, paddingHorizontal: 10, paddingVertical: 5 }}>
					{tabs.map(tab => (
						<CustomTouchableOpacity key={tab} onPress={() => fnTabPress(tab)} style={[styles.activeTabText, selectedTab === tab ? styles.activetab(tabColor) : null]}>
							<CustomText style={[styles.tabText, selectedTab === tab ? styles.activeBtnText(textColor) : null]}>{tab}</CustomText>
						</CustomTouchableOpacity>
					))}
				</View>
			)
			}
		</View >
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
		color: COLORS.DIM
	},
	activeTabText: {
		fontWeight: 'bold',
		color: COLORS.YELLOW
	},
	activeBtnText: (textColor) => ({
		fontWeight: 'bold',
		color: textColor
	}),
	activeIndicator: {
		height: 2,
		width: '50%',
		backgroundColor: COLORS.YELLOW
	},
	activetab: (tabColor) => ({
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 7,
		backgroundColor: tabColor
	}),
	activeBg: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 7,
		backgroundColor: COLORS.PRIMARY
	}
});

export default HorizontalView;
