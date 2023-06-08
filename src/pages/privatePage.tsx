import styled from "styled-components";

import { MovieCard } from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useMovies } from "../features/movies/useMovies";
import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";
import { useTheme } from "../features/theme/useTheme";

import { FONT_SIZES, SPACING, COLORS } from "../constants/styles";

import { IMovie, IStyledIsDarkTheme } from "../types/types";

export const PrivatePage = () => {
  const { watchedMovies } = useUserMoviesData().userMoviesData;
  const { movies } = useMovies();
  const { theme } = useTheme();

  const filteredMovies = movies.movies.filter((movie) =>
    watchedMovies.includes(movie.id)
  );

  return (
    <Wrapper>
      <Title isDarkTheme={theme.isDarkTheme}>Watched movies</Title>
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

const Title = styled.div<IStyledIsDarkTheme>`
  font-size: ${FONT_SIZES.lg};
  font-weight: 800;
  margin-bottom: ${SPACING.lg};
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.white : COLORS.black)};
`;

const MoviesWrapper = styled.div`
  padding: ${SPACING.lg};
  overflow-x: auto;
  display: flex;

  a:not(:last-child) {
    margin-right: ${SPACING.lg};
  }

  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px ${COLORS.gray};
    border-radius: ${SPACING.sm};
  }

  ::-webkit-scrollbar-thumb {
    background: ${COLORS.gray};
    border-radius: ${SPACING.sm};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.grayTransparent};
  }
`;
