/* eslint-disable */
import {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';
import {gql} from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MovieInfo = {
  __typename?: 'MovieInfo';
  backdrop_path?: Maybe<Scalars['String']>;
  genres?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  runtime?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  vote_average?: Maybe<Scalars['String']>;
};

export type PopularMovies = {
  __typename?: 'PopularMovies';
  hasMore?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Maybe<MovieInfo>>>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  movieInfo?: Maybe<MovieInfo>;
  movieSearch?: Maybe<Array<Maybe<MovieInfo>>>;
  popularMovies: PopularMovies;
};

export type RootQueryTypeMovieInfoArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type RootQueryTypeMovieSearchArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type RootQueryTypePopularMoviesArgs = {
  page?: InputMaybe<Scalars['Int']>;
};

export type GetPopularMoviesQueryVariables = Exact<{
  page: Scalars['Int'];
}>;

export type GetPopularMoviesQuery = {
  __typename?: 'RootQueryType';
  popularMovies: {
    __typename?: 'PopularMovies';
    hasMore?: boolean | null;
    page?: number | null;
    results?: Array<{
      __typename?: 'MovieInfo';
      id?: string | null;
      overview?: string | null;
      title?: string | null;
      poster_path?: string | null;
    } | null> | null;
  };
};

export const GetPopularMoviesDocumentParsed = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: {kind: 'Name', value: 'GetPopularMovies'},
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {kind: 'Variable', name: {kind: 'Name', value: 'page'}},
          type: {
            kind: 'NonNullType',
            type: {kind: 'NamedType', name: {kind: 'Name', value: 'Int'}},
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: {kind: 'Name', value: 'popularMovies'},
            arguments: [
              {
                kind: 'Argument',
                name: {kind: 'Name', value: 'page'},
                value: {kind: 'Variable', name: {kind: 'Name', value: 'page'}},
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: {kind: 'Name', value: 'results'},
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {kind: 'Field', name: {kind: 'Name', value: 'id'}},
                      {kind: 'Field', name: {kind: 'Name', value: 'overview'}},
                      {kind: 'Field', name: {kind: 'Name', value: 'title'}},
                      {
                        kind: 'Field',
                        name: {kind: 'Name', value: 'poster_path'},
                      },
                    ],
                  },
                },
                {kind: 'Field', name: {kind: 'Name', value: 'hasMore'}},
                {kind: 'Field', name: {kind: 'Name', value: 'page'}},
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPopularMoviesQuery,
  GetPopularMoviesQueryVariables
>;

export const GetPopularMoviesDocument = gql`
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
`;

/**
 * __useGetPopularMoviesQuery__
 *
 * To run a query within a React component, call `useGetPopularMoviesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPopularMoviesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPopularMoviesQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPopularMoviesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPopularMoviesQuery,
    GetPopularMoviesQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useQuery<GetPopularMoviesQuery, GetPopularMoviesQueryVariables>(
    GetPopularMoviesDocument,
    options
  );
}
export function useGetPopularMoviesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPopularMoviesQuery,
    GetPopularMoviesQueryVariables
  >
) {
  const options = {...defaultOptions, ...baseOptions};
  return Apollo.useLazyQuery<
    GetPopularMoviesQuery,
    GetPopularMoviesQueryVariables
  >(GetPopularMoviesDocument, options);
}
export type GetPopularMoviesQueryHookResult = ReturnType<
  typeof useGetPopularMoviesQuery
>;
export type GetPopularMoviesLazyQueryHookResult = ReturnType<
  typeof useGetPopularMoviesLazyQuery
>;
export type GetPopularMoviesQueryResult = Apollo.QueryResult<
  GetPopularMoviesQuery,
  GetPopularMoviesQueryVariables
>;
