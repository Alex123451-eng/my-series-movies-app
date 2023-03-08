import { Link } from "react-router-dom";
import styled from "styled-components";

// todo починить any
export const MovieLink = ({
  onClick,
  children,
  id,
}: {
  // todo починить any
  onClick?: () => void;
  children: any;
  id: string;
}) => {
  return (
    <StyledMovieLink onClick={onClick} to={`/${id}`}>
      {children}
    </StyledMovieLink>
  );
};

const StyledMovieLink = styled(Link)`
  text-decoration: none;
`;
