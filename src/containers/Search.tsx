import {useLazyQuery} from '@apollo/client';
import {useMemo, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {SEARCH_MOVIE} from '../api/movie';
import {SearchIcon} from '../components/icons';
import MovieSearchCard from '../components/MovieSearchCard';
import '../styles/appBar.scss';
import {Paradise} from '../utils/types';

const debounce = (func: Function, wait: number) => {
  let timeout;
  const debouncedFunction = (...args) => {
    const laterFunc = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    setTimeout(laterFunc, wait);
  };
  return debouncedFunction;
};

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

  const {setQuerySearch, results} = useMovieSearch();

  const handleChange = (e) => {
    setQuerySearch(e.target.value);
  };

  const debouncedResults = useMemo(() => debounce(handleChange, 1000), []);

  return (
    <div className='search-bar'>
      <div className='search-bar-container'>
        <input
          className='input-style'
          placeholder={'Search for any movie'}
          onChange={debouncedResults}></input>
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
