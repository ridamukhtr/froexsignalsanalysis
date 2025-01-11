// import styling
import { COLORS } from '../../styles/theme-styles';

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
