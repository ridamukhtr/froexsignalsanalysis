import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabsNavigator from './BottomNavigator';
import { ROUTES } from '../routes/RouteConstants';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name={ROUTES.root} component={BottomTabsNavigator} />
            {/* <Drawer.Screen name={ROUTES.screenHome} component={ProfileScreen} /> */}
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
