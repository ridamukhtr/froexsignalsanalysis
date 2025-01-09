import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
	name: 'themeReducer',
	initialState: {
		theme: 'dark'
	},
	reducers: {
		changeTheme: (state, action) => {
			state.theme = action.payload;
			AsyncStorage.setItem('userTheme', action.payload);
		},
		setInitialTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { changeTheme, setInitialTheme } = slice.actions;
export const selectedThemeSelector = state => state.themeReducer.theme;
export default slice.reducer;
