// NavigationService.js
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export const NavigationService = {
  navigate: (name, params) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  }
};