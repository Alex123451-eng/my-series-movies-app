import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { IUser } from "../../types/types";

const initialState : IUser = {
  id: '',
  email: '',
  password: '',
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.isAuth = action.payload.isAuth;
    },
  }
})

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;