export interface IMovie {
  id: string;
  title: string;
  description: string;
  img: string;
  releaseYear: number;
  rating: number;
  currUserRating: number;
}

export interface ICurrUserRating {
  [id: string]: number;
}

export interface IUserMoviesData {
  currUserRating: ICurrUserRating;
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
  id: string | null;
  email: string | null;
  password: string | null;
  watchedMovies: IMovie[];
}

// todo починить any
export interface ICustomLink {
  match: any;
}
