// import styling
import { COLORS } from '../../styles/theme-styles';
import { setInitialTheme } from "../../redux/themeReducer";
// import packages
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useCommonFunctions = () => {
	const getMaSummaryColor = (summary, textColor) => {
		switch (summary?.toLowerCase()) {
			case 'strong buy':
			case 'buy':
				return COLORS.GREEN;
			case 'neutral':
				return COLORS.BLUE;
			case 'sell':
			case 'strong sell':
				return COLORS.RED;
			default:
				return textColor;
		}
	};

	return {
		getMaSummaryColor,
	};
};

export const initializeTheme = async (dispatch) => {
	try {
		const storedTheme = await AsyncStorage.getItem('userTheme');
		if (storedTheme) {
			dispatch(setInitialTheme(storedTheme));
		}
	} catch (error) {
		console.error("Error fetching theme from AsyncStorage:", error);
	}
};
