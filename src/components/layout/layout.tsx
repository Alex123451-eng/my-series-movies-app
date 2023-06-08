import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { signOut } from "firebase/auth";

import { CustomLink } from "../customLink/customLink";
import { Search } from "../search/search";
import { MobileMenu } from "../mobileMenu/mobileMenu";
import { ReactComponent as EnterLogo } from "../../img/components/layout/enter-logo.svg";

import { useUser } from "../../features/user/useUser";
import { useTheme } from "../../features/theme/useTheme";

import {
  hideBodyScroll,
  changeBodyColorToBlack,
  changeBodyColorToWhite,
} from "../../utils/bodyScroll";

import { firebaseAuth } from "../../firebase/firebaseAuth";
import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { ROUTES } from "../../constants/routes";
import { MEDIA } from "../../constants/media";

import { IStyledIsDarkTheme } from "../../types/types";

export const Layout = () => {
  const [isSearchShown, setIsSearchShown] = useState(false);
  const [isLogOutShown, setIsLogOutShown] = useState(false);
  const [isMobileMenuShown, setIsMobileMenuShown] = useState(false);

  const { saveUser, user } = useUser();
  const { saveTheme, theme } = useTheme();

  console.log("theme", theme);
  const navigate = useNavigate();

  const onSearchClick = () => {
    hideBodyScroll();
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
    hideBodyScroll();
    setIsMobileMenuShown(!isMobileMenuShown);
  };

  const toggleTheme = () => {
    saveTheme();
  };

  useEffect(() => {
    if (theme.isDarkTheme) changeBodyColorToBlack();
    else changeBodyColorToWhite();
  }, [theme.isDarkTheme]);

  return (
    <BaseWrapper>
      <Header>
        <HeaderNavBlock>
          <Img
            src={`${
              theme.isDarkTheme
                ? "./img/components/layout/site-logo.png"
                : "./img/components/layout/site-logo-white-theme.png"
            }`}
            alt="site-logo"
          />
          <CustomLink to={ROUTES.main}>Main</CustomLink>
          <CustomLink to={ROUTES.history}>Movie history</CustomLink>
          {user.id && <CustomLink to={ROUTES.private}>Your page</CustomLink>}
        </HeaderNavBlock>
        <HeaderSearchBlock>
          <SearchWord isDarkTheme={theme.isDarkTheme} onClick={onSearchClick}>
            Search
          </SearchWord>
          <BurgerWrapper onClick={onBurderClick}>
            <Burger isDarkTheme={theme.isDarkTheme} />
          </BurgerWrapper>
          {user.id ? (
            <UserMailLogOutWrapper>
              {isLogOutShown && (
                <LogOut>
                  <Button
                    isDarkTheme={theme.isDarkTheme}
                    onClick={onLogoutBtnClick}
                  >
                    Log out
                  </Button>
                </LogOut>
              )}
              <UserEmail
                isDarkTheme={theme.isDarkTheme}
                onClick={onUserEmailClick}
              >
                {user.email}
              </UserEmail>
            </UserMailLogOutWrapper>
          ) : (
            <CustomLink to={ROUTES.login}>
              <EnterLogoWrapper>
                <EnterLogo
                  fill={theme.isDarkTheme ? COLORS.white : COLORS.black}
                />
              </EnterLogoWrapper>
            </CustomLink>
          )}
          <ThemeBtnWrapper isDarkTheme={theme.isDarkTheme}>
            <img
              src={`./img/components/btn-theme/dark-theme.svg`}
              alt="Swtich theme"
              onClick={toggleTheme}
            />
          </ThemeBtnWrapper>
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
        {isSearchShown && <Search setIsSearchShown={setIsSearchShown} />}
      </main>
      {/* <footer>2023</footer> */}
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

const SearchWord = styled.div<IStyledIsDarkTheme>`
  cursor: pointer;
  color: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.whiteTransparent : COLORS.blackTransparent};
  margin-right: ${SPACING.md};
  text-decoration: none;
  font-size: ${FONT_SIZES.lg};
`;

const burderPseudoStyles = css<IStyledIsDarkTheme>`
  content: "";
  position: absolute;
  width: 25px;
  height: 2px;
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.white : COLORS.black};
`;

const BurgerWrapper = styled.div`
  cursor: pointer;
  height: 20px;
`;

const Burger = styled.div<IStyledIsDarkTheme>`
  display: none;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 2px;
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.white : COLORS.black};

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

const UserEmail = styled.span<IStyledIsDarkTheme>`
  cursor: pointer;
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.white : COLORS.black)};
`;

const LogOut = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;

  @media ${MEDIA.laptop} {
    display: none;
  }
`;

const Button = styled.button<IStyledIsDarkTheme>`
  font-family: "nunito-regular", sans-serif;
  cursor: pointer;
  border: 1px solid ${COLORS.gray};
  border-radius: ${SPACING.sm};
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.white : COLORS.black};
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.black : COLORS.white)};
  padding: ${SPACING.sm} 0;
  width: 100%;

  &:hover {
    background: ${({ isDarkTheme }) =>
      isDarkTheme ? COLORS.whiteActive : COLORS.blackActive};
  }
`;

const ThemeBtnWrapper = styled.div<IStyledIsDarkTheme>`
  width: 35px;
  height: 35px;
  cursor: pointer;
  margin-left: ${SPACING.md};

  img {
    width: 100%;
    height: 100%;
    filter: ${({ isDarkTheme }) => (isDarkTheme ? "invert(1)" : "none")};
  }
`;
