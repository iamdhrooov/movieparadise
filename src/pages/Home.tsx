import {useQuery} from '@apollo/client';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {GET_POPULAR_MOVIES} from '../api/movie';
import MovieCard from '../components/MovieCard';
import AppBar from '../containers/AppBar';
import '../styles/home.scss';
import {Paradise} from '../utils/types';

const Home = () => {
  const {loading, data} = useQuery(GET_POPULAR_MOVIES as any);
  const history = useHistory();
  const [popularMovies, setPopularMovies] = useState(
    [] as Paradise.MovieCardInfo[]
  );
  useEffect(() => {
    if (!loading) {
      setPopularMovies(data.popularMovies);
    }
  }, [loading]);

  const doSearch = (searchText: string) => {
    const filteredMovies = data.popularMovies.filter((e) =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setPopularMovies(filteredMovies);
  };
  return (
    <div className='home-wrapper'>
      <AppBar onSearch={doSearch} />
      <div className='popular-movies'>
        <h2>Popular Movies</h2>
        <ul className='movie-list'>
          {loading ? (
            <div className='loading-div'>
              <h2>Loading movies...</h2>
            </div>
          ) : popularMovies.length ? (
            popularMovies.map((movie) => (
              <li
                style={{float: 'left', margin: '1em', cursor: 'pointer'}}
                onClick={() => history.push(`/movie/${movie.id}`)}
                key={movie.id}>
                <MovieCard {...movie} />
              </li>
            ))
          ) : (
            <div className='loading-div'>
              <h2>No movies found.</h2>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
