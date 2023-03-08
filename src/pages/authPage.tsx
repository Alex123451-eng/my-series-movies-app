import { useState } from "react";
import styled from "styled-components";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { colors, fontSizes, spacing } from "../constants/constants";

import loginSiteLogo from "./login-site-logo.png";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  // todo починить any
  const onChangeInput = (e: any) => {
    const { target } = e;
    target.name === "login"
      ? setLogin(target.value)
      : setPassword(target.value);
  };

  const onSighUpBtnClick = () => {};

  return (
    <Wrapper>
      <InnerWrapper>
        <Title>
          <div> Welcome to the Alexis Movies!</div>
          Register for the full user experience.
        </Title>

        <InputBlock>
          <label htmlFor="login">Enter your login please</label>
          <LoginInput
            type="text"
            id="login"
            placeholder="Login"
            name="login"
            value={login}
            onChange={onChangeInput}
          />
        </InputBlock>
        <InputBlock>
          <label htmlFor="password">Enter your password please</label>
          <LoginInput
            type="text"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChangeInput}
          />
        </InputBlock>

        <ButtonsBlock>
          <Button>Login</Button>
          <Button onClick={onSighUpBtnClick}>Sign up</Button>
        </ButtonsBlock>
        <ImgWrapper>
          <img src={loginSiteLogo} alt="big site logo" />
        </ImgWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default LoginPage;

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

const LoginInput = styled.input`
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

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
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
