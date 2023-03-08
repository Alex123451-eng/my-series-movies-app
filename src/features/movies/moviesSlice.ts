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
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = [...action.payload];
    }
  }
})

export const { setMovies } = moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;