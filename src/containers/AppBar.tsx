import {FC} from 'react';
import {useHistory} from 'react-router-dom';
import '../styles/appBar.scss';
import {ASSETS} from '../utils/constants';
import SearchBar from './Search';

const AppBar: FC<{showSearch?: boolean}> = ({showSearch}) => {
  const history = useHistory();
  return (
    <div className='app-bar'>
      <span onClick={() => history.push('/')}>
        <img src={ASSETS.LOGO} style={{height: 60, cursor: 'pointer'}} />
      </span>
      {showSearch && <SearchBar />}
    </div>
  );
};

export default AppBar;
