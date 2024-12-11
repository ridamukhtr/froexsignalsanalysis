import { useNavigation } from "@react-navigation/native"; 
import { ROUTES } from "../../routes/RouteConstants";

export default function useNavigationManager() {
    const navigation = useNavigation();

    const fnNavigateToHome =()=> navigation.navigate(ROUTES.screenHome);
    const fnNavigateToFavourite =()=> navigation.navigate(ROUTES.screenFavourite);
    const fnNavigateToIndices=()=> navigation.navigate(ROUTES.screenIndices);
    const fnNavigateToStocks=()=> navigation.navigate(ROUTES.screenStock);
    const fnNavigateToCrypto=()=> navigation.navigate(ROUTES.screenCrypto);
    const fnNavigateToForax=()=> navigation.navigate(ROUTES.screenForex);
    const fnNavigateToHelp=()=> navigation.navigate(ROUTES.screenHelp);
    const fnNavigateToCommodities=()=> navigation.navigate(ROUTES.screenCommodities);
    


    const fnNavigateToRoot = () => navigation.navigate('Root');

    const fnOpenDrawer =()=> navigation.openDrawer();
    const fnCloseDrawer =()=> navigation.closeDrawer();

    const fnNavigateGoBack = () => navigation.goBack();

    return {
        fnNavigateToHelp,
        fnNavigateToCommodities,
        fnNavigateToCrypto,
        fnNavigateToForax,
        fnNavigateToStocks,
        fnNavigateToFavourite,
        fnNavigateToHome,
        fnNavigateToIndices,

        fnNavigateToRoot,
        fnOpenDrawer,
        fnCloseDrawer,
        fnNavigateGoBack,
    };
}
