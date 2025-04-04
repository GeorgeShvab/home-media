import fetchAllMovies from '../api/fetch-all-movies/fetch-all-movies'
import fetchImdbMovie from '../api/fetch-imdb-movie/fetch-imdb-movie'
import fetchMovieDbMovie from '../api/fetch-movie-db-movie/fetch-movie-db-movie'
import fetchMovie from '../api/fetch-movie/fetch-movie'
import db from '../db'
import path from 'path'
import fs from 'fs'
import {
  actors,
  characters,
  genres,
  genresToMovies,
  movies,
  sources
} from '../db/schema'
import {
  Actor,
  Character,
  Genres,
  GenreToMovie,
  Movie,
  Source
} from '../db/types'

const PAGE_SIZE = 20

;(async () => {
  const count = (await fetchAllMovies(1)).data.movie_count
  const allGenres = await db.select().from(genres)
  const allMovies = await db.select().from(movies)
  const allCharacters = await db.select().from(characters)
  const allActors = await db.select().from(actors)

  const existingGenres = new Set(allGenres.map((item) => item.id))
  const existingMovies = new Set(allMovies.map((item) => item.id))
  const existingCharacters = new Set(
    allCharacters.map((item) => item.actorId + item.movieId)
  )
  const existingActors = new Set(allActors.map((item) => item.id))

  outerLoop: for (let i = 1; i <= Math.ceil(count / PAGE_SIZE); i++) {
    const allMovies = await fetchAllMovies(i)

    innerLoop: for (let j = 0; j < allMovies.data.movies.length; j++) {
      try {
        const movieId = allMovies.data.movies[j].id
        const imdbMovieId = allMovies.data.movies[j].imdb_code

        if (existingMovies.has(movieId)) {
          continue innerLoop
        }

        const movie = (await fetchMovie(movieId)).data.movie

        const imdbMovie = await fetchImdbMovie(imdbMovieId)

        if (!imdbMovie) continue innerLoop

        const theMovieDbMovie = await fetchMovieDbMovie(imdbMovie.id)

        const preparedMovie: Movie = {
          id: movie.id,
          title: movie.title,
          titleEnglish: movie.title_english,
          titleLong: movie.title_long,
          ytTrailerCode: movie.yt_trailer_code,
          rating: String(movie.rating),
          runtime: movie.runtime,
          year: movie.year,
          slug: movie.slug,
          smallCoverImage: movie.small_cover_image,
          description: theMovieDbMovie.overview,
          language: movie.language,
          largeCoverImage: movie.large_cover_image,
          imdbCode: movie.imdb_code,
          mediumCoverImage: movie.medium_cover_image,
          backgroundImage: movie.background_image,
          backgroundImageOriginal: movie.background_image_original,
          movieDbId: theMovieDbMovie.id,
          adult: theMovieDbMovie.adult,
          budget: theMovieDbMovie.budget,
          homePage: theMovieDbMovie.homepage,
          originCountry: theMovieDbMovie.origin_country,
          popularity: String(theMovieDbMovie.popularity),
          voteAverage: String(theMovieDbMovie.vote_average),
          voteCount: theMovieDbMovie.vote_count,
          productionCompanies: theMovieDbMovie.production_companies.map(
            (item) => item.name
          ),
          productionCountries: theMovieDbMovie.production_countries.map(
            (item) => item.iso_3166_1
          ),
          releaseDate: theMovieDbMovie.release_date,
          tagline: theMovieDbMovie.tagline,
          revenue: theMovieDbMovie.revenue,
          status: theMovieDbMovie.status
        }

        const preparedSources: Source[] = movie.torrents.map((item) => ({
          url: item.url,
          hash: item.hash,
          quality: item.quality,
          type: item.type,
          isRepack: !!item.is_repack,
          videoCodec: item.video_codec,
          bitDepth: item.bit_depth,
          audioChannels: item.audio_channels,
          size: item.size,
          sizeBytes: item.size_bytes,
          movieId: movie.id
        })) as unknown as Source[]

        const preparedActors: Actor[] = movie.cast
          ?.filter((item) => !existingActors.has(Number(item.imdb_code)))
          ?.map((item) => ({
            id: Number(item.imdb_code),
            name: item.name,
            imageUrl: item.url_small_image
          }))

        const preparedCharacters: Character[] = movie.cast
          ?.filter(
            (item) => !existingCharacters.has(Number(item.imdb_code) + movie.id)
          )
          ?.map((item) => ({
            actorId: Number(item.imdb_code),
            movieId: movie.id,
            characterName: item.character_name
          }))

        const preparedGenres: Genres[] = movie.genres
          ?.filter((item) => !existingGenres.has(item.toLowerCase()))
          .map((item) => ({
            id: item.toLowerCase(),
            name: item
          }))

        const movieGenres: GenreToMovie[] = movie.genres.map((item) => ({
          genreId: item.toLowerCase(),
          movieId: movie.id
        }))

        await db.insert(movies).values(preparedMovie)

        existingMovies.add(movie.id)

        await db.insert(sources).values(preparedSources)

        if (preparedActors && preparedActors.length) {
          await db.insert(actors).values(preparedActors)
          preparedActors.forEach((item) => existingActors.add(item.id))
        }

        if (preparedCharacters && preparedCharacters.length) {
          await db.insert(characters).values(preparedCharacters)
          preparedCharacters.forEach((item) =>
            existingCharacters.add(item.actorId + item.movieId)
          )
        }

        if (preparedGenres && preparedGenres.length) {
          await db.insert(genres).values(preparedGenres)
          await db.insert(genresToMovies).values(movieGenres)
          preparedGenres.forEach((item) => existingGenres.add(item.id))
        }

        console.log(
          `Inserted movie ${movie.title} with id ${movie.id}. Movies parsed: ${
            (i - 1) * PAGE_SIZE + j + 1
          }. Pages parsed: ${i}`
        )
      } catch (err) {
        fs.appendFileSync(
          path.join(
            process.cwd(),
            'src',
            'logs',
            `${new Date().toDateString()}.txt`
          ),
          `${JSON.stringify({
            error: JSON.stringify(err, Object.getOwnPropertyNames(err)),
            id: allMovies.data.movies[j].id,
            page: i,
            pageCount: j
          })}\n\n`
        )
        console.log(
          `Error happened. Movie id ${
            allMovies.data.movies[j].id
          }. Movies parsed: ${(i - 1) * PAGE_SIZE + j + 1}. Pages parsed: ${i}`
        )
      }
    }
  }
})()
