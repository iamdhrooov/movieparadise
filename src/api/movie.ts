import {gql} from '@apollo/client';

export const GET_POPULAR_MOVIES = gql(/* GraphQL */ `
  query GetPopularMovies($page: Int!) {
    popularMovies(page: $page) {
      results {
        id
        overview
        title
        poster_path
      }
      hasMore
      page
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

export const SEARCH_MOVIE = gql(/* GraphQL */ `
  query SearchMovie($query: String!) {
    movieSearch(query: $query) {
      id
      title
      poster_path
    }
  }
`);
