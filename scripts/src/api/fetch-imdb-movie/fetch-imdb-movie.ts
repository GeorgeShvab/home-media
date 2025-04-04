import { ImdbMovie, ImdbResponse } from './types'

const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY

const fetchImdbMovie = async (id: string): Promise<ImdbMovie> => {
  const data = await fetch(
    `https://api.themoviedb.org/3/find/${id}?external_source=imdb_id`,
    {
      headers: {
        Authorization: `Bearer ${MOVIE_DB_KEY}`
      }
    }
  ).then((res) => res.json())

  return data.movie_results[0]
}

export default fetchImdbMovie
