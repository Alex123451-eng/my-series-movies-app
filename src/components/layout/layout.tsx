import { Outlet } from "react-router-dom";
import styled from "styled-components";

import { CustomLink } from "../customLink/customLink";

const Layout = () => {
  return (
    <BaseWrapper>
      <Header>
        <CustomLink to="/">Main</CustomLink>
        <CustomLink to="/history">Movie history</CustomLink>
        <CustomLink to="/private">Your page</CustomLink>
      </Header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="container">2023</footer>
    </BaseWrapper>
  );
};

export { Layout };

const BaseWrapper = styled.div`
  width: 70%;
  margin: 100px auto 0;
  font-family: "nunito-regular", sans-serif;
`;
// border: 1px solid red;

const Header = styled.header`
  margin-bottom: 50px;
  text-align: center;
`;
