import '../styles/movieCard.scss';
import {Paradise} from '../utils/types';

const MovieCard = (props: Paradise.MovieCardInfo) => {
  return (
    <div className='container'>
      <div className='outer-container'>
        <div className='movie'>
          <div
            className='movie-img'
            style={{backgroundImage: `url(${props.poster_path})`}}></div>
          <div className='text-movie-cont'>
            <h5>SUMMARY</h5>
            <p className='movie-description'>{props.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
