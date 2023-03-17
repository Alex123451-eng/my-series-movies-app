import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { signOut } from "firebase/auth";

import { CustomLink } from "../customLink/customLink";
import { Search } from "../search/search";
import { MobileMenu } from "../mobileMenu/mobileMenu";
import { ReactComponent as EnterLogo } from "../../img/components/layout/enter-logo.svg";

import { useUser } from "../../features/user/useUser";

import { firebaseAuth } from "../../firebase/firebaseAuth";
import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { ROUTES } from "../../constants/routes";
import { MEDIA } from "../../constants/media";

export const Layout = () => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [isLogOutShown, setIsLogOutShown] = useState(false);
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  const { saveUser, user } = useUser();
  const navigate = useNavigate();

  const onSearchClick = () => {
    setIsSearchShown(true);
  };

  const onUserEmailClick = () => {
    setIsLogOutShown(!isLogOutShown);
  };

  const onLogoutBtnClick = async () => {
    await signOut(firebaseAuth);

    setIsLogOutShown(false);

    saveUser({
      id: "",
      email: "",
      password: "",
    });

    navigate(ROUTES.main);
  };

  const onBurderClick = () => {
    setIsMobileMenuShown(!isMobileMenuShown);
  };

  return (
    <BaseWrapper>
      <Header>
        <HeaderNavBlock>
          <Img src="./img/components/layout/site-logo.png" alt="site-logo" />
          <CustomLink to={ROUTES.main}>Main</CustomLink>
          <CustomLink to={ROUTES.history}>Movie history</CustomLink>
          {user.id && <CustomLink to={ROUTES.private}>Your page</CustomLink>}
        </HeaderNavBlock>
        <HeaderSearchBlock>
          <SearchWord onClick={onSearchClick}>Search</SearchWord>
          <Burger onClick={onBurderClick} />
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
            <CustomLink to={ROUTES.login}>
              <EnterLogoWrapper>
                <EnterLogo fill={COLORS.white} />
              </EnterLogoWrapper>
            </CustomLink>
          )}
        </HeaderSearchBlock>
      </Header>
      {isMobileMenuShown && (
        <MobileHeader>
          <MobileMenu
            setIsMobileMenuShown={setIsMobileMenuShown}
            onUserEmailClick={onUserEmailClick}
            isLogOutShown={isLogOutShown}
            onLogoutBtnClick={onLogoutBtnClick}
          />
        </MobileHeader>
      )}
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

// border: 1px solid red;
const BaseWrapper = styled.div`
  width: 70%;
  margin: ${SPACING.xxxl} auto 0;
  font-family: "nunito-regular", sans-serif;

  @media ${MEDIA.mobile} {
    width: 90%;
  }
`;

// border: 1px solid green;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${SPACING.xxxl};

  @media ${MEDIA.laptop} {
    & a,
    span {
      display: none;
    }
  }
`;

const MobileHeader = styled.header`
  position: relative;
  z-index: 2;
`;

const HeaderNavBlock = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 120px;
  padding-right: ${SPACING.md};
`;

const HeaderSearchBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: ${FONT_SIZES.lg};
`;

const EnterLogoWrapper = styled.div`
  margin-bottom: -${SPACING.sm};
`;

const SearchWord = styled.div`
  cursor: pointer;
  color: ${COLORS.whiteTransparent};
  margin-right: ${SPACING.md};
  text-decoration: none;
  font-size: ${FONT_SIZES.lg};
`;

const burderPseudoStyles = css`
  content: "";
  position: absolute;
  width: 25px;
  height: 2px;
  background: ${COLORS.white};
`;

const Burger = styled.div`
  display: none;
  position: relative;
  width: 25px;
  height: 2px;
  background: ${COLORS.white};

  &::before {
    ${burderPseudoStyles}
    top: 7px;
  }

  &::after {
    ${burderPseudoStyles}
    bottom: 7px;
  }

  @media ${MEDIA.laptop} {
    display: block;
  }
`;

const UserMailLogOutWrapper = styled.div`
  position: relative;
`;

const UserEmail = styled.span`
  cursor: pointer;
  color: ${COLORS.white};
`;

const LogOut = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
`;

const Button = styled.button`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${COLORS.gray};
  border-radius: ${SPACING.sm};
  background: ${COLORS.white};
  padding: ${SPACING.sm} 0;
  width: 100%;

  &:hover {
    background: ${COLORS.whiteActive};
  }
`;
