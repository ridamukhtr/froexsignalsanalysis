import { COLORS } from "../../styles/theme-styles";

export default function useCommonFunctions() {

    const getMaSummaryColor = (summary) => {
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
                return COLORS.WHITE;
        }
    };

    return { getMaSummaryColor, };
}
