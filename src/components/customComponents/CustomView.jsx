// @import packages
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Ioniicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
// @import modules
import CustomText from './CustomText';
import CustomScrollView from './CustomScrollView';
import CustomTouchableOpacity from './CustomTouchableOpacity';
// @import styles
import { IS_IOS } from '../../styles/theme-styles';
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
	isSearchView = false,
	search
}) => {

	const { bgColor, textColor, iconColor } = useThemeManager();
	const { fnOpenDrawer, fnNavigateGoBack } = useNavigationManager();

	return (
		<SafeAreaView style={styles.safeArea(bgColor)}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'} >
				{isSearchView ? (
					<View style={[styles.container, style]}>
						<View style={[styles.headerContainer, headerStyle]}>
							<CustomSearchField />
						</View>
						{children}
					</View>
				) : (<View style={[styles.container, style]}>
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
							<View style={{ flexDirection: "row", alignItems: "center", gap: 12, flex: 1 }} >
								<Image source={require('../../../assets/images/logo.jpg')} style={{ height: 30, width: 30, borderRadius: 25, }} />
								<CustomText style={globalStyles.titleText}>ForaxAnalysis</CustomText>
							</View>
							<CustomText >{right}</CustomText>
						</View>
					)}
					{children}
				</View>)}
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
	})
});
