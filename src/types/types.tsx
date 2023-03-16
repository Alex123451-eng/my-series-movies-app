export interface IMovie {
  id: string;
  title: string;
  description: string;
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
export interface ICustomLink {
  match: any;
}
