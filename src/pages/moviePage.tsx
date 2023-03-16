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
import { calculateGeneralRating } from "../utils/calculateGeneralRating";

import { COLORS, FONT_SIZES, SPACING } from "../constants/styles";
import { FIREBASE_USER_MOVIES_DATA_COLLECTION } from "../constants/firebase";

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
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
  ].fill(COLORS.white, 0, currUserRating);

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
        FIREBASE_USER_MOVIES_DATA_COLLECTION
      );

      const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
        FIREBASE_USER_MOVIES_DATA_COLLECTION,
        updatedUserMoviesData.id
      );

      calculateGeneralRating(id as string, movie, saveMovies);

      saveUserMoviesData(userMoviesDataFromFirebase);
    }
  };

  return (
    <Wrapper>
      <Title>{movie.title}</Title>
      <MovieInfo>
        <PosterRating>
          <MoviePoster src={movie.img} alt="movie poster" />
          {user.id && (
            <StarBlock onClick={onStarClick}>
              <div data-number="1">
                <Star fill={starsColors[0]} stroke={COLORS.white} />
              </div>
              <div data-number="2">
                <Star fill={starsColors[1]} stroke={COLORS.white} />
              </div>
              <div data-number="3">
                <Star fill={starsColors[2]} stroke={COLORS.white} />
              </div>
              <div data-number="4">
                <Star fill={starsColors[3]} stroke={COLORS.white} />
              </div>
              <div data-number="5">
                <Star fill={starsColors[4]} stroke={COLORS.white} />
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
  color: ${COLORS.white};
`;

const Title = styled.div`
  font-size: ${FONT_SIZES.xxl};
  text-align: center;
`;

const MoviePoster = styled.img`
  max-height: 268px;
  border-radius: ${SPACING.sm};
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
  margin-left: ${SPACING.lg};
`;

const Rating = styled.div`
  margin-bottom: ${SPACING.md};
`;

const ReleaseYear = styled.div`
  margin-bottom: ${SPACING.md};
`;

const Description = styled.div`
  text-align: justify;
`;
