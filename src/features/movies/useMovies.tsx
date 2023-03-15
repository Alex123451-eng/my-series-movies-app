import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { setMovies, setMovieRating, selectMovies } from "./moviesSlice";

import { IMovie } from "../../types/types";

export const useMovies = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);

  const saveMovies = (movies: IMovie[]) => {
    dispatch(setMovies(movies));
  };

  const saveMovieRating = (id: any, currUserRating: number) => {
    dispatch(setMovieRating({ id, currUserRating }));
  };

  return { saveMovies, saveMovieRating, movies };
};
