import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useUser } from "../features/user/useUser";
import { useUserMoviesData } from "../features/userMoviesData/useUserMoviesData";

import { addDataToFirebase } from "../firebase/firebaseFirestore";
import { initEntityWithFirebaseData } from "../firebase/firebaseFirestore";

import { firebaseAuth } from "../firebase/firebaseAuth";
import {
  colors,
  fontSizes,
  spacing,
  firebaseUsersCollection,
  firebaseUserMoviesDataCollection,
} from "../constants/constants";

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

        // todo понять почему у меня на поле isAuth не ругается ts
        const newUser = {
          id,
          email,
          password,
          isAuth: true,
        };
        await addDataToFirebase(newUser, firebaseUsersCollection);

        const newUserMoviesData = {
          id,
          rating: {},
          watchedMovies: [],
        };
        await addDataToFirebase(
          newUserMoviesData,
          firebaseUserMoviesDataCollection
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
        firebaseUsersCollection,
        id
      );
      saveUser(userFromFirebase);

      const userMoviesDataFromFirebase = await initEntityWithFirebaseData(
        firebaseUserMoviesDataCollection,
        id
      );
      saveUserMoviesData(userMoviesDataFromFirebase);

      navigate("/private");
    } catch (err) {
      alert(err);
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
    </Wrapper>
  );
};

const ImgWrapper = styled.div`
  display: flex;
  margin-top: ${spacing.md};
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: ${spacing.md} 0;
  width: 40%;
  min-width: 540px;
  margin: 0 auto;
  height: 465px;
  background: ${colors.white};
  border-radius: ${spacing.sm};
`;

const InnerWrapper = styled.div`
  width: 85%;
  margin: 0 auto;
`;

const Title = styled.div`
  font-size: ${fontSizes.lg};
  text-align: center;
`;

const InputBlock = styled.div`
  margin: ${spacing.md} auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const inputStyles = css`
  padding-left: ${spacing.md};
  margin-left: ${spacing.md};
  font-size: ${fontSizes.md};
  border: 1px solid ${colors.gray};
  border-radius: ${spacing.sm};
  height: 35px;

  &:focus {
    outline: none;
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
`;

const Button = styled.button`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${colors.gray};
  border-radius: ${spacing.sm};
  background: ${colors.white};
  padding: ${spacing.sm} 0;
  width: 217px;

  &:hover {
    background: ${colors.whiteActive};
  }
`;
