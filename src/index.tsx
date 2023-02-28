import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './pages/App';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://movieparadiseo.herokuapp.com/graphql/',
  cache: new InMemoryCache(),
});

const MovieApp = () => {
  return (
    <Router>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Router>
  );
};

const initMovieApp = async (root?: HTMLDivElement) => {
  const rootElement = root || document.getElementById('app');
  ReactDOM.render(<MovieApp />, rootElement);
};

initMovieApp().catch(console.error);
