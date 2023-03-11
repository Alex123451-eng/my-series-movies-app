import styled from "styled-components";

import { IMovie } from "../types/types";

import MovieCard from "../components/movieCard/movieCard";
import { MovieLink } from "../components/movieLink/movieLink";

import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/movies/userSlice";

import { fontSizes, spacing, colors } from "../constants/constants";

const PrivatePage = () => {
  const { watchedMovies } = useAppSelector(selectUser);

  return (
    <Wrapper>
      <Title>Watched movies</Title>
      <MoviesWrapper>
        {watchedMovies.map((movie: IMovie) => {
          const { id, title, description, img, releaseYear, rating } = movie;
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
      </MoviesWrapper>
    </Wrapper>
  );
};

export default PrivatePage;

const Wrapper = styled.div`
  height: 500px;
`;

const Title = styled.div`
  font-size: ${fontSizes.lg};
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
