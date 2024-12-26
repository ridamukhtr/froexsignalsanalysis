// import packages
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import styling
import { COLORS } from '../../styles/theme-styles';
// import reducer
import { changeTheme, selectedThemeSelector } from '../../redux/themeReducer';

export default function () {
	const dispatch = useDispatch();
	const currentTheme = useSelector(selectedThemeSelector);

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			dispatch(changeTheme(colorScheme));
		});
		return () => subscription.remove();
	}, []);

	const bgColor = currentTheme === 'dark' ? COLORS.DARK_BLUE : COLORS.WHITE;
	const textColor = currentTheme === 'dark' ? COLORS.WHITE : COLORS.BLACK;
	const heading = currentTheme == 'dark' ? 'white' : 'blue';
	const fnToggleTheme = () => {
		const newTheme = currentTheme == 'dark' ? 'light' : 'dark';

		dispatch(changeTheme(newTheme));
	};

	return {
		currentTheme,
		bgColor,
		textColor,
		heading,

		fnToggleTheme
	};
}
