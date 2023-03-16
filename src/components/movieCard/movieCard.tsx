import styled from "styled-components";

import { useUser } from "../../features/user/useUser";
import { useUserMoviesData } from "../../features/userMoviesData/useUserMoviesData";

import {
  addDataToFirebase,
  initEntityWithFirebaseData,
} from "../../firebase/firebaseFirestore";

import {
  colors,
  fontSizes,
  spacing,
  firebaseUserMoviesDataCollection,
} from "../../constants/constants";

import { IUser } from "../../types/types";

// todo вынести это в дженерик или интерфейс?
// todo понять правильно ли по синтаксису, что типы пропсов перечисляются через ";"?
export const MovieCard = ({
  id,
  title,
  description,
  img,
  releaseYear,
  rating,
}: {
  id: string;
  title: string;
  description: string;
  img: string;
  releaseYear: number;
  rating: number;
}) => {
  const { saveUser, user } = useUser();
  const { saveUserMoviesData, userMoviesData } = useUserMoviesData();

  const isMovieWatched = userMoviesData.watchedMovies.includes(id);

  const onCheckClick = async (e: any) => {
    e.preventDefault();
    console.log("userMoviesData ", userMoviesData);
    console.log("isMovieWatched ", isMovieWatched);

    let updatedUserMoviesData;

    if (isMovieWatched) {
      const watchedMovies = userMoviesData.watchedMovies.filter(
        (localId) => localId !== id
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
      firebaseUserMoviesDataCollection
    );

    const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
      firebaseUserMoviesDataCollection,
      updatedUserMoviesData.id
    );

    saveUserMoviesData(userMoviesDataFromFirebase);

    // let updatedUser;

    // if (isMovieWatched) {
    //   const watchedMovies = user.watchedMovies.filter(
    //     (movie) => movie.id !== id
    //   );

    //   updatedUser = {
    //     ...user,
    //     watchedMovies,
    //   };
    // } else {
    //   updatedUser = {
    //     ...user,
    //     watchedMovies: [
    //       ...user.watchedMovies,
    //       { id, title, description, img, releaseYear, rating, currUserRating },
    //     ],
    //   };
    // }

    // await addDataToFirebase(updatedUser, firebaseUsersCollection);

    // const userFromFirebase = await initUserWithFirebaseData(updatedUser.id);

    // saveUser(userFromFirebase);
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
  color: ${colors.white};
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
  border-radius: 0 ${spacing.sm} 0 0;
  background: ${colors.blackThickTransparent};
`;

const Check = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${fontSizes.lg};
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
  padding: ${spacing.xxxxl} 0 0 ${spacing.md};
  justify-content: center;
  background-color: ${colors.blackTransparent};
  transition: 0.3s;

  ${MovieCardWrapper}: hover & {
    opacity: 1;
  }
`;

const MovieImg = styled.img`
  border-radius: ${spacing.sm};
`;

const MovieTitle = styled.div`
  padding-top: ${spacing.sm};
`;
