import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IUser } from "../../types/types";

const initialState : IUser = {
  id: null,
  email: null,
  password: null,
  watchedMovies: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.watchedMovies = action.payload.watchedMovies;
    },
  }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;