import {Paradise} from '../utils/types';

const MovieSearchCard = (props: Paradise.MovieCardInfo) => {
  return (
    <div className='search-info'>
      <img src={props.poster_path} style={{borderRadius: 8, height: 60}}></img>
      <span>{props.title}</span>
    </div>
  );
};

export default MovieSearchCard;
