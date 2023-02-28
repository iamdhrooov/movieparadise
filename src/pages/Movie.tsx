import {useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {GET_MOVIE_INFO} from '../api/movie';
import AppBar from '../containers/AppBar';
import {Paradise} from '../utils/types';
import '../styles/movieInfo.scss';
import MovieCard from '../components/MovieCard';
interface IParams {
  id: string;
}
const Movie = () => {
  const params = useParams<IParams>();
  const {id} = params;
  const {loading, data} = useQuery(GET_MOVIE_INFO, {variables: {id: id}});
  if (loading) {
    return <div>Loading ...</div>;
  }
  const movieData = data.movieInfo as Paradise.MovieCardInfo;
  return (
    <div className='movie-info'>
      <AppBar />
      <div className='info-page'>
        <div
          className='bg-movie-cover'
          style={{backgroundImage: `url(${movieData.backdrop_path})`}}>
          <div className='movie-card-placed'>
            <MovieCard {...movieData} />
          </div>
          <div className='movie-info-text'>
            <h1>{movieData.title}</h1>
            <h5>{movieData.genres}</h5>
            <p>{movieData.production_companies}</p>
            <p>
              <b>Releasing on:</b> {movieData.release_date}
            </p>
            <p>
              <b>Duration:</b> {movieData.runtime}
            </p>
            <p>
              <b>IMDb Rating:</b> {movieData.vote_average}
            </p>
            <p>{movieData.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
