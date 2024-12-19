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

    const convertToPST = (time) => {
        const date = new Date(time);
        const options = { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: true  };
        return date?.toLocaleString('en-GB', options); // Returns the time in 'HH:mm' format
    };

    return { getMaSummaryColor, convertToPST };
}
