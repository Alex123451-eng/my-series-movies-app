import { useState, useEffect } from "react";
import styled from "styled-components";
// import { useSearchParams } from "react-router-dom";

import { MovieLine } from "../movieLine/movieLine";

import { useAppSelector } from "../../app/hooks";

import { selectMovies } from "../../features/movies/moviesSlice";

import { colors, fontSizes, spacing } from "../../constants/constants";

import { ReactComponent as Cross } from "./close-btn.svg";

// todo починить any
export const Search = ({ setIsSearchShown }: { setIsSearchShown: any }) => {
  const [titleInputValue, setTitleInputValue] = useState("");

  const movies = useAppSelector(selectMovies);
  // const [searchParams, setSearchParams] = useSearchParams();

  // console.log("searchParams ", searchParams);

  // todo починить any
  const onChangeTitleInput = (e: any) => {
    const { value } = e.target;
    setTitleInputValue(value);
  };

  // todo понять, ничего, что я в другом стиле немного назвал метод, обычно я называю
  // штуки с префикса on...
  const closeSearchComponent = () => {
    // searchParams.delete("movies");
    // setSearchParams(searchParams);
    setIsSearchShown(false);
  };

  // todo понять почему он мне подчеркивает пустой массив зависимостей
  // useEffect(() => {
  // setSearchParams({ movies: "search" });
  // }, []);

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
          className="todo-title-input"
          type="text"
          placeholder="Films, tv series"
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <MoviesList>
          {filteredMovies.length ? (
            // todo починить any
            // todo починить этот onClick, он уходит до самого низа, не знаю
            // как вызывать его сразу тут
            filteredMovies.map((movie: any) => {
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
      </InnerWrapper>
      <BtnClose>
        <Cross fill="white" onClick={closeSearchComponent} />
      </BtnClose>
    </SearchComponentWrapper>
  );
};

const SearchComponentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.blackBackground};
  font-size: ${fontSizes.xxl};
  color: ${colors.white};
  font-family: "nunito-regular", sans-serif;
`;

const InnerWrapper = styled.div`
  width: 40%;
  margin: ${spacing.xxxl} auto 0;
`;

const Title = styled.div`
  font-family: "nunito-extra-bold", sans-serif;
  font-weight: 800;
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: ${spacing.md};
  font-size: ${fontSizes.md};
  font-family: "nunito-regular", sans-serif;
  border-radius: ${spacing.sm};
  height: 40px;

  &:focus {
    outline: none;
  }
`;

const BtnClose = styled.div`
  display: flex;
  position: absolute;
  top: ${spacing.xl};
  right: ${spacing.xl};
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const MoviesList = styled.div`
  background: #ffffff;
  padding: ${spacing.sm} 0;
  margin-top: ${spacing.sm};
  width: 100%;
  height: auto;
  border-radius: ${spacing.sm};
  max-height: 576px;
  overflow: hidden;
`;

const NoMatch = styled.div`
  padding-left: ${spacing.md};
  font-family: "nunito-regular", sans-serif;
  font-size: ${fontSizes.md};
  color: ${colors.black};
`;
