import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

const initialState = {
  isDarkTheme: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
