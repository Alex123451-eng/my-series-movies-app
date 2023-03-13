import { Link, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";

import { useAppSelector } from "../../app/hooks";

import { selectUser } from "../../features/movies/userSlice";

import { colors, fontSizes, spacing } from "../../constants/constants";

import { ICustomLink } from "../../types/types";

const CustomLink = ({
  children,
  to,
  ...props
}: {
  children: any;
  to: string;
}) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });
  // const user = useAppSelector(selectUser);

  return (
    <StyledLink
      to={to}
      match={match}
      {...props} // не очень понимаю как это должно работать
    >
      {children}
    </StyledLink>
  );
};

export { CustomLink };

const StyledLink = styled(Link)<ICustomLink>`
  color: ${({ match }) =>
    match ? `${colors.white}` : `${colors.whiteTransparent}`};
  padding-right: ${spacing.md};
  text-decoration: none;
  font-size: ${fontSizes.lg};

  span > &:last-child {
    padding-right: 0;
  }
`;
// ${({ isAuth }) => {
// if (isAuth) {
// return css`
// color: ${colors.grayTransparent};
// pointer-events: none;`
// }
// }}
