import styled from "styled-components";

import { colors, spacing } from "../../constants/constants";

// todo вынести это в дженерик или интерфейс?
// todo понять правильно ли по синтаксису, что типы пропсов перечисляются через ";"?
const MovieCard = ({
  title,
  description,
  img,
  releaseYear,
  rating,
}: {
  title: string;
  description: string;
  img: string;
  releaseYear: number;
  rating: number;
}) => {
  return (
    <MovieCardWrapper>
      <InfoPreview>
        <div>Rating</div>
        {rating}
        <div>Release year</div>
        {releaseYear}
      </InfoPreview>
      <MovieImg src={img} alt="movie poster" />
      <MovieTitle>{title}</MovieTitle>
    </MovieCardWrapper>
  );
};

export default MovieCard;

const MovieCardWrapper = styled.div`
  position: relative;
  width: 153px;
  display: flex;
  flex-direction: column;
  color: ${colors.white};
  cursor: pointer;
  transition: 0.3s;
  text-align: center;

  &: hover {
    transform: scale(1.05);
  }
`;

const InfoPreview = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  opacity: 0;
  flex-direction: column;
  align-items: start;
  text-align: left;
  padding: ${spacing.xxxxl} 0 0 ${spacing.md};
  justify-content: center;
  background-color: ${colors.blackTransparent};
  transition: 0.3s;

  ${MovieCardWrapper}: hover & {
    opacity: 1;
  }
`;

const MovieImg = styled.img`
  border-radius: ${spacing.sm};
`;

const MovieTitle = styled.div`
  padding-top: ${spacing.sm};
`;
