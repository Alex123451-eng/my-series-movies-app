import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import moviesReducer from '../features/movies/moviesSlice'
import userReducer from '../features/user/userSlice'
import userMoviesDataReducer from '../features/userMoviesData/userMoviesDataSlice'
import themeReducer from '../features/theme/themeSlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  movies: moviesReducer,
  user: userReducer,
  userMoviesData: userMoviesDataReducer,
  theme: themeReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

console.log(store.getState())

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
