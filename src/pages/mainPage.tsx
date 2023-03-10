import { useState, useEffect } from "react";
import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useMovies } from "../features/movies/useMovies";

import { initMoviesWithFirebaseData } from "../firebase/firebaseFirestore";

import { spacing } from "../constants/constants";

import { IMovie } from "../types/types";

// import createMockData from "../utils/createMockData";
// import { addDataToFirebase } from "../firebase/firebaseAPI";
// const mockData = createMockData("moviesMockData");
// for (let i = 0; i < mockData.length; i++) {
//   addDataToFirebase(mockData[i]);
// }

export const MainPage = () => {
  const { saveMovies, movies } = useMovies();

  const [isLoading, setIsLoading] = useState<boolean>(
    movies.movies.length ? false : true
  );

  const getMovies = async () => {
    const movies = await initMoviesWithFirebaseData();
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
          {movies.movies &&
            movies.movies.map((movie: IMovie) => {
              const { id, title, description, img, releaseYear, rating } =
                movie;
              return (
                <MovieLink key={id} id={id}>
                  <MovieCard
                    id={id}
                    title={title}
                    description={description}
                    img={img}
                    releaseYear={releaseYear}
                    rating={rating}
                  />
                </MovieLink>
              );
            })}
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
