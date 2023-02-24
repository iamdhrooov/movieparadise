import {useQuery} from '@apollo/client';
import {useHistory} from 'react-router-dom';
import {GET_POPULAR_MOVIES} from '../api/movie';
import MovieCard from '../components/MovieCard';
import AppBar from '../containers/AppBar';
import '../styles/home.scss';

const Home = () => {
  // our query's result, data, is typed!
  const {loading, data} = useQuery(GET_POPULAR_MOVIES as any);
  console.log('dataa', data);
  const history = useHistory();
  return (
    <div className='home-wrapper'>
      <AppBar />
      <div className='popular-movies'>
        <h2 className='light-text'>Popular Movies</h2>
        {loading ? (
          'Loading...'
        ) : (
          <ul className='movie-list'>
            {data.popularMovies.map((movie) => (
              <li
                style={{float: 'left', margin: '1em', cursor: 'pointer'}}
                onClick={() => history.push(`/movie/${movie.id}`)}
                key={movie.id}>
                <MovieCard {...movie} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
