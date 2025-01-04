// @import packages
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Ioniicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
// @import modules
import CustomText from './CustomText';
import CustomScrollView from './CustomScrollView';
import CustomTouchableOpacity from './CustomTouchableOpacity';
// @import styles
import { IS_IOS } from '../../styles/theme-styles';
// @import hooks
import { useThemeManager } from '../../lib/customHooks/useThemeManager';
import useNavigationManager from '../../lib/customHooks/useNavigationManager';

const CustomView = ({
	children,
	style,
	showDrawer,
	contentContainerStyle,
	scrollViewRef,
	showsHorizontalScrollIndicator,
	title = false,
	showsVerticalScrollIndicator,
	showBackIcon = false,
	headerStyle,
	onPressBackIcon,
	right
}) => {

	const { bgColor, textColor, iconColor } = useThemeManager();
	const { fnOpenDrawer, fnNavigateGoBack } = useNavigationManager();

	return (
		<SafeAreaView style={styles.safeArea(bgColor)}>
			{showDrawer ? (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
					<CustomScrollView
						scrollViewRef={scrollViewRef}
						style={[styles.container, style, { backgroundColor: bgColor }]}
						contentContainerStyle={contentContainerStyle}
						showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
						showsVerticalScrollIndicator={showsVerticalScrollIndicator}
					>
						{showBackIcon ? (
							<View style={[styles.headerContainer, headerStyle]}>
								<CustomTouchableOpacity onPress={onPressBackIcon ? onPressBackIcon : fnNavigateGoBack}>
									<Icon name={'chevron-left'} size={20} color={textColor} />
								</CustomTouchableOpacity>
								<View style={{ paddingLeft: 20 }}>
									<CustomText style={styles.titleContainer(textColor)}>{title}</CustomText>
								</View>
								{right}
							</View>
						) : (
							<View style={[styles.headerContainer, headerStyle]}>
								<CustomTouchableOpacity onPress={fnOpenDrawer}>
									<Ioniicons name={'menu'} size={30} />
								</CustomTouchableOpacity>
								{right}
								{isSearchVisible ? (
									<View style={globalStyles.searchContainer}>
										<TextInput
											style={globalStyles.searchInput}
											placeholder="Search..."
											value={searchText}
											onChangeText={handleSearchTextChange}
											autoFocus
										/>
										<TouchableOpacity style={{ padding: 5, }} activeOpacity={0.7} onPress={handleClearSearch}>
											<Icon name={"cross"} size={20} color={COLORS.WHITE} style={styles.searchIconInside} />
										</TouchableOpacity>
									</View>
								) : (
									<CustomText style={styles.titleContainer}>{title}</CustomText>
								)}

								{!isSearchVisible && (
									<TouchableOpacity onPress={() => setIsSearchVisible(true)}>
										<SearchIcon />
									</TouchableOpacity>
								)}

							</View>

						)}
						{children}
					</CustomScrollView>
				</KeyboardAvoidingView>
			) : (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
					<View style={[styles.container, style, { backgroundColor: bgColor }]}>
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
							<View style={[styles.headerContainer, headerStyle]}>
								<CustomTouchableOpacity onPress={fnOpenDrawer}>
									<Ioniicons name={'menu'} size={30} color={iconColor} />
								</CustomTouchableOpacity>
								{right}
							</View>
						)}
						{children}
					</View>
				</KeyboardAvoidingView>
			)
			}
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
		alignItems: 'center'
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
	})
});
