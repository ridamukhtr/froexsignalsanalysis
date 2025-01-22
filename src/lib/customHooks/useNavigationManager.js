// import packages
import { useNavigation } from '@react-navigation/native';
// import routes
import { ROUTES } from '../../routes/RouteConstants';

export default function useNavigationManager() {
	const navigation = useNavigation();

	const fnNavigateToHome = () => navigation.navigate(ROUTES.screenHome);
	const fnNavigateToFavourite = () => navigation.navigate(ROUTES.screenFavourite);
	const fnNavigateToIndices = () => navigation.navigate(ROUTES.screenIndices);
	const fnNavigateToStocks = () => navigation.navigate(ROUTES.screenStock);
	const fnNavigateToCrypto = () => navigation.navigate(ROUTES.screenCrypto);
	const fnNavigateToForex = () => navigation.navigate(ROUTES.screenForex);
	const fnNavigateToHelp = () => navigation.navigate(ROUTES.screenHelp);
	const fnNavigateToPrivacy = () => navigation.navigate(ROUTES.screenPrivacy);
	const fnNavigateToCommodities = () => navigation.navigate(ROUTES.screenCommodities);
	const fnNavigateToDetails = () => navigation.navigate(ROUTES.screenDetails);
	const fnNavigateToNotification = () => navigation.navigate(ROUTES.screenNotification);
	const fnNavigateToMore = () => navigation.navigate(ROUTES.screenMore);

	const fnNavigateToRoot = () => navigation.navigate('Root');

	const fnNavigateGoBack = () => navigation.goBack();

	return {
		fnNavigateToHelp,
		fnNavigateToCommodities,
		fnNavigateToCrypto,
		fnNavigateToForex,
		fnNavigateToStocks,
		fnNavigateToFavourite,
		fnNavigateToHome,
		fnNavigateToIndices,
		fnNavigateToDetails,
		fnNavigateToPrivacy,
		fnNavigateToNotification,
		fnNavigateToMore,

		fnNavigateToRoot,
		fnNavigateGoBack
	};
}
