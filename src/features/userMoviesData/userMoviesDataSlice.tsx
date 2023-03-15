import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IUserMoviesData } from "../../types/types";

const initialState: IUserMoviesData = {
  currUserRating: {},
  watchedMovies: [],
};

const userMoviesDataSlice = createSlice({
  name: "userMoviesData",
  initialState,
  reducers: {
    setUserMoviesData(state, action) {
      state = action.payload;
    },
  },
});

export const { setUserMoviesData } = userMoviesDataSlice.actions;

export const selectUserMovieData = (state: RootState) => state.userMoviesData;

export default userMoviesDataSlice.reducer;
