import { useState } from "react";
import styled from "styled-components";

import { MovieLine } from "../movieLine/movieLine";
import { ReactComponent as Cross } from "../../img/components/search/close-btn.svg";

import { useMovies } from "../../features/movies/useMovies";
import { useTheme } from "../../features/theme/useTheme";

import { showBodyScroll } from "../../utils/bodyScroll";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { MEDIA } from "../../constants/media";

import { IMovie, ISearch, IStyledIsDarkTheme } from "../../types/types";

export const Search: React.FC<ISearch> = ({ setIsSearchShown }) => {
  const [titleInputValue, setTitleInputValue] = useState("");

  const { movies } = useMovies();
  const { theme } = useTheme();

  const onChangeTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleInputValue(value);
  };

  const closeSearchComponent = () => {
    showBodyScroll();
    setIsSearchShown(false);
  };

  const filteredMovies =
    movies.movies &&
    movies.movies.filter((movie) =>
      movie.title
        .toLocaleLowerCase()
        .includes(titleInputValue.toLocaleLowerCase())
    );

  console.log("theme.isDarkTheme ", theme.isDarkTheme);

  return (
    <SearchComponentWrapper isDarkTheme={theme.isDarkTheme}>
      <InnerWrapper>
        <Title isDarkTheme={theme.isDarkTheme}>Search</Title>
        <SearchInput
          type="text"
          placeholder="Films, tv series"
          value={titleInputValue}
          onChange={onChangeTitleInput}
        />
        <MoviesList isDarkTheme={theme.isDarkTheme}>
          {filteredMovies.length ? (
            filteredMovies.map((movie: IMovie) => {
              const { id, title, img, releaseYear, rating } = movie;
              return (
                <div onClick={closeSearchComponent}>
                  <MovieLine
                    key={id}
                    id={id}
                    title={title}
                    img={img}
                    releaseYear={releaseYear}
                    rating={rating}
                  />
                </div>
              );
            })
          ) : (
            <NoMatch isDarkTheme={theme.isDarkTheme}>No match</NoMatch>
          )}
        </MoviesList>
        <BtnClose onClick={closeSearchComponent}>
          <Cross fill={theme.isDarkTheme ? COLORS.white : COLORS.black} />
        </BtnClose>
      </InnerWrapper>
    </SearchComponentWrapper>
  );
};

const SearchComponentWrapper = styled.div<IStyledIsDarkTheme>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.blackBackground : COLORS.whiteBackground};
  font-size: ${FONT_SIZES.xxl};
  color: ${COLORS.white};
  font-family: "nunito-regular", sans-serif;
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 40%;
  margin: ${SPACING.xxxl} auto 0;

  @media ${MEDIA.tablet} {
    width: 70%;
  }

  @media ${MEDIA.mobile} {
    width: 90%;
  }
`;

const Title = styled.div<IStyledIsDarkTheme>`
  font-family: "nunito-extra-bold", sans-serif;
  font-weight: 800;
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.white : COLORS.black)};
`;

const SearchInput = styled.input`
  width: 100%;
  padding-left: ${SPACING.md};
  font-size: ${FONT_SIZES.md};
  font-family: "nunito-regular", sans-serif;
  border-radius: ${SPACING.sm};
  border: 1px solid;
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

  svg {
    pointer-events: none;
  }
`;

const MoviesList = styled.div<IStyledIsDarkTheme>`
  background: ${({ isDarkTheme }) =>
    isDarkTheme ? COLORS.white : COLORS.blackBackground};
  padding: ${SPACING.sm} 0;
  margin-top: ${SPACING.sm};
  width: 100%;
  height: auto;
  border-radius: ${SPACING.sm};
  max-height: 576px;
  overflow: hidden;
`;

const NoMatch = styled.div<IStyledIsDarkTheme>`
  padding-left: ${SPACING.md};
  font-family: "nunito-regular", sans-serif;
  font-size: ${FONT_SIZES.md};
  color: ${({ isDarkTheme }) => (isDarkTheme ? COLORS.black : COLORS.white)};
`;
