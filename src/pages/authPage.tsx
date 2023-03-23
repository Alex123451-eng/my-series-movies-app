import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { ToastContainer } from "../toastify/toastify";

import { useUser } from "../features/user/useUser";
import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";

import { addDataToFirebase } from "../firebase/firebaseFirestore";
import { initEntityWithFirebaseData } from "../firebase/firebaseFirestore";
import { notifyError } from "../toastify/toastify";

import { firebaseAuth } from "../firebase/firebaseAuth";
import { COLORS, FONT_SIZES, SPACING } from "../constants/styles";
import { ROUTES } from "../constants/routes";
import {
  FIREBASE_USERS_COLLECTION,
  FIREBASE_USER_MOVIES_DATA_COLLECTION,
} from "../constants/firebase";
import { MEDIA } from "../constants/media";

export const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { saveUser } = useUser();
  const { saveUserMoviesData } = useUserMoviesData();

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    target.name === "email"
      ? setEmail(target.value)
      : setPassword(target.value);
  };

  // todo починить any
  const handleAuth = async (e: any) => {
    const { name } = e.target;

    let id;

    try {
      if (name === "Sign up") {
        const userCredential = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        id = userCredential.user.uid;

        const newUser = {
          id,
          email,
          password,
          isAuth: true,
        };
        await addDataToFirebase(newUser, FIREBASE_USERS_COLLECTION);

        const newUserMoviesData = {
          id,
          rating: {},
          watchedMovies: [],
        };
        await addDataToFirebase(
          newUserMoviesData,
          FIREBASE_USER_MOVIES_DATA_COLLECTION
        );
      } else {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        id = userCredential.user.uid;
      }

      const userFromFirebase = await initEntityWithFirebaseData(
        FIREBASE_USERS_COLLECTION,
        id
      );
      saveUser(userFromFirebase);

      const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
        FIREBASE_USER_MOVIES_DATA_COLLECTION,
        id
      );
      saveUserMoviesData(userMoviesDataFromFirebase);

      navigate(ROUTES.private);
      // todo починить any
    } catch (err: any) {
      notifyError(`${err.name}: ${err.code}`);
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>
          <div> Welcome to the Alexis Movies!</div>
          Register for the full user experience.
        </Title>

        <InputBlock>
          <label htmlFor="email">Enter your email please</label>
          <EmailInput
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChangeInput}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="password">Enter your password please</label>
          <PasswordInput
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </InputBlock>

        <ButtonsBlock>
          <Button onClick={handleAuth} name="Login">
            Login
          </Button>
          <Button onClick={handleAuth} name="Sign up">
            Sign up
          </Button>
        </ButtonsBlock>
        <ImgWrapper>
          <img
            src="./img/pages/authPage/login-site-logo.png"
            alt="big site logo"
          />
        </ImgWrapper>
      </InnerWrapper>
      <ToastContainer />
    </Wrapper>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  margin-top: ${SPACING.md};
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: ${SPACING.md} 0;
  max-width: 540px;
  margin: 0 auto;
  background: ${COLORS.white};
  border-radius: ${SPACING.sm};
`;

const InnerWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: ${FONT_SIZES.lg};
  text-align: center;
`;

const InputBlock = styled.div`
  margin: ${SPACING.md} auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${MEDIA.mobile} {
    flex-direction: column;
  }
`;

const inputStyles = css`
  padding-left: ${SPACING.md};
  margin-left: ${SPACING.md};
  font-size: ${FONT_SIZES.md};
  border: 1px solid ${COLORS.gray};
  border-radius: ${SPACING.sm};
  height: 35px;

  &:focus {
    outline: none;
  }

  @media ${MEDIA.mobile} {
    margin-left: 0;
  }
`;

const EmailInput = styled.input`
  ${inputStyles}
`;
const PasswordInput = styled.input`
  ${inputStyles}
`;

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${MEDIA.mobile} {
    align-items: center;
    flex-direction: column;
    height: 88px;
  }
`;

const Button = styled.button`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${COLORS.gray};
  border-radius: ${SPACING.sm};
  background: ${COLORS.white};
  padding: ${SPACING.sm} 0;
  width: 217px;

  &:hover {
    background: ${COLORS.whiteActive};
  }
`;
