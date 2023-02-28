import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import NotFound from './NotFound';
import '../styles/global.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route path={'/movie/:id'} component={Movie} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default App;
