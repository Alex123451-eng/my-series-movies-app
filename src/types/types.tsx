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

// все для текущего пользователя
const IUserFilmData = {
  currUserRating: {
    id: "currUserRating",
    // id: "currUserRating",
    // id: "currUserRating",
    // id: "currUserRating",
  }, // id фильма: оценка текущего пользователя
  watchedMovies: ["id", "id", "id"], // массив айдишних просмотренных фильмов для текущего юзера
};

// на беке сделать отдельную коллекцию под это

export interface IUser {
  id: string;
  email: string;
  password: string;
  isAuth: boolean;
}

// todo починить any
export interface ICustomLink {
  match: any;
}
