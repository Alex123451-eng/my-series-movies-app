import { Link, useMatch } from "react-router-dom";
import styled, { css } from "styled-components";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";

import { ICustomLink } from "../../types/types";

export const CustomLink = ({
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

const StyledLink = styled(Link)<ICustomLink>`
  color: ${({ match }) =>
    match ? `${COLORS.white}` : `${COLORS.whiteTransparent}`};
  padding-right: ${SPACING.md};
  text-decoration: none;
  font-size: ${FONT_SIZES.lg};

  span > &:last-child {
    padding-right: 0;
  }
`;
// ${({ isAuth }) => {
// if (isAuth) {
// return css`
// color: ${COLORS.grayTransparent};
// pointer-events: none;`
// }
// }}
