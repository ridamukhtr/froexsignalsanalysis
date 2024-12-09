import { useNavigation } from "@react-navigation/native"; 
import { ROUTES } from "../../routes/RouteConstants";

export default function useNavigationManager() {
    const navigation = useNavigation();

    const fnNavigateToHome =()=> navigation.navigate(ROUTES.screenHome);
    const fnNavigateToFavourite =()=> navigation.navigate(ROUTES.screenFavourite);
    const fnNavigateToIndices=()=> navigation.navigate(ROUTES.screenIndices);


    const fnNavigateToRoot = () => navigation.navigate('Root');

    const fnOpenDrawer =()=> navigation.openDrawer();
    const fnCloseDrawer =()=> navigation.closeDrawer();

    const fnNavigateGoBack = () => navigation.goBack();

    return {
        fnNavigateToFavourite,
        fnNavigateToHome,
        fnNavigateToIndices,

        fnNavigateToRoot,
        fnOpenDrawer,
        fnCloseDrawer,
        fnNavigateGoBack,
    };
}
