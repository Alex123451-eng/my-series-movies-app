import { useState, useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import MovieCard from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { initMoviesWithFirebaseData } from "../firebase/firebaseFirestore";
import { setMovies } from "../features/movies/moviesSlice";

import { selectMovies } from "../features/movies/moviesSlice";

import { spacing } from "../constants/constants";

// import createMockData from "../utils/createMockData";
// import { addDataToFirebase } from "../firebase/firebaseAPI";
// const mockData = createMockData("moviesMockData");
// for (let i = 0; i < mockData.length; i++) {
//   addDataToFirebase(mockData[i]);
// }

const MainPage = () => {
  const movies = useAppSelector(selectMovies);
  const [isLoading, setIsLoading] = useState<boolean>(
    movies.movies.length ? false : true
  );
  const dispatch = useAppDispatch();

  const getMovies = async () => {
    const movies = await initMoviesWithFirebaseData();
    dispatch(setMovies(movies));
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
            movies.movies.map((movieData: any) => {
              const { id, title, description, img, releaseYear, rating } =
                movieData;
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

export default MainPage;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 153px);
  grid-gap: ${spacing.lg};
  justify-content: space-between;
`;
