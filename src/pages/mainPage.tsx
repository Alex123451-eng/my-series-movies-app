import { useState, useEffect } from "react";
import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useMovies } from "../features/movies/useMovies";

import { initEntityWithFirebaseData } from "../firebase/firebaseFirestore";

import { spacing, firebaseMoviesCollection } from "../constants/constants";

import { IMovie } from "../types/types";

// import { createMockData } from "../utils/createMockData";
// import { addDataToFirebase } from "../firebase/firebaseFirestore";
// const mockMoviesData = createMockData();
// console.log("mockMoviesData ", mockMoviesData);
// for (let i = 0; i < mockMoviesData.length; i++) {
//   addDataToFirebase(mockMoviesData[i], firebaseMoviesCollection);
// }

export const MainPage = () => {
  // todo понять как не подгружать фильмы каждый раз на главной странице (если они уже есть в redux)?
  const [isLoading, setIsLoading] = useState(true);

  const { saveMovies, movies } = useMovies();

  console.log("movies ", movies);

  const getMovies = async () => {
    const movies = await initEntityWithFirebaseData(firebaseMoviesCollection);
    saveMovies(movies);
    setIsLoading(false);
  };

  // todo понять почему он у меня подчеркивает массив зависимостей
  useEffect(() => {
    getMovies();
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
  grid-gap: ${spacing.lg};
  justify-content: space-between;
`;
