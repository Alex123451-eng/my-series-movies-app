import styled from "styled-components";

import { MovieStyles } from "../../types/types";

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
    <>
      <Movie backgroundImage={img}>{title}</Movie>
    </>
  );
};

export default MovieCard;

const Movie = styled.div<MovieStyles>`
  position: relative;
  width: 153px;
  height: 260px;
  background-image: url(${(props) => props.backgroundImage});
`;
