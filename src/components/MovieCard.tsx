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
            <h2 style={{paddingBottom: 12}}>{props.title}</h2>
            <h6>SUMMARY</h6>
            <p className='movie-description'>{props.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
