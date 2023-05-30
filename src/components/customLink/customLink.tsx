import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";

import { IStyledCustomLink, ICustomLink } from "../../types/types";

export const CustomLink: React.FC<ICustomLink> = ({
  children,
  to,
  ...props
}) => {
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });
  return (
    <StyledLink to={to} match={match} {...props}>
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<IStyledCustomLink>`
  color: ${({ match }) =>
    match ? `${COLORS.white}` : `${COLORS.whiteTransparent}`};
  padding-right: ${SPACING.md};
  text-decoration: none;
  font-size: ${FONT_SIZES.lg};

  span > &:last-child {
    padding-right: 0;
  }
`;
