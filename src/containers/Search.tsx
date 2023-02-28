import {useLazyQuery} from '@apollo/client';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {SEARCH_MOVIE} from '../api/movie';
import {SearchIcon} from '../components/icons';
import MovieSearchCard from '../components/MovieSearchCard';
import '../styles/appBar.scss';
import {Paradise} from '../utils/types';

const useMovieSearch = () => {
  const [query, setQuery] = useState('');
  const [search, {loading, data}] = useLazyQuery(SEARCH_MOVIE);

  const setQuerySearch = (searchString: string) => {
    setQuery(searchString);
    search({
      variables: {query: searchString},
    });
  };
  return {
    setQuerySearch,
    query,
    results: ((data && data.movieSearch) as Paradise.MovieCardInfo[]) || [],
    loading,
  };
};

const SearchBar = () => {
  const history = useHistory();
  const {setQuerySearch, query, results} = useMovieSearch();
  return (
    <div className='search-bar'>
      <div className='search-bar-container'>
        <input
          className='input-style'
          value={query}
          placeholder={'Search for any movie'}
          onChange={(e) => setQuerySearch(e.target.value)}></input>
        <SearchIcon color={'#FFF'} />
      </div>
      {results.length ? (
        <ul className='search-results'>
          {results.map((e) => (
            <li key={e.id} onClick={() => history.push(`/movie/${e.id}`)}>
              <MovieSearchCard {...e} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SearchBar;
