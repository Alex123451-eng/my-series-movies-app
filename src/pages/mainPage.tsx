import { useState, useEffect } from "react";
import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useMovies } from "../features/movies/useMovies";

import { initEntityWithFirebaseData } from "../firebase/firebaseFirestore";

import { SPACING } from "../constants/styles";
import { FIREBASE_MOVIES_COLLECTION } from "../constants/constants";

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

  console.log("movies ", movies);

  const getMovies = async () => {
    setIsLoading(true);
    const movies = await initEntityWithFirebaseData(FIREBASE_MOVIES_COLLECTION);
    saveMovies(movies);
    setIsLoading(false);
  };

  // todo понять почему он у меня подчеркивает массив зависимостей
  useEffect(() => {
    if (!movies.movies.length) {
      getMovies();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        // todo поменять потом на нормальный загрузчик
        <div style={{ color: "white" }}>The data is still loading...</div>
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
            <div style={{ color: "white" }}>No movies...</div>
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
`;
