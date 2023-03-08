import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { CustomLink } from "../customLink/customLink";
import SearchComponent from "../searchComponent/searchComponent";

import siteLogo from "./site-logo.png";
import { ReactComponent as EnterLogo } from "./enter-logo.svg";

import { colors, fontSizes, spacing } from "../../constants/constants";

const Layout = () => {
  const [isSearchComponentShown, setIsSearchBlockShown] = useState(false);

  const handleSearchClick = () => {
    setIsSearchBlockShown(true);
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
          <Search onClick={handleSearchClick}>Search</Search>
          <CustomLink to="/login">
            <EnterLogoWrapper>
              <EnterLogo fill={colors.white} />
            </EnterLogoWrapper>
          </CustomLink>
        </HeaderSearchBlock>
      </Header>
      <main>
        <Outlet />
        {/* todo понять нормально ли дочернему компоненту передавать функцию, которая стейт меняет */}
        {/* обычно вроде передают хэндлеры всякие */}
        {isSearchComponentShown && (
          <SearchComponent setIsSearchBlockShown={setIsSearchBlockShown} />
        )}
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
// border: 1px solid red;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.xxl};
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
`;

const EnterLogoWrapper = styled.div`
  margin-bottom: -${spacing.sm};
`;

const Search = styled.div`
  cursor: pointer;
  color: ${colors.whiteTransparent};
  padding-right: ${spacing.md};
  text-decoration: none;
  font-size: ${fontSizes.lg};
`;
