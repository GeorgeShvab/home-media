import { FetchAllMoviesResponse } from "./types";

const fetchAllMovies = async (
  page: number
): Promise<FetchAllMoviesResponse> => {
  const response = await fetch("");

  return response.json();
};

export default fetchAllMovies;
