import { NavigationContainer } from "@react-navigation/native"
import DrawerNavigator from "./DrawerNavigator"
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from "../routes/RouteConstants";


const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName={ROUTES.root}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={ROUTES.root} component={DrawerNavigator} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator
