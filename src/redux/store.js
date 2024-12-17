import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeReducer';
import forexSignalapi from './storeApis'; 

export const store = configureStore({
    reducer: {
        themeReducer,
        [forexSignalapi.reducerPath]: forexSignalapi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(forexSignalapi.middleware), 
});
