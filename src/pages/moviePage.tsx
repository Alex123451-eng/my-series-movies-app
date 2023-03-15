import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { useMovies } from "../features/movies/useMovies";
import { useUser } from "../features/user/useUser";
import { ReactComponent as Star } from "./img/moviePage/star.svg";

import { colors, fontSizes, spacing } from "../constants/constants";

export const MoviePage = () => {
  const { saveMovieRating, movies } = useMovies();
  const { id } = useParams();
  const movie = movies.movies.find((movie) => movie.id === id);

  // console.log("movie ", movie);

  let currUserRating = 0;

  if (movie) {
    ({ currUserRating } = movie);
    if (currUserRating !== 5 && currUserRating !== 0) {
      currUserRating++;
    }
  }

  const [starsColors, setStarColors] = useState(
    [
      colors.transparent,
      colors.transparent,
      colors.transparent,
      colors.transparent,
      colors.transparent,
    ].fill(colors.white, 0, currUserRating)
  );

  const { user } = useUser();

  const onStarClick = (e: any) => {
    const number = e.target.dataset.number;

    if (number) {
      const newStarsColors = [...starsColors];

      newStarsColors.fill(colors.transparent);

      for (let i = 0; i <= number; i++) {
        newStarsColors[i] = colors.white;
      }

      setStarColors(newStarsColors);
      saveMovieRating(id, number);
    }
  };

  // todo понять как сделать так, чтобы данные всегда точно были,
  // чтобы убрать знаки вопроса
  return (
    <Wrapper>
      <Title>{movie?.title}</Title>
      <MovieInfo>
        <PosterRating>
          <MoviePoster src={movie?.img} alt="movie poster" />
          {user.id && (
            <StarBlock onClick={onStarClick}>
              <div data-number="0">
                <Star fill={starsColors[0]} stroke={colors.white} />
              </div>
              <div data-number="1">
                <Star fill={starsColors[1]} stroke={colors.white} />
              </div>
              <div data-number="2">
                <Star fill={starsColors[2]} stroke={colors.white} />
              </div>
              <div data-number="3">
                <Star fill={starsColors[3]} stroke={colors.white} />
              </div>
              <div data-number="4">
                <Star fill={starsColors[4]} stroke={colors.white} />
              </div>
            </StarBlock>
          )}
        </PosterRating>
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
