import { Link } from "react-router-dom";
import styled from "styled-components";

import { IMovieLink } from "../../types/types";

export const MovieLink: React.FC<IMovieLink> = ({ children, id }) => {
  return <StyledMovieLink to={`/${id}`}>{children}</StyledMovieLink>;
};

const StyledMovieLink = styled(Link)`
  text-decoration: none;
`;
