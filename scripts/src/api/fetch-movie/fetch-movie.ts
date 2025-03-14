import { FetchMovieData } from "./types";

const fetchMovie = async (id: string): Promise<FetchMovieData> => {
  const response = await fetch("");

  return response.json();
};

export default fetchMovie;
