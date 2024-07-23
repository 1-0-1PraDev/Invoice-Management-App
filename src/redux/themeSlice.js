import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: false,
    reducers: {
        toggleTheme: (state, action) => {
            return !state;
        }
    }
});

export default themeSlice;