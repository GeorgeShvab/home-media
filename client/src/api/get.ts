import {
  FETCH_MOVIE_ENDPOINT,
  GET_FETCH_SOURCE,
  GET_FETCH_SOURCES_BY_MOVIE,
  GET_SEARCH
} from '../constants/apiEndpoint'
import axios from '../shell/axios'
import { Movie, Source } from '../types/general'
import getQueryPath from '../utils/get-query-path/get-query-path'

export const fetchMovie = (slug: string) => () =>
  axios
    .get<Movie>(getQueryPath(FETCH_MOVIE_ENDPOINT, slug))
    .then((res) => res.data)

export const fetchSources = (slug: string) => () =>
  axios
    .get<Source[]>(getQueryPath(GET_FETCH_SOURCES_BY_MOVIE, slug))
    .then((res) => res.data)

export const fetchSource = (hash: string) => () =>
  axios
    .get<Source & { src: string }>(getQueryPath(GET_FETCH_SOURCE, hash))
    .then((res) => res.data)

  export const fetchSearch = (q: string) => () => 
    axios.get<Movie[]>(GET_SEARCH, { params: { q } })
  .then(res => res.data)