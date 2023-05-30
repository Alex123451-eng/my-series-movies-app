export interface IMovie {
  id: string;
  title: string;
  description?: string;
  img: string;
  releaseYear: number;
  rating: number;
}

export interface IUserRating {
  [id: string]: number;
}

export interface IUserMoviesData {
  id: string;
  rating: IUserRating;
  watchedMovies: string[];
}

export interface IUser {
  id: string;
  email: string;
  password: string;
}

// todo починить any
export interface IStyledCustomLink {
  match: any;
}
export interface ICustomLink {
  children: string | React.ReactElement;
  to: string;
}

export type voidFunc = () => void;
export type boolVoidFunc = (value: boolean) => void;

export interface IMobileMenu {
  setIsMobileMenuShown: boolVoidFunc;
  onUserEmailClick: voidFunc;
  isLogOutShown: boolean;
  onLogoutBtnClick: voidFunc;
}

export interface IMovieLink {
  children: React.ReactElement;
  id: string;
}

export interface ISearch {
  setIsSearchShown: boolVoidFunc;
}
