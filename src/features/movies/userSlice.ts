import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { IMovie } from "../../types/types";

export interface userState {
  // todo понять зачем мне тут нужен Id
  id: string | null,
  email: string | null,
  password: string | null,
  watchedMovies: IMovie[],
}

const initialState: userState = {
  id: null,
  email: null,
  password: null,
  watchedMovies: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    addWatchedMovie(state, action) {
      state.watchedMovies.push(action.payload);
    },
    removeWatchedMovie(state, action) {
      state.watchedMovies = state.watchedMovies.filter((movie) => movie.id !== action.payload)
    }
  }
})

export const { setUser, addWatchedMovie, removeWatchedMovie } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;