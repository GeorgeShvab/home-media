import { FetchAllMoviesResponse } from './types'
import 'dotenv/config'

const ALL_MOVIES_URL = process.env.ALL_MOVIES_LINK

const fetchAllMovies = async (
  page: number
): Promise<FetchAllMoviesResponse> => {
  const url = new URL(ALL_MOVIES_URL)
  url.searchParams.append('page', page.toString())
  url.searchParams.append('sort_by', 'download_count')

  const response = await fetch(url.toString())

  return response.json()
}

export default fetchAllMovies
