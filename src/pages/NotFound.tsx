import {useHistory} from 'react-router-dom';
import AppBar from '../containers/AppBar';

const NotFound = () => {
  const history = useHistory();
  return (
    <div className='home-wrapper'>
      <AppBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30%',
        }}>
        <h2 className='light-text'>
          Page not found. Go back to{' '}
          <u onClick={() => history.push('/')} style={{cursor: 'pointer'}}>
            Home
          </u>
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
