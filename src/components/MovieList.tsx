import {useHistory} from 'react-router-dom';
import {Paradise} from '../utils/types';
import MovieCard from './MovieCard';

const MovieList = ({popularMovies}) => {
  const history = useHistory();
  return (
    <ul>
      {popularMovies.map((movie: Paradise.MovieCardInfo) => (
        <li
          style={{float: 'left', margin: '1em', cursor: 'pointer'}}
          onClick={() => history.push(`/movie/${movie.id}`)}
          key={movie.id}>
          <MovieCard {...movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
