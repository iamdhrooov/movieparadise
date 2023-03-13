import axios from 'axios';
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull,
} from 'graphql';

const API_KEY = process.env.API_KEY || 'b952b6fd269faac52915ed8ea47547d7';

const MovieDBPath = 'https://api.themoviedb.org/3/';
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

const PopularMovies = new GraphQLObjectType({
  name: 'PopularMovies',
  fields: {
    page: {type: GraphQLInt},
    results: {type: new GraphQLList(MovieInfoType)},
    hasMore: {type: GraphQLBoolean},
  },
});
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    popularMovies: {
      type: new GraphQLNonNull(PopularMovies),
      args: {page: {type: GraphQLInt}},
      resolve: async (_parentValue, args) => {
        return axios
          .get(
            `${MovieDBPath}movie/popular?api_key=${API_KEY}&language=en-US&page=${args.page}`
          )
          .then((res) => {
            const movies = res.data.results;
            movies.map(
              (movie) =>
                (movie.poster_path =
                  'https://image.tmdb.org/t/p/w500' + movie.poster_path)
            );
            const resData = {
              page: args.page,
              results: movies,
              hasMore: res.data.total_pages > args.page,
            };
            return resData;
          });
      },
    },
    movieSearch: {
      type: new GraphQLList(MovieInfoType),
      args: {query: {type: GraphQLString}},
      resolve(_parentValue, args) {
        return axios
          .get(
            `${MovieDBPath}search/movie?api_key=${API_KEY}&query=${args.query}`
          )
          .then((res) => {
            const movieResults = res.data.results;
            movieResults.map(
              (movie) =>
                (movie.poster_path =
                  'https://image.tmdb.org/t/p/w94_and_h141_bestv2' +
                  movie.poster_path)
            );
            return movieResults;
          });
      },
    },
    movieInfo: {
      type: MovieInfoType,
      args: {id: {type: GraphQLString}},
      resolve(_parentValue, args) {
        return axios
          .get(
            `${MovieDBPath}movie/${args.id}?api_key=${API_KEY}&language=en-US&page=1`
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
