import { movieMockData } from "../../mockData/mockData"
import createMockData from "../../utils/createMockData"
import MovieCard from "../../components/movieCard/movieCard"

createMockData('mockMoviesData');

const MainPage = () => {
  return (
    <>
      {
        movieMockData.map(movieData => {
          return <MovieCard key={movieData.id} title={movieData.title}/>
        })
      }
    </>
  )
}

export default MainPage