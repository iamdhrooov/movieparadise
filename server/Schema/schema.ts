import axios from 'axios';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
} from 'graphql';

const API_KEY = process.env.API_KEY;

const MovieDBPath = 'https://api.themoviedb.org/3/movie';
const PopularMoviesType = new GraphQLObjectType({
  name: 'PopularMovies',
  fields: {
    id: {type: GraphQLInt},
    poster_path: {type: GraphQLString},
    title: {type: GraphQLString},
    overview: {type: GraphQLString},
  },
});
const MovieInfoType = new GraphQLObjectType({
  name: 'MovieInfo',
  fields: {
    id: {type: GraphQLString},
    overview: {type: GraphQLString},
    title: {type: GraphQLString},
    poster_path: {type: GraphQLString},
    genres: {type: GraphQLString},
    release_date: {type: GraphQLString},
    vote_average: {type: GraphQLString},
    production_companies: {type: GraphQLString},
    runtime: {type: GraphQLString},
    backdrop_path: {type: GraphQLString},
    popularity: {type: GraphQLString},
    homepage: {type: GraphQLString},
  },
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    popularMovies: {
      type: new GraphQLList(PopularMoviesType),
      resolve() {
        return axios
          .get(
            `${MovieDBPath}/popular?api_key=${API_KEY}&language=en-US&page=1`
          )
          .then((res) => {
            const movies = res.data.results;
            movies.map(
              (movie) =>
                (movie.poster_path =
                  'https://image.tmdb.org/t/p/w500' + movie.poster_path)
            );
            return movies;
          });
      },
    },
    movieInfo: {
      type: MovieInfoType,
      args: {id: {type: GraphQLString}},
      resolve(_parentValue, args) {
        return axios
          .get(
            `${MovieDBPath}/${args.id}?api_key=${API_KEY}&language=en-US&page=1`
          )
          .then((res) => {
            const movie = res.data;
            movie.genres = movie.genres.map((g) => g.name).join(', ');
            movie.production_companies = movie.production_companies
              .map((g) => g.name)
              .join(', ');
            movie.runtime += ' min.';
            movie.poster_path =
              'https://image.tmdb.org/t/p/w300' + movie.poster_path;
            movie.backdrop_path =
              'https://image.tmdb.org/t/p/original' + movie.backdrop_path;
            return movie;
          });
      },
    },
  },
});
export default new GraphQLSchema({
  query: RootQuery,
});
