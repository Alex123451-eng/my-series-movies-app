import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

import { ICustomLink } from "../../types/types";

import { colors, fontSizes, spacing } from "../../constants/constants";

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
    color: ${colors.grayTransparent};
    pointer-events: none;
    padding-right: 0;
  }
`;
