// import styling
import { COLORS } from '../../styles/theme-styles';
import useThemeManager from './useThemeManager';

export function useCommonFunctions() {
	// const { textColor } = useThemeManager();
	const getMaSummaryColor = summary => {
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
				return COLORS.BLACK;
			// return textColor;
		}
	};

	return { getMaSummaryColor };
}