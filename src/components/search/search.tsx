import { useState } from "react";
import styled from "styled-components";

import { MovieLine } from "../movieLine/movieLine";
import { ReactComponent as Cross } from "../../img/components/search/close-btn.svg";

import { useMovies } from "../../features/movies/useMovies";

import { showBodyScroll } from "../../utils/bodyScroll";

import { COLORS, FONT_SIZES, SPACING } from "../../constants/styles";
import { MEDIA } from "../../constants/media";

import { IMovie } from "../../types/types";

// todo починить any
export const Search = ({ setIsSearchShown }: { setIsSearchShown: any }) => {
  const [titleInputValue, setTitleInputValue] = useState("");

  const { movies } = useMovies();

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
            <NoMatch>No match</NoMatch>
          )}
        </MoviesList>
        <BtnClose onClick={closeSearchComponent}>
          <Cross fill="white" />
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

  @media ${MEDIA.tablet} {
    width: 70%;
  }

  @media ${MEDIA.mobile} {
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

  svg {
    pointer-events: none;
  }
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
