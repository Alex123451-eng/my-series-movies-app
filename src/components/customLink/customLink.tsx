import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

import { useTheme } from "../../features/theme/useTheme";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";

import { IStyledCustomLink, ICustomLink } from "../../types/types";

export const CustomLink: React.FC<ICustomLink> = ({
  children,
  to,
  ...props
}) => {
  const { theme } = useTheme();
  const match = useMatch({
    path: to,
    end: to.length === 1,
  });
  return (
    <StyledLink
      to={to}
      match={match}
      isDarkTheme={theme.isDarkTheme}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

const StyledLink = styled(Link)<IStyledCustomLink>`
  color: ${({ match, isDarkTheme }) =>
    match
      ? `${isDarkTheme ? COLORS.white : COLORS.black}`
      : `${isDarkTheme ? COLORS.whiteTransparent : COLORS.blackTransparent}`};
  padding-right: ${SPACING.md};
  text-decoration: none;
  font-size: ${FONT_SIZES.lg};

  span > &:last-child {
    padding-right: 0;
  }
`;
