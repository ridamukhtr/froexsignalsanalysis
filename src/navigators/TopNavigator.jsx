import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ROUTES } from '../routes/RouteConstants';

const TopTabs = createMaterialTopTabNavigator();

const TopTabsNavigator = () => {
    return (
        <TopTabs.Navigator>
            <TopTabs.Screen name={ROUTES.screenHome} component={HomeScreen} />
            <TopTabs.Screen name={ROUTES.screenRoadMap} component={RoadMapScreen} />
        </TopTabs.Navigator>
    );
};

export default TopTabsNavigator;
