import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'themeReducer',
	initialState: {
		theme: 'dark',
		key: 0,
	},
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
			state.key += 1;
			AsyncStorage.setItem('userTheme', action.payload);
		},
		setInitialTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { changeTheme, setInitialTheme } = slice.actions;
export const selectedThemeSelector = state => state.themeReducer.theme;
export const themeKeySelector = state => state.themeReducer.key;
export default slice.reducer;
