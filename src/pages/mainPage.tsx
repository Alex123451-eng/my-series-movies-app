import { useState, useEffect } from "react";
import styled from "styled-components";

import MovieCard from "../components/movieCard/movieCard";

import { initMoviesWithFirebaseData } from "../firebase/firebaseAPI";

import { Movie } from "../types/types";

// import createMockData from "../utils/createMockData";
// import { addDataToFirebase } from "../firebase/firebaseAPI";
// const mockData = createMockData("moviesMockData");
// for (let i = 0; i < mockData.length; i++) {
//   addDataToFirebase(mockData[i]);
// }

const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    initMoviesWithFirebaseData().then((movies) => {
      setMovies(movies);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        // todo поменять потом на нормальный загрузчик
        <div style={{ color: "white" }}>The data is still loading...</div>
      ) : (
        <ContentWrapper>
          {movies &&
            movies.map((movieData) => {
              const { id, title, description, img, releaseYear, rating } =
                movieData;
              return (
                <MovieCard
                  key={id}
                  title={title}
                  description={description}
                  img={img}
                  releaseYear={releaseYear}
                  rating={rating}
                />
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
  grid-gap: 20px;
  justify-content: center;
`;
