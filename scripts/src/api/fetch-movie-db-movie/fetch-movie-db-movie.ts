import { TheMovieDbResponse } from './types'

const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY

const fetchMovieDbMovie = async (id: number): Promise<TheMovieDbResponse> => {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${MOVIE_DB_KEY}`
      }
    }
  )

  return data.json()
}

export default fetchMovieDbMovie
