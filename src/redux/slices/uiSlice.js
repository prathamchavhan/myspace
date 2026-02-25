import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'dark',
    isContactModalOpen: false,
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
        },
        setContactModalOpen: (state, action) => {
            state.isContactModalOpen = action.payload;
        },
    },
});

export const { toggleTheme, setContactModalOpen } = uiSlice.actions;
export default uiSlice.reducer;
