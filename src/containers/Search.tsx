import {SearchIcon} from '../components/icons';
import '../styles/appBar.scss';
const SearchBar = ({searchInput}) => {
  return (
    <div className='search-bar'>
      <div className='search-bar-container'>
        <input
          className='input-style'
          onChange={(e) => searchInput(e.target.value)}></input>
        <SearchIcon color={'#FFF'} />
      </div>
    </div>
  );
};

export default SearchBar;
