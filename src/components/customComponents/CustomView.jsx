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
import useNavigationManager from '../../lib/customHooks/useNavigationManager';
import { useThemeManager } from '../../lib/customHooks/useThemeManager';

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
	const { bgColor, textColor } = useThemeManager();
	const { fnOpenDrawer, fnNavigateGoBack } = useNavigationManager();

	return (
		<SafeAreaView style={styles.safeArea(bgColor)}>
			{showDrawer ? (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
					<CustomScrollView
						scrollViewRef={scrollViewRef}
						style={[styles.container(bgColor), style]}
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
							</View>
						)}
						{children}
					</CustomScrollView>
				</KeyboardAvoidingView>
			) : (
				<KeyboardAvoidingView style={{ flex: 1 }} behavior={IS_IOS ? 'padding' : 'height'}>
					<View style={[styles.container(bgColor), style]}>
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
									<Ioniicons name={'menu'} size={30} color={textColor} />
								</CustomTouchableOpacity>
								{right}
							</View>
						)}
						{children}
					</View>
				</KeyboardAvoidingView>
			)}
		</SafeAreaView>
	);
};

export default CustomView;

const styles = StyleSheet.create({
	safeArea: bgColor => ({
		flex: 1,
		backgroundColor: bgColor
	}),
	container: bgColor => ({
		flex: 1,
		paddingBottom: 100,
		paddingHorizontal: '4%',
		backgroundColor: bgColor
	}),
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
