import {gql} from '@apollo/client';

export const GET_POPULAR_MOVIES = gql(/* GraphQL */ `
  query GetPopularMovies {
    popularMovies {
      id
      poster_path
      title
      overview
    }
  }
`);

export const GET_MOVIE_INFO = gql(/* GraphQL */ `
  query GetMovieInfo($id: String!) {
    movieInfo(id: $id) {
      id
      overview
      title
      poster_path
      backdrop_path
      genres
      release_date
      vote_average
      production_companies
      runtime
      popularity
    }
  }
`);
