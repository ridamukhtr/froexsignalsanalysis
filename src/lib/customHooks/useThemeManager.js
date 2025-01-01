// // import packages
// import { useEffect } from 'react';
// import { Appearance } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// // import styling
// import { COLORS } from '../../styles/theme-styles';
// // import reducer
// import { changeTheme, selectedThemeSelector } from '../../redux/themeReducer';

// export function useThemeManager() {
// 	const dispatch = useDispatch();
// 	const currentTheme = useSelector(selectedThemeSelector);

// 	useEffect(() => {
// 		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
// 			dispatch(changeTheme(colorScheme));
// 		});
// 		return () => subscription.remove();
// 	}, []);

// 	const bgColor = currentTheme === 'dark' ? COLORS.DARK_BG : COLORS.LIGHT_BG;
// 	const textColor = currentTheme === 'dark' ? COLORS.LIGHT_BG : COLORS.DARK_BG;
// 	const fnToggleTheme = () => {
// 		const newTheme = currentTheme == 'dark' ? 'light' : 'dark';

// 		dispatch(changeTheme(newTheme));
// 	};

// 	return {
// 		currentTheme,
// 		bgColor,
// 		textColor,

// 		fnToggleTheme
// 	};
// }

import { useEffect } from "react";
import { Appearance } from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import styling
import { COLORS } from "../../styles/theme-styles";
// import reducer
import { changeTheme, selectedThemeSelector } from "../../redux/themeReducer";

export function useThemeManager() {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectedThemeSelector);

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			dispatch(changeTheme(colorScheme));
		});
		return () => subscription.remove();
	}, []);

	const isDarkTheme = currentTheme === "dark";

	const bgColor = isDarkTheme ? COLORS.DARK_BG : COLORS.LIGHT_BG;
	const textColor = isDarkTheme ? COLORS.WHITE : COLORS.BLACK;
	const borderColor = isDarkTheme ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;
	const dropdownColor = isDarkTheme ? COLORS.DARK_DROPDOWN : COLORS.LIGHT_DROPDOWN;
	const iconColor = isDarkTheme ? COLORS.DARK_ICON : COLORS.LIGHT_ICON;
	const footerColor = isDarkTheme ? COLORS.DARK_FOOTER_BG : COLORS.WHITE;

	const fnToggleTheme = () => {
		const newTheme = isDarkTheme ? "light" : "dark";
		dispatch(changeTheme(newTheme));
	};

	return {
		currentTheme,
		bgColor,
		textColor,
		borderColor,
		dropdownColor,
		iconColor,
		footerColor,

		fnToggleTheme,
	};
}
