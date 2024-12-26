// import packages
import React from 'react';
import { Share } from 'react-native';
import { View, StyleSheet } from 'react-native';
import Theme from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
// import navigator
import BottomNavigator from './BottomNavigator';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import hooks
import useThemeManager from '../lib/customHooks/useThemeManager';
// import styling
import { COLORS } from '../styles/theme-styles';
import globalStyles from '../styles/global-styles';
// import components
import CustomText from '../components/customComponents/CustomText';
import CustomDropdown from '../components/customComponents/CustomDropdown';
import CustomTouchableOpacity from '../components/customComponents/CustomTouchableOpacity';
// import screens
import FavouriteScreen from '../screens/FavouriteScreen';

const Drawer = createDrawerNavigator();

// Custom Drawer Content
function CustomDrawerContent(props) {
	const { bgColor, textColor, currentTheme, fnToggleTheme } = useThemeManager();

	const fnShare = () => {
		Share.share({
			message: 'Your share message here'
		});
	};

	const items = [{ label: 'Dark' }, { label: 'Light' }];

	const fnThemeChange = selectedTheme => {
		if (currentTheme !== selectedTheme.toLowerCase()) {
			fnToggleTheme();
		}
	};

	return (
		<DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
			<View style={{ backgroundColor: bgColor, flex: 1 }}>
				{/* Default Drawer Items (Screens) */}
				<DrawerItem label="Home" onPress={() => props.navigation.navigate(ROUTES.screenHome)} labelStyle={{ color: textColor }} />
				<DrawerItem
					label="Favourites"
					onPress={() => props.navigation.navigate(ROUTES.screenFavourite)}
					labelStyle={{ color: textColor }}
				/>

				{/* Custom Content Section */}
				<View style={styles.customSection}>
					<CustomText style={{ fontWeight: 'bold', fontSize: 18 }}>More</CustomText>
					<View style={[globalStyles.container, {}]}>
						<CustomText style={{ color: textColor }}>Themes</CustomText>
						<CustomTouchableOpacity>
							<CustomDropdown item={items} activeTheme={currentTheme === 'dark' ? 'Dark' : 'Light'} onPress={fnThemeChange} />
						</CustomTouchableOpacity>
					</View>

					{/* Share Button */}
					<View style={[globalStyles.container, {}]}>
						<CustomText style={{ color: textColor }}>Share</CustomText>
						<CustomTouchableOpacity onPress={fnShare}>
							<Theme name="share" size={25} color={textColor} />
						</CustomTouchableOpacity>
					</View>
				</View>
			</View>
		</DrawerContentScrollView>
	);
}

// Drawer Navigator
export default function DrawerNavigator() {
	const { textColor, bgColor } = useThemeManager();

	return (
		<Drawer.Navigator
			drawerContent={props => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerPosition: 'left',
				drawerType: 'front',
				swipeEnabled: true,
				drawerItemStyle: { margin: 0, padding: 0 },
				drawerActiveTintColor: textColor,
				drawerInactiveTintColor: COLORS.DIM,
				drawerStyle: { width: '72%', backgroundColor: bgColor }
			}}
		>
			{/* The Drawer Screens */}
			<Drawer.Screen
				name={ROUTES.screenHome}
				component={BottomNavigator}
				options={{
					drawerLabel: () => null,
					title: 'Home'
				}}
			/>
			<Drawer.Screen
				name={ROUTES.screenFavourite}
				component={FavouriteScreen}
				options={{
					drawerLabel: () => null,
					title: 'Favourite'
				}}
			/>
		</Drawer.Navigator>
	);
}

const styles = StyleSheet.create({
	customSection: {
		paddingVertical: 20,
		gap: 25,
		paddingLeft: 20
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	}
});
