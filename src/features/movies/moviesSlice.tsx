import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IMovie } from "../../types/types";

export interface MovieState {
  movies: IMovie[];
}

const initialState: MovieState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = [...action.payload];
    },
    // setMovieRating(state, action) {
    //   const { id, currUserRating } = action.payload;
    //   console.log("id, currUserRating ", id, +currUserRating + 1);
    //   const movie = state.movies.find((movie) => movie.id === id);
    //   if (movie) {
    //     movie.currUserRating = currUserRating;
    //   }
    // },
  },
});

export const { setMovies } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;
