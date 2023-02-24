/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type MovieCredits = {
  __typename?: 'MovieCredits';
  character?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['String']>;
  profile_path?: Maybe<Scalars['String']>;
};

export type MovieInfo = {
  __typename?: 'MovieInfo';
  backdrop_path?: Maybe<Scalars['String']>;
  genres?: Maybe<Scalars['String']>;
  homepage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  movieCredits?: Maybe<Array<Maybe<MovieCredits>>>;
  movieReviews?: Maybe<Array<Maybe<MovieReviews>>>;
  overview?: Maybe<Scalars['String']>;
  popularity?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  production_companies?: Maybe<Scalars['String']>;
  release_date?: Maybe<Scalars['String']>;
  runtime?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  videos?: Maybe<Array<Maybe<Video>>>;
  vote_average?: Maybe<Scalars['String']>;
};


export type MovieInfoMovieCreditsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MovieInfoMovieReviewsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MovieInfoVideosArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type MovieReviews = {
  __typename?: 'MovieReviews';
  author?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export type PopularMovies = {
  __typename?: 'PopularMovies';
  id?: Maybe<Scalars['Int']>;
  overview?: Maybe<Scalars['String']>;
  poster_path?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type RootQueryType = {
  __typename?: 'RootQueryType';
  movieInfo?: Maybe<MovieInfo>;
  popularMovies?: Maybe<Array<Maybe<PopularMovies>>>;
};


export type RootQueryTypeMovieInfoArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type Video = {
  __typename?: 'Video';
  id?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};
