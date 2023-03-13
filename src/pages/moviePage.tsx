import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import { selectMovies } from "../features/movies/moviesSlice";

import { colors, fontSizes, spacing } from "../constants/constants";

const MoviePage = () => {
  const movies = useAppSelector(selectMovies);
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const movie = movies.movies.find((movie) => movie.id === id);
  console.log("movie ", movie);

  // todo понять как сделать так, чтобы данные всегда точно были,
  // чтобы убрать знаки вопроса
  return (
    <Wrapper>
      <Title>{movie?.title}</Title>
      <MovieInfo>
        <MoviePoster src={movie?.img} alt="movie poster" />
        <MovieText>
          Rating
          <Rating>{movie?.rating}</Rating>
          Release year
          <ReleaseYear>{movie?.releaseYear}</ReleaseYear>
          Description
          <Description>{movie?.description}</Description>
        </MovieText>
      </MovieInfo>
    </Wrapper>
  );
};

export default MoviePage;

const Wrapper = styled.div`
  color: ${colors.white};
`;

const Title = styled.div`
  font-size: ${fontSizes.xxl};
  text-align: center;
`;

const MoviePoster = styled.img`
  max-height: 268px;
  border-radius: ${spacing.sm};
`;

const MovieInfo = styled.div`
  display: flex;
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${spacing.lg};
`;

const Rating = styled.div`
  margin-bottom: ${spacing.md};
`;

const ReleaseYear = styled.div`
  margin-bottom: ${spacing.md};
`;

const Description = styled.div`
  text-align: justify;
`;
