import fetchAllMovies from "../api/fetch-all-movies/fetchAllMovies";
import db from "../db";
import { Movie } from "../db/types";
import { movies } from "../db/schema";

(async () => {
  let done = false;
  let i = 0;

  while (!done) {
    const allMovies = await fetchAllMovies(i);

    const preparedMovies: Movie[] = allMovies.data.movies.map((item) => ({
      id: item.id,
      title: item.title,
      titleEnglish: item.title_english,
      titleLong: item.title_long,
      ytTrailerCode: item.yt_trailer_code,
      rating: item.rating,
      runtime: item.runtime,
      mpaRating: Number(item.mpa_rating),
      year: item.year,
      slug: item.slug,
      smallCoverImage: item.small_cover_image,
      descriptionFull: item.description_full,
      language: item.language,
      largeCoverImage: item.large_cover_image,
      imdbCode: item.imdb_code,
      mediumCoverImage: item.medium_cover_image,
      backgroundImage: item.background_image,
      backgroundImageOriginal: item.background_image_original,
    }));

    await db.insert(movies).values(preparedMovies);

    console.log(
      `Iteration: ${i}; Inserted movies: \n ${preparedMovies
        .map((item) => item.titleEnglish)
        .join("\n")}`
    );

    i++;
  }
})();
