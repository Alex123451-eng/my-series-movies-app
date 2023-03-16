import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useMovies } from "../features/movies/useMovies";
import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";

import { FONT_SIZES, spacing, colors } from "../constants/constants";

import { IMovie } from "../types/types";

export const PrivatePage = () => {
  const { watchedMovies } = useUserMoviesData().userMoviesData;
  const { movies } = useMovies();

  const filteredMovies = movies.movies.filter((movie) =>
    watchedMovies.includes(movie.id)
  );

  return (
    <Wrapper>
      <Title>Watched movies</Title>
      <MoviesWrapper>
        {filteredMovies.map((movie: IMovie) => {
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
        })}
      </MoviesWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 500px;
`;

const Title = styled.div`
  font-size: ${FONT_SIZES.lg};
  font-weight: 800;
  margin-bottom: ${spacing.lg};
  color: ${colors.white};
`;

const MoviesWrapper = styled.div`
  padding: ${spacing.lg};
  overflow-x: auto;
  display: flex;

  a:not(:last-child) {
    margin-right: ${spacing.lg};
  }

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${colors.gray};
    border-radius: ${spacing.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${colors.gray};
    border-radius: ${spacing.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.grayTransparent};
  }
`;
