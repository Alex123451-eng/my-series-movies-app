import styled from "styled-components";

import { MovieLink } from "../movieLink/movieLink";

import { useTheme } from "../../features/theme/useTheme";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";

import { IMovie, IStyledIsDarkTheme } from "../../types/types";

export const MovieLine: React.FC<IMovie> = ({
  id,
  title,
  img,
  releaseYear,
  rating,
}) => {
  const { theme } = useTheme();

  return (
    <MovieLink id={id}>
      <Wrapper isDarkTheme={theme.isDarkTheme}>
        <img src={img} alt="movie preview" />
        <TextBlock>
          <Title isDarkTheme={theme.isDarkTheme}>{title}</Title>
          <Info>
            <Rating>{rating}</Rating>
            <ReleaseYear>{releaseYear}</ReleaseYear>
          </Info>
        </TextBlock>
      </Wrapper>
    </MovieLink>
  );
};

const Wrapper = styled.div<IStyledIsDarkTheme>`
  display: flex;
  padding: ${SPACING.sm} ${SPACING.md};
  width: 100%;
  height: 70px;
  cursor: pointer;

  &:hover {
    background: ${({ isDarkTheme }) =>
      isDarkTheme ? COLORS.whiteActive : COLORS.blackActive};
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${SPACING.md};
`;

const Title = styled.div<IStyledIsDarkTheme>`
  font-family: "nunito-regular", sans-serif;
  font-size: ${FONT_SIZES.md};
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.black : COLORS.white)};
`;

const Info = styled.div`
  display: flex;
  font-size: ${FONT_SIZES.md};
`;

const Rating = styled.div`
  color: ${COLORS.gray};
  font-weight: 800;
  margin-right: ${SPACING.sm};
`;

const ReleaseYear = styled.div`
  color: ${COLORS.gray};
`;
