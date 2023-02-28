import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {GET_POPULAR_MOVIES} from '../api/movie';
import MovieList from '../components/MovieList';
import AppBar from '../containers/AppBar';
import '../styles/home.scss';
import {Paradise} from '../utils/types';

const Home = () => {
  const {loading, data} = useQuery(GET_POPULAR_MOVIES as any);

  const [popularMovies, setPopularMovies] = useState(
    [] as Paradise.MovieCardInfo[]
  );
  useEffect(() => {
    if (!loading) {
      setPopularMovies(data.popularMovies);
    }
  }, [loading]);

  return (
    <div className='home-wrapper'>
      <AppBar showSearch />
      <div className='popular-movies'>
        <h2>Popular Movies</h2>
        {loading ? (
          <div className='loading-div'>
            <h2>Loading movies...</h2>
          </div>
        ) : popularMovies.length ? (
          <MovieList popularMovies={popularMovies} />
        ) : (
          <div className='loading-div'>
            <h2>No movies found.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
