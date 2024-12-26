// import packages
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import route
import { ROUTES } from '../routes/RouteConstants';
// import navigator
import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={ROUTES.drawer} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ROUTES.drawer} component={DrawerNavigator} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigator;
