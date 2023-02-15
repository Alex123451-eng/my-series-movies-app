export interface Movie {
  id: string;
  title: string;
  description: string;
  img: string;
  releaseYear: number;
  rating: number;
}

// todo починить any
export interface ICustomLink {
  match: any;
}
