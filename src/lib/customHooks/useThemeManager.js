// import packages
import { useDispatch, useSelector } from "react-redux";
// import styling
import { COLORS } from "../../styles/theme-styles";
// import reducer
import { changeTheme, selectedThemeSelector } from "../../redux/themeReducer";

export function useThemeManager() {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectedThemeSelector);

	const isDarkTheme = currentTheme === "dark";

	const bgColor = isDarkTheme ? COLORS.DARK_BG : COLORS.LIGHT_BG;
	const textColor = isDarkTheme ? COLORS.WHITE : COLORS.BLACK;
	const borderColor = isDarkTheme ? COLORS.DARK_BORDER : COLORS.LIGHT_BORDER;
	const dropdownColor = isDarkTheme ? COLORS.DARK_DROPDOWN : COLORS.LIGHT_DROPDOWN;
	const iconColor = isDarkTheme ? COLORS.DARK_ICON : COLORS.LIGHT_ICON;
	const footerColor = isDarkTheme ? COLORS.DARK_FOOTER_BG : COLORS.WHITE;
	const tabColor = isDarkTheme ? COLORS.DARK_FOOTER_BG : COLORS.PRIMARY;
	const logoColor = isDarkTheme ? COLORS.BLACK : COLORS.SECONDARY;

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
		tabColor,
		isDarkTheme,
		logoColor,

		fnToggleTheme,
	};
}
