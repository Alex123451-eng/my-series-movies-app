import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setMovies, selectMovies } from "./moviesSlice";

import { IMovie } from "../../types/types";

export const useMovies = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);

  const saveMovies = (movies: IMovie[]) => {
    dispatch(setMovies(movies));
  };

  return { saveMovies, movies };
};
