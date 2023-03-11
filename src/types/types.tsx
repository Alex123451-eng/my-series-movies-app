export interface IMovie {
  id: string;
  title: string;
  description: string;
  img: string;
  releaseYear: number;
  rating: number;
}

export interface IUser {
  // todo понять зачем мне тут нужен Id
  id: string | null;
  email: string | null;
  password: string | null;
  watchedMovies: IMovie[];
}

// todo починить any
export interface ICustomLink {
  match: any;
}
