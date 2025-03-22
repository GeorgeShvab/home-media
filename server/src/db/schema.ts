import { relations } from 'drizzle-orm'
import { foreignKey } from 'drizzle-orm/pg-core'
import {
  integer,
  pgTable,
  varchar,
  boolean,
  primaryKey,
  text,
  decimal,
  serial,
  bigint
} from 'drizzle-orm/pg-core'

export const actors = pgTable('actors', {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 })
})

export const characters = pgTable(
  'characters',
  {
    movieId: integer()
      .references(() => movies.id)
      .notNull(),
    actorId: integer()
      .references(() => actors.id)
      .notNull(),
    characterName: varchar({ length: 255 }).notNull()
  },
  (table) => [
    primaryKey({
      columns: [table.actorId, table.movieId]
    }),
    foreignKey({
      columns: [table.movieId],
      foreignColumns: [movies.id]
    }),
    foreignKey({
      columns: [table.actorId],
      foreignColumns: [actors.id]
    })
  ]
)

export const sources = pgTable('sources', {
  id: serial().primaryKey(),
  url: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
  quality: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  isRepack: boolean().notNull(),
  videoCodec: varchar({ length: 255 }).notNull(),
  bitDepth: integer().notNull(),
  audioChannels: varchar({ length: 255 }).notNull(),
  size: varchar({ length: 255 }).notNull(),
  sizeBytes: bigint({ mode: 'number' }).notNull(),
  movieId: integer()
    .references(() => movies.id)
    .notNull()
})

export const movies = pgTable('movies', {
  id: integer().primaryKey(),
  imdbCode: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  titleEnglish: varchar({ length: 255 }).notNull(),
  titleLong: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  year: integer().notNull(),
  rating: decimal().notNull(),
  runtime: integer().notNull(),
  description: text().notNull(),
  ytTrailerCode: varchar({ length: 255 }).notNull(),
  language: varchar({ length: 255 }).notNull(),
  backgroundImage: varchar({ length: 255 }).notNull(),
  backgroundImageOriginal: varchar({ length: 255 }).notNull(),
  smallCoverImage: varchar({ length: 255 }).notNull(),
  mediumCoverImage: varchar({ length: 255 }).notNull(),
  largeCoverImage: varchar({ length: 255 }).notNull()
})

export const genres = pgTable('genres', {
  id: varchar({ length: 255 }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull()
})

export const genresToMovies = pgTable('genres_to_movies', {
  genreId: varchar({ length: 255 })
    .references(() => genres.id)
    .notNull(),
  movieId: integer()
    .references(() => movies.id)
    .notNull()
})

export const moviesRelations = relations(movies, ({ many }) => ({
  sources: many(sources),
  characters: many(characters),
  genres: many(genres)
}))

export const sourcesRelations = relations(sources, ({ one }) => ({
  movie: one(movies, {
    fields: [sources.movieId],
    references: [movies.id]
  })
}))

export const actorsRelations = relations(actors, ({ many }) => ({
  characters: many(characters)
}))

export const charactersRelations = relations(characters, ({ one }) => ({
  actor: one(actors, {
    fields: [characters.actorId],
    references: [actors.id]
  }),
  movie: one(movies, {
    fields: [characters.movieId],
    references: [movies.id]
  })
}))

export const genresToMoviesRelations = relations(genresToMovies, ({ one }) => ({
  genre: one(genres, {
    fields: [genresToMovies.genreId],
    references: [genres.id]
  }),
  movie: one(movies, {
    fields: [genresToMovies.movieId],
    references: [movies.id]
  })
}))
