import styled from "styled-components";

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
        <div>Рейтинг</div>
        {rating}
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
  color: #ffffff;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  border-radius: 15px;

  &: hover {
    transform: scale(1.05);
  }
`;

const InfoPreview = styled.div`
  position: absolute;
  width: 100%;
  height: 88%;
  opacity: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  background-color: rgba(7, 5, 14, 0.6);
  transition: 0.3s;

  ${MovieCardWrapper}: hover & {
    opacity: 1;
  }
`;

const MovieImg = styled.img`
  border-radius: 10px;
`;

const MovieTitle = styled.div`
  padding-top: 5px;
`;
