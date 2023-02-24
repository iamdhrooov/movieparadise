import {useHistory} from 'react-router-dom';
import '../styles/appBar.scss';
import {ASSETS} from '../utils/constants';

const AppBar = () => {
  const history = useHistory();
  return (
    <div className='app-bar'>
      <span onClick={() => history.push('/')}>
        <img src={ASSETS.LOGO} style={{height: 60, cursor: 'pointer'}} />
      </span>
    </div>
  );
};

export default AppBar;
