import { useUserMoviesData } from "../../features/userMoviesData/useUserMoviesData";
import { useMovies } from "../../features/movies/useMovies";

import {
  initEntityWithFirebaseData,
  addDataToFirebase,
} from "../../firebase/firebaseFirestore";

import {
  FIREBASE_MOVIES_COLLECTION,
  FIREBASE_USER_MOVIES_DATA_COLLECTION,
} from "../../constants/constants";

import { IMovie } from "../../types/types";

export const Rating = ({ movieId }: { movieId: string }) => {
  const { movies, saveMovies } = useMovies();

  const calculateRating = async () => {
    let estimateCount = 0;
    let estimateSum = 0;

    // const reratedMovie = movies.movies.find((movie) => movie.id === movieId);

    const reratedMovie = await initEntityWithFirebaseData(
      FIREBASE_USER_MOVIES_DATA_COLLECTION,
      movieId
    );

    const allUserMoviesData = await initEntityWithFirebaseData(
      FIREBASE_USER_MOVIES_DATA_COLLECTION
    );

    for (let userData of allUserMoviesData) {
      const movieData = Object.entries(userData.rating).find(
        ([id]) => id === movieId
      );
      if (movieData) {
        // todo понять, почему он тут хочет as
        estimateSum += movieData[1] as number;
        estimateCount++;
      }
    }

    const rating = estimateSum / estimateCount;

    const updatedMovie: IMovie = {
      ...reratedMovie,
      rating,
    };

    await addDataToFirebase(updatedMovie, FIREBASE_MOVIES_COLLECTION);

    const movies = await initEntityWithFirebaseData(FIREBASE_MOVIES_COLLECTION);
    saveMovies(movies);
  };

  return <>{calculateRating()}</>;
};
