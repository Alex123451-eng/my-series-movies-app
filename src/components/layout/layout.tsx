import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "firebase/auth";

import { CustomLink } from "../customLink/customLink";
import Search from "../search/search";

import siteLogo from "./site-logo.png";
import { ReactComponent as EnterLogo } from "./enter-logo.svg";

import { selectUser } from "../../features/movies/userSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { setUser } from "../../features/movies/userSlice";

import { colors, fontSizes, spacing } from "../../constants/constants";
import { firebaseAuth } from "../../firebase/firebaseAuth";

const Layout = () => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [isLogOutShown, setIsLogOutShown] = useState(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const onSearchClick = () => {
    setIsSearchShown(true);
  };

  const onUserEmailClick = () => {
    setIsLogOutShown(!isLogOutShown);
  };

  const onLogoutBtnClick = async () => {
    await signOut(firebaseAuth);

    setIsLogOutShown(false);

    dispatch(
      setUser({
        id: null,
        email: null,
        password: null,
        watchedMovies: [],
      })
    );
  };

  return (
    <BaseWrapper>
      <Header>
        <HeaderNavBlock>
          <Img src={siteLogo} alt="site-logo" />
          <CustomLink to="/">Main</CustomLink>
          <CustomLink to="/history">Movie history</CustomLink>
          <CustomLink to="/private">Your page</CustomLink>
        </HeaderNavBlock>
        <HeaderSearchBlock>
          <SearchWord onClick={onSearchClick}>Search</SearchWord>
          {user.id ? (
            <UserMailLogOutWrapper>
              {isLogOutShown && (
                <LogOut>
                  <Button onClick={onLogoutBtnClick}>Log out</Button>
                </LogOut>
              )}
              <UserEmail onClick={onUserEmailClick}>{user.email}</UserEmail>
            </UserMailLogOutWrapper>
          ) : (
            <CustomLink to="/login">
              <EnterLogoWrapper>
                <EnterLogo fill={colors.white} />
              </EnterLogoWrapper>
            </CustomLink>
          )}
        </HeaderSearchBlock>
      </Header>
      <main>
        <Outlet />
        {/* todo понять нормально ли дочернему компоненту передавать функцию, которая стейт меняет */}
        {/* обычно вроде передают хэндлеры всякие */}
        {isSearchShown && <Search setIsSearchShown={setIsSearchShown} />}
      </main>
      <footer>2023</footer>
    </BaseWrapper>
  );
};

export { Layout };

const BaseWrapper = styled.div`
  width: 70%;
  margin: ${spacing.xxxl} auto 0;
  font-family: "nunito-regular", sans-serif;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xxxl};
`;

const HeaderNavBlock = styled.span`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 120px;
  padding-right: ${spacing.md};
`;

const HeaderSearchBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: ${fontSizes.lg};
`;

const EnterLogoWrapper = styled.div`
  margin-bottom: -${spacing.sm};
`;

const SearchWord = styled.div`
  cursor: pointer;
  color: ${colors.whiteTransparent};
  padding-right: ${spacing.md};
  text-decoration: none;
  font-size: ${fontSizes.lg};
`;

const UserMailLogOutWrapper = styled.div`
  position: relative;
`;

const UserEmail = styled.div`
  cursor: pointer;
  color: ${colors.white};
`;

const LogOut = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
`;

const Button = styled.button`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${colors.gray};
  border-radius: ${spacing.sm};
  background: ${colors.white};
  padding: ${spacing.sm} 0;
  width: 100%;

  &:hover {
    background: ${colors.whiteActive};
  }
`;
