// @import packages
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Notification from 'react-native-vector-icons/MaterialCommunityIcons';
import Search from 'react-native-vector-icons/Ionicons';
import Ioniicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import Cross from 'react-native-vector-icons/Octicons';

// @import modules
import CustomText from './CustomText';
import CustomScrollView from './CustomScrollView';
import CustomTouchableOpacity from './CustomTouchableOpacity';
// @import styles
import { COLORS, IS_IOS } from '../../styles/theme-styles';
import globalStyles from '../../styles/global-styles';
// @import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import useNavigationManager from '../../lib/customHooks/useNavigationManager';
import CustomSearchField from './CustomSearchField';

const CustomView = ({
	children,
	style,
	title = false,
	showBackIcon = false,
	headerStyle,
	onPressBackIcon,
	right,
	centered,
	onSearch
}) => {
	const inputRef = useRef(null);

	const [isSearchActive, setIsSearchActive] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchToggle = () => {

		setIsSearchActive(!isSearchActive);
		setSearchQuery('');
		if (onSearch) {
			onSearch('');
		}
	};

	const handleSearchChange = (text) => {
		setSearchQuery(text);
		if (onSearch) {
			onSearch(text);
		}
	};

	const { bgColor, textColor, iconColor, dropdownColor, logoColor } = useThemeManager();
	const { fnNavigateGoBack } = useNavigationManager();

	return (
		<SafeAreaView style={styles.safeArea(bgColor)}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'} >
				{centered ? (
					<View style={[styles.container, style]}>
						<View style={[styles.headerContainer, headerStyle, { justifyContent: "center", gap: 10 }]}>
							<View style={{ alignItems: "center", justifyContent: "center", backgroundColor: logoColor, height: 40, width: 40, borderRadius: 150 / 1, }} >
								<Image source={require('../../../assets/images/logo-mobile.png')} style={{ height: 35, width: 35, }} resizeMode='cover' />
							</View>
							<CustomText style={globalStyles.titleText}>ForaxAnalysis</CustomText>
						</View>
						{children}
					</View>
				) : (
					<View style={[styles.container, style]}>
						{showBackIcon ? (
							<View style={[styles.headerContainer, headerStyle]}>
								<CustomTouchableOpacity highlight={true} onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
									<Icon name={'chevron-left'} size={20} color={textColor} />
								</CustomTouchableOpacity>
								<View style={{ flex: 1, paddingLeft: 20 }}>
									<CustomText style={styles.titleContainer(textColor)}>{title}</CustomText>
								</View>

								{right}
							</View>
						) : (
							<View style={[styles.headerContainer, headerStyle,]}>
								{isSearchActive ? (
									<View style={[styles.searchContainer, { backgroundColor: dropdownColor }]}>
										<TextInput
											ref={inputRef}
											style={[styles.searchInput, { color: textColor }]}
											placeholder="Search..."
											placeholderTextColor={textColor}
											value={searchQuery}
											onChangeText={handleSearchChange}
											onBlur={() => {
												if (!searchQuery) {
													setIsSearchActive(false);
												}
											}}
											autoFocus={true}
										/>

										<CustomTouchableOpacity onPress={handleSearchToggle}>
											<Cross name="x-circle-fill" size={20} color={iconColor} />
										</CustomTouchableOpacity>
									</View>
								) : (
									<>
										<View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }} >
											<View style={{ alignItems: "center", justifyContent: "center", backgroundColor: logoColor, height: 40, width: 40, borderRadius: 150 / 1, }} >
												<Image source={require('../../../assets/images/logo-mobile.png')} style={{ height: 35, width: 35, }} resizeMode='cover' />
											</View>
											<CustomText style={globalStyles.titleText}>ForaxAnalysis</CustomText>
										</View>
										<View style={globalStyles.gapContainer} >
											<CustomTouchableOpacity >
												<Notification name="bell-outline" size={20} color={textColor} />
											</CustomTouchableOpacity>
											<CustomTouchableOpacity onPress={handleSearchToggle} >
												<Search name="search" color={textColor} size={20} />
											</CustomTouchableOpacity>
										</View>
									</>
								)}
							</View>
						)}
						{children}
					</View>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView >
	);
};

export default CustomView;

const styles = StyleSheet.create({
	safeArea: (bgColor) => ({
		flex: 1,
		backgroundColor: bgColor
	}),
	container: {
		flex: 1,
		paddingHorizontal: '4%',
	},
	flexContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	centerContainer: {
		width: '100%',
		alignItems: 'center'
	},
	headerContainer: {
		paddingTop: 30,
		paddingBottom: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerFullWidthContainer: {
		gap: 10,
		paddingTop: 52,
		paddingBottom: 16,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		justifyContent: 'space-between'
	},
	titleContainer: textColor => ({
		fontSize: 18,
		color: textColor,
		fontWeight: 'bold'
	}),
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 150 / 1,
		paddingHorizontal: 10,
	},
	searchInput: {
		flex: 1,
		fontSize: 16,
	},
});
