import {
  addDataToFirebase,
  initEntityWithFirebaseData,
} from "../firebase/firebaseFirestore";

import {
  FIREBASE_USER_MOVIES_DATA_COLLECTION,
  FIREBASE_MOVIES_COLLECTION,
} from "../constants/constants";

import { IMovie } from "../types/types";

// todo понять, ничего что я написал тут movies (внизу тоже movies написано)
// не будет в какой-то момент конфликта?
export const calculateGeneralRating = async (
  id: string,
  movie: IMovie,
  saveMovies: (movies: IMovie[]) => void
) => {
  let estimateCount = 0;
  let estimateSum = 0;

  const allUserMoviesData = await initEntityWithFirebaseData(
    FIREBASE_USER_MOVIES_DATA_COLLECTION
  );

  for (let userData of allUserMoviesData) {
    const movieData = Object.entries(userData.rating).find(
      ([ratedMovieId]) => ratedMovieId === id
    );
    if (movieData) {
      // todo понять, почему он тут пишет ошибку на унарный плюс
      estimateSum += Number(movieData[1]);
      estimateCount++;
    }
  }

  const rating = +(estimateSum / estimateCount).toFixed(1);

  const updatedMovie = {
    ...movie,
    rating,
  };
  await addDataToFirebase(updatedMovie, FIREBASE_MOVIES_COLLECTION);

  const movies = await initEntityWithFirebaseData(FIREBASE_MOVIES_COLLECTION);
  saveMovies(movies);
};
