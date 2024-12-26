// import slices
import themeReducer from './themeReducer';
import LoaderReducer from './LoaderReducer';
import forexSignalapi from './storeApis';
// import packages
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
	reducer: {
		LoaderReducer,
		themeReducer,
		[forexSignalapi.reducerPath]: forexSignalapi.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(forexSignalapi.middleware)
});
