import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import '../styles/global.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/movie/:id'} component={Movie} />
    </Switch>
  );
};

export default App;
