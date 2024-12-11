import { NavigationContainer } from "@react-navigation/native"
import DrawerNavigator from "./DrawerNavigator"
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from "../routes/RouteConstants";
import BottomNavigation from "./BottomNavigator";
import BottomNavigator from "./BottomNavigator";


const Stack = createStackNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName={ROUTES.drawer}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={ROUTES.drawer} component={DrawerNavigator} />
        {/* <Stack.Screen name={ROUTES.bottomTabs} component={BottomNavigator}/> */}

      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default AppNavigator
