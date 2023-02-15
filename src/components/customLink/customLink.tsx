import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

import { ICustomLink } from "../../types/types";

const CustomLink = ({
  children,
  to,
  ...props
}: {
  children: string;
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

// todo понять, нормально ли использовать одновременно цвета в разных форматах?
const StyledLink = styled(Link)<ICustomLink>`
  color: ${({ match }) => (match ? "#ffffff" : "rgba(255, 255, 255, 0.48)")};
  padding-right: 15px;

  &:last-child {
    padding-right: 0;
  }
`;
