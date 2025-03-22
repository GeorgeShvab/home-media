import { InferSelectModel, InferInsertModel } from 'drizzle-orm'
import {
  actors,
  characters,
  genres,
  genresToMovies,
  movies,
  sources
} from './schema'

export type Movie = InferSelectModel<typeof movies>

export type Source = InferSelectModel<typeof sources>

export type Actor = InferSelectModel<typeof actors>

export type Character = InferSelectModel<typeof characters>

export type Genres = InferSelectModel<typeof genres>

export type GenreToMovie = InferSelectModel<typeof genresToMovies>
