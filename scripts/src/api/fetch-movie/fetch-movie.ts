import { SourceApiResponse } from '../../../types/general'
import { FetchMovieData } from './types'

const fetchMovie = async (
  id: number
): Promise<SourceApiResponse<FetchMovieData>> => {
  const MOVIE_LINK = process.env.MOVIE_LINK

  const url = new URL(MOVIE_LINK)

  url.searchParams.append('movie_id', id.toString())

  const response = await fetch(url.toString())

  return response.json()
}

export default fetchMovie
