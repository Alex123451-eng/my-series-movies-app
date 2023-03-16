import styled from "styled-components";

import { useUser } from "../../features/user/useUser";
import { useUserMoviesData } from "../../features/userMoviesData/useUserMoviesData";

import {
  addDataToFirebase,
  initEntityWithFirebaseData,
} from "../../firebase/firebaseFirestore";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { FIREBASE_USER_MOVIES_DATA_COLLECTION } from "../../constants/firebase";

// todo вынести это в дженерик или интерфейс?
// todo понять правильно ли по синтаксису, что типы пропсов перечисляются через ";"?
export const MovieCard = ({
  id,
  title,
  img,
  releaseYear,
  rating,
}: {
  id: string;
  title: string;
  img: string;
  releaseYear: number;
  rating: number;
}) => {
  const { user } = useUser();
  const { saveUserMoviesData, userMoviesData } = useUserMoviesData();

  const isMovieWatched = userMoviesData.watchedMovies.includes(id);

  const onCheckClick = async (e: any) => {
    e.preventDefault();

    let updatedUserMoviesData;

    if (isMovieWatched) {
      const watchedMovies = userMoviesData.watchedMovies.filter(
        (watchedMovieId) => watchedMovieId !== id
      );

      updatedUserMoviesData = {
        ...userMoviesData,
        watchedMovies,
      };
    } else {
      updatedUserMoviesData = {
        ...userMoviesData,
        watchedMovies: [...userMoviesData.watchedMovies, id],
      };
    }

    await addDataToFirebase(
      updatedUserMoviesData,
      FIREBASE_USER_MOVIES_DATA_COLLECTION
    );

    const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
      FIREBASE_USER_MOVIES_DATA_COLLECTION,
      updatedUserMoviesData.id
    );

    saveUserMoviesData(userMoviesDataFromFirebase);
  };

  return (
    <MovieCardWrapper>
      <InfoPreview>
        <div>Rating</div>
        {rating}
        <div>Release year</div>
        {releaseYear}
      </InfoPreview>
      {user.id && (
        <CheckWrapper onClick={onCheckClick}>
          {isMovieWatched && <Check>&#10003;</Check>}
        </CheckWrapper>
      )}
      <MovieImg src={img} alt="movie poster" />
      <MovieTitle>{title}</MovieTitle>
    </MovieCardWrapper>
  );
};

const MovieCardWrapper = styled.div`
  position: relative;
  width: 153px;
  display: flex;
  flex-direction: column;
  color: ${COLORS.white};
  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  &: hover {
    transform: scale(1.05);
  }
`;

const CheckWrapper = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0;
  border-radius: 0 ${SPACING.sm} 0 0;
  background: ${COLORS.blackThickTransparent};
`;

const Check = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${FONT_SIZES.lg};
  pointer-events: none;
`;

const InfoPreview = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  opacity: 0;
  flex-direction: column;
  align-items: start;
  text-align: left;
  padding: ${SPACING.xxxxl} 0 0 ${SPACING.md};
  justify-content: center;
  background-color: ${COLORS.blackTransparent};
  transition: 0.3s;

  ${MovieCardWrapper}: hover & {
    opacity: 1;
  }
`;

const MovieImg = styled.img`
  border-radius: ${SPACING.sm};
`;

const MovieTitle = styled.div`
  padding-top: ${SPACING.sm};
`;
