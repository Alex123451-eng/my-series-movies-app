import { useParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as Star } from "../img/pages/moviePage/star.svg";

import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";
import { useUser } from "../features/user/useUser";
import { useMovies } from "../features/movies/useMovies";
import { useTheme } from "../features/theme/useTheme";

import {
  addDataToFirebase,
  initEntityWithFirebaseData,
} from "../firebase/firebaseFirestore";
import { calculateGeneralRating } from "../utils/calculateGeneralRating";

import { COLORS, FONT_SIZES, SPACING } from "../constants/styles";
import { FIREBASE_USER_MOVIES_DATA_COLLECTION } from "../constants/firebase";
import { MEDIA } from "../constants/media";

import { IMovie, IStyledWrapper } from "../types/types";

export const MoviePage = () => {
  const { saveUserMoviesData, userMoviesData } = useUserMoviesData();
  const { movies, saveMovies } = useMovies();
  const { user } = useUser();
  const { theme } = useTheme();

  const { id } = useParams();

  const movieData = Object.entries(userMoviesData.rating).find(
    ([ratedMovieId]) => ratedMovieId === id
  );
  const currUserRating = movieData?.[1] || 0;

  const colorsToFill = theme.isDarkTheme ? COLORS.white : COLORS.black;

  const starsColors = [
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
    COLORS.transparent,
  ].fill(colorsToFill, 0, currUserRating);

  const starsArray: any = [];

  for (let i = 0; i < 5; i++) {
    starsArray.push(
      <div data-number={i + 1}>
        <Star
          fill={starsColors[i]}
          stroke={theme.isDarkTheme ? COLORS.white : COLORS.black}
        />
      </div>
    );
  }

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
    <Wrapper isDarkTheme={theme.isDarkTheme}>
      <Title>{movie.title}</Title>
      <MovieInfo>
        <PosterRating>
          <MoviePoster src={movie.img} alt="movie poster" />
          {user.id && <StarBlock onClick={onStarClick}>{starsArray}</StarBlock>}
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

const Wrapper = styled.div<IStyledWrapper>`
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.white : COLORS.black)};
`;

const Title = styled.div`
  font-size: ${FONT_SIZES.xxl};
  text-align: center;

  @media ${MEDIA.laptop} {
    margin-bottom: ${SPACING.lg};
  }
`;

const MoviePoster = styled.img`
  max-height: 268px;
  border-radius: ${SPACING.sm};
`;

const PosterRating = styled.div`
  position: relative;

  @media ${MEDIA.laptop} {
    align-self: center;
    margin-bottom: ${SPACING.xl};
  }
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

  @media ${MEDIA.laptop} {
    flex-direction: column;
  }
`;

const MovieText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${SPACING.lg};

  @media ${MEDIA.laptop} {
    margin-left: 0;
  }
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
