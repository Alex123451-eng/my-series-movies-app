import styled from 'styled-components'

// todo вынести это в дженерик или интерфейс?
const MovieCard = ({ title }: { title: string }) => {
  return (
    <>
      <Movie>
        {title}
      </Movie>
    </>
  )
}

export default MovieCard;

const Movie = styled.div`
  border: 1px solid black;
  height: 100px;
  width: 100px;
`