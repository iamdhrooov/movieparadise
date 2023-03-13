import {useQuery} from '@apollo/client';
import {useEffect, useRef, useState} from 'react';
import {GET_POPULAR_MOVIES} from '../api/movie';
import MovieList from '../components/MovieList';
import AppBar from '../containers/AppBar';
import '../styles/home.scss';
import {Paradise} from '../utils/types';
import {useInView} from 'react-intersection-observer';

const Home = () => {
  const currentPage = useRef(1);
  const [ref, inView] = useInView();
  const {loading, data, fetchMore} = useQuery(GET_POPULAR_MOVIES, {
    variables: {page: currentPage.current},
  });

  const [popularMovies, setPopularMovies] = useState(
    [] as Paradise.MovieCardInfo[]
  );
  useEffect(() => {
    if (!loading) {
      setPopularMovies(data?.popularMovies.results);
    }
  }, [loading]);

  useEffect(() => {
    if (inView) giveMeMore();
  }, [inView]);

  const giveMeMore = async () => {
    currentPage.current += 1;
    const {data} = await fetchMore({
      variables: {page: currentPage.current},
    });
    setPopularMovies([...popularMovies, ...data.popularMovies.results]);
  };
  return (
    <div className='home-wrapper'>
      <AppBar showSearch />
      <div className='popular-movies'>
        <h2>Popular Movies</h2>
        {!!loading && (
          <div className='loading-div'>
            <h2>Loading movies...</h2>
          </div>
        )}
        {!!popularMovies.length && <MovieList popularMovies={popularMovies} />}
        {!!popularMovies.length && !loading && <button ref={ref}></button>}
      </div>
    </div>
  );
};

export default Home;
