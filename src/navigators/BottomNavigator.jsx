import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../routes/RouteConstants';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
    return (
        <BottomTabs.Navigator>
            <BottomTabs.Screen name={ROUTES.screenHome} component={HomeScreen} />
            <BottomTabs.Screen name={ROUTES.screenRoadMap} component={RoadMapScreen} />
        </BottomTabs.Navigator>
    );
};

export default BottomTabsNavigator;
