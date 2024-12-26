import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'LoaderReducer',
    initialState: {
        isLoading: false,
    },
    reducers: {
        showLoader: (state, action) => {
            state.isLoading = true
        },
        hideLoader: (state, action) => {
            state.isLoading = false
        },
        setIsLoading: (state, action) => {
            console.log(action.payload);
            state.isLoading = action.payload
        },
        resetLoaderRequset: (state, action) => {
            state.isLoading = false
        }
    }
})

export const { showLoader, hideLoader, setIsLoading, resetLoaderRequset } = slice.actions;

export const selectedIsLoading = (state) => state.LoaderReducer.isLoading;

export default slice.reducer;