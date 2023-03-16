import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Star } from "./img/moviePage/star.svg";

import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";
import { useUser } from "../features/user/useUser";
import { useMovies } from "../features/movies/useMovies";

import {
  addDataToFirebase,
  initEntityWithFirebaseData,
} from "../firebase/firebaseFirestore";
import { calculateRating } from "../utils/calculateRating";

import {
  colors,
  fontSizes,
  spacing,
  firebaseUserMoviesDataCollection,
} from "../constants/constants";

import { IMovie } from "../types/types";

export const MoviePage = () => {
  const { saveUserMoviesData, userMoviesData } = useUserMoviesData();
  const { movies, saveMovies } = useMovies();
  const { user } = useUser();

  const { id } = useParams();

  const movieData = Object.entries(userMoviesData.rating).find(
    ([ratedMovieId]) => ratedMovieId === id
  );
  const currUserRating = movieData?.[1] || 0;

  const starsColors = [
    colors.transparent,
    colors.transparent,
    colors.transparent,
    colors.transparent,
    colors.transparent,
  ].fill(colors.white, 0, currUserRating);

  const movie = movies.movies.find((movie) => movie.id === id) as IMovie;

  const onStarClick = async (e: any) => {
    const number = e.target.dataset.number;

    if (number) {
      const updatedUserMoviesData = {
        ...userMoviesData,
        rating: {
          ...userMoviesData.rating,
          [id as string]: number,
        },
      };

      await addDataToFirebase(
        updatedUserMoviesData,
        firebaseUserMoviesDataCollection
      );

      const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
        firebaseUserMoviesDataCollection,
        updatedUserMoviesData.id
      );

      calculateRating(id as string, movie, saveMovies);

      saveUserMoviesData(userMoviesDataFromFirebase);
    }
  };

  // todo понять как сделать так, чтобы данные всегда точно были,
  // чтобы убрать знаки вопроса
  return (
    <Wrapper>
      <Title>{movie.title}</Title>
      <MovieInfo>
        <PosterRating>
          <MoviePoster src={movie.img} alt="movie poster" />
          {user.id && (
            <StarBlock onClick={onStarClick}>
              <div data-number="1">
                <Star fill={starsColors[0]} stroke={colors.white} />
              </div>
              <div data-number="2">
                <Star fill={starsColors[1]} stroke={colors.white} />
              </div>
              <div data-number="3">
                <Star fill={starsColors[2]} stroke={colors.white} />
              </div>
              <div data-number="4">
                <Star fill={starsColors[3]} stroke={colors.white} />
              </div>
              <div data-number="5">
                <Star fill={starsColors[4]} stroke={colors.white} />
              </div>
            </StarBlock>
          )}
        </PosterRating>
        <MovieText>
          Rating
          <Rating>{movie.rating}</Rating>
          Release year
          <ReleaseYear>{movie.releaseYear}</ReleaseYear>
          Description
          <Description>{movie.description}</Description>
        </MovieText>
      </MovieInfo>
    </Wrapper>
  );
};

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

const PosterRating = styled.div`
  position: relative;
`;

const StarBlock = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  display: flex;
  justify-content: space-between;

  div {
    cursor: pointer;
  }

  svg {
    pointer-events: none;
  }
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
