import { useState, useEffect } from "react";

import MovieCard from "../../components/movieCard/movieCard"

import createMockData from "../../utils/createMockData"
import { initMoviesWithFirebaseData } from "../../firebase/firebaseAPI";
import { addDataToFirebase } from "../../firebase/firebaseAPI";

import { Movie } from "../../types/types"

const mockData = createMockData('moviesMockData');

for (let i = 0; i < mockData.length; i++) {
  addDataToFirebase(mockData[i])
}

const MainPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    initMoviesWithFirebaseData()
    .then((movies) => {
      setMovies(movies);
    });
  }, []);

  return (
    <>
      {
        movies && (
          movies.map(movieData => {
            return <MovieCard key={movieData.id} title={movieData.title}/>
          })
        )
      }
    </>
  )
}

export default MainPage