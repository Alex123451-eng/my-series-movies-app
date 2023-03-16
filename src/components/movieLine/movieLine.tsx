import styled from "styled-components";

import { MovieLink } from "../movieLink/movieLink";

import { colors, FONT_SIZES, spacing } from "../../constants/constants";

export const MovieLine = ({
  id,
  title,
  img,
  releaseYear,
  rating,
  onClick,
}: {
  id: string;
  title: string;
  img: string;
  releaseYear: number;
  rating: number;
  onClick: () => void;
}) => {
  return (
    <MovieLink id={id} onClick={onClick}>
      <Wrapper>
        <img src={img} alt="movie preview" />
        <TextBlock>
          <Title>{title}</Title>
          <Info>
            <Rating>{rating}</Rating>
            <ReleaseYear>{releaseYear}</ReleaseYear>
          </Info>
        </TextBlock>
      </Wrapper>
    </MovieLink>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding: ${spacing.sm} ${spacing.md};
  width: 100%;
  height: 70px;
  cursor: pointer;

  &:hover {
    background: ${colors.whiteActive};
  }
`;

const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: ${spacing.md};
`;

const Title = styled.div`
  font-family: "nunito-regular", sans-serif;
  font-size: ${FONT_SIZES.md};
  color: ${colors.black};
`;

const Info = styled.div`
  display: flex;
  font-size: ${FONT_SIZES.md};
`;

const Rating = styled.div`
  color: ${colors.gray};
  font-weight: 800;
  margin-right: ${spacing.sm};
`;

const ReleaseYear = styled.div`
  color: ${colors.gray};
`;
