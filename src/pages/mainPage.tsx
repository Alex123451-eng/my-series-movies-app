import { useState, useEffect } from "react";
import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";
import { Loader } from "../components/loader/loader";

import { useMovies } from "../features/movies/useMovies";

import { initEntityWithFirebaseData } from "../firebase/firebaseFirestore";

import { COLORS, SPACING } from "../constants/styles";
import { FIREBASE_MOVIES_COLLECTION } from "../constants/firebase";
import { MEDIA } from "../constants/media";

import { IMovie } from "../types/types";

// import { createMockData } from "../utils/createMockData";
// import { addDataToFirebase } from "../firebase/firebaseFirestore";
// const mockMoviesData = createMockData();
// console.log("mockMoviesData ", mockMoviesData);
// for (let i = 0; i < mockMoviesData.length; i++) {
//   addDataToFirebase(mockMoviesData[i], FIREBASE_MOVIES_COLLECTION);
// }

export const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { saveMovies, movies } = useMovies();

  const getMovies = async () => {
    setIsLoading(true);
    const movies = await initEntityWithFirebaseData(FIREBASE_MOVIES_COLLECTION);
    saveMovies(movies);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!movies.movies.length) {
      getMovies();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ContentWrapper>
          {movies.movies.length ? (
            movies.movies.map((movie: IMovie) => {
              const { id, title, img, releaseYear, rating } = movie;
              return (
                <MovieLink key={id} id={id}>
                  <MovieCard
                    id={id}
                    title={title}
                    img={img}
                    releaseYear={releaseYear}
                    rating={rating}
                  />
                </MovieLink>
              );
            })
          ) : (
            <NoMovies>No movies...</NoMovies>
          )}
        </ContentWrapper>
      )}
    </>
  );
};

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 153px);
  grid-gap: ${SPACING.lg};
  justify-content: space-between;

  @media ${MEDIA.mobile} {
    justify-content: space-evenly;
  }
`;

const NoMovies = styled.div`
  color: ${COLORS.white};
`;
