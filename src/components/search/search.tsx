import { useState } from "react";
import styled from "styled-components";

import { MovieLine } from "../movieLine/movieLine";
import { ReactComponent as Cross } from "../../img/components/search/close-btn.svg";

import { useMovies } from "../../features/movies/useMovies";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";

import { IMovie } from "../../types/types";

// todo починить any
export const Search = ({ setIsSearchShown }: { setIsSearchShown: any }) => {
  const [titleInputValue, setTitleInputValue] = useState("");

  const { movies } = useMovies();

  const onChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleInputValue(value);
  };

  // todo понять, ничего, что я в другом стиле немного назвал метод, обычно я называю
  // штуки с префикса on...
  const closeSearchComponent = () => {
    setIsSearchShown(false);
  };

  const filteredMovies =
    movies.movies &&
    movies.movies.filter((movie) =>
      movie.title
        .toLocaleLowerCase()
        .includes(titleInputValue.toLocaleLowerCase())
    );

  return (
    <SearchComponentWrapper>
      <InnerWrapper>
        <Title>Search</Title>
        <SearchInput
          type="text"
          placeholder="Films, tv series"
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <MoviesList>
          {filteredMovies.length ? (
            // todo починить этот onClick, он уходит до самого низа, не знаю
            // как вызывать его сразу тут
            filteredMovies.map((movie: IMovie) => {
              const { id, title, img, releaseYear, rating } = movie;
              return (
                <MovieLine
                  key={id}
                  id={id}
                  title={title}
                  img={img}
                  releaseYear={releaseYear}
                  rating={rating}
                  onClick={closeSearchComponent}
                />
              );
            })
          ) : (
            <NoMatch>No match</NoMatch>
          )}
        </MoviesList>
        <BtnClose>
          <Cross fill="white" onClick={closeSearchComponent} />
        </BtnClose>
      </InnerWrapper>
    </SearchComponentWrapper>
  );
};

const SearchComponentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLORS.blackBackground};
  font-size: ${FONT_SIZES.xxl};
  color: ${COLORS.white};
  font-family: "nunito-regular", sans-serif;
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 40%;
  margin: ${SPACING.xxxl} auto 0;

  @media (max-width: 1024px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-family: "nunito-extra-bold", sans-serif;
  font-weight: 800;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: ${SPACING.md};
  font-size: ${FONT_SIZES.md};
  font-family: "nunito-regular", sans-serif;
  border-radius: ${SPACING.sm};
  height: 40px;

  &:focus {
    outline: none;
  }
`;

const BtnClose = styled.div`
  display: flex;
  position: absolute;
  top: 6px;
  right: 0;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MoviesList = styled.div`
  background: #ffffff;
  padding: ${SPACING.sm} 0;
  margin-top: ${SPACING.sm};
  width: 100%;
  height: auto;
  border-radius: ${SPACING.sm};
  max-height: 576px;
  overflow: hidden;
`;

const NoMatch = styled.div`
  padding-left: ${SPACING.md};
  font-family: "nunito-regular", sans-serif;
  font-size: ${FONT_SIZES.md};
  color: ${COLORS.black};
`;
