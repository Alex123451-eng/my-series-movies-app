import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IUserMoviesData } from "../../types/types";

const initialState: IUserMoviesData = {
  id: "",
  rating: {},
  watchedMovies: [],
};

const userMoviesDataSlice = createSlice({
  name: "userMoviesData",
  initialState,
  reducers: {
    setUserMoviesData(state, action) {
      const { id, rating, watchedMovies } = action.payload;
      state.id = id;
      state.rating = rating;
      state.watchedMovies = watchedMovies;
    },
  },
});

export const { setUserMoviesData } = userMoviesDataSlice.actions;

export const selectUserMoviesData = (state: RootState) => state.userMoviesData;

export default userMoviesDataSlice.reducer;
