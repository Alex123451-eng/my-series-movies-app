import { Link } from "react-router-dom";
import styled from "styled-components";

// todo починить any
export const MovieLink = ({
  children,
  id,
}: {
  // todo починить any
  children: any;
  id: string;
}) => {
  return <StyledMovieLink to={`/${id}`}>{children}</StyledMovieLink>;
};

const StyledMovieLink = styled(Link)`
  text-decoration: none;
`;
