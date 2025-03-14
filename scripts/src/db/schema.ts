import { relations } from "drizzle-orm";
import { foreignKey } from "drizzle-orm/pg-core";
import {
  integer,
  pgTable,
  varchar,
  boolean,
  primaryKey,
  text,
} from "drizzle-orm/pg-core";

export const actorsTable = pgTable("actors", {
  id: integer().primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
  imageUrl: varchar({ length: 255 }),
});

const characters = pgTable(
  "characters",
  {
    movieId: integer()
      .references(() => movies.id)
      .notNull(),
    actorId: integer()
      .references(() => actorsTable.id)
      .notNull(),
    characterName: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.actorId, table.movieId],
    }),
    foreignKey({
      columns: [table.movieId],
      foreignColumns: [movies.id],
    }),
    foreignKey({
      columns: [table.actorId],
      foreignColumns: [actorsTable.id],
    }),
  ]
);

export const sources = pgTable("sources", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  url: varchar({ length: 255 }).notNull(),
  hash: varchar({ length: 255 }).notNull(),
  quality: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
  isRepack: boolean().notNull(),
  videoCodec: varchar({ length: 255 }).notNull(),
  bitDepth: integer().notNull(),
  audioChannels: varchar({ length: 255 }).notNull(),
  size: varchar({ length: 255 }).notNull(),
  sizeBytes: integer().notNull(),
  movieId: integer()
    .references(() => movies.id)
    .notNull(),
});

export const movies = pgTable("movies", {
  id: integer().primaryKey(),
  imdbCode: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  titleEnglish: varchar({ length: 255 }).notNull(),
  titleLong: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
  year: integer().notNull(),
  rating: integer().notNull(),
  runtime: integer().notNull(),
  descriptionFull: text().notNull(),
  ytTrailerCode: varchar({ length: 255 }).notNull(),
  language: varchar({ length: 255 }).notNull(),
  mpaRating: integer().notNull(),
  backgroundImage: varchar({ length: 255 }).notNull(),
  backgroundImageOriginal: varchar({ length: 255 }).notNull(),
  smallCoverImage: varchar({ length: 255 }).notNull(),
  mediumCoverImage: varchar({ length: 255 }).notNull(),
  largeCoverImage: varchar({ length: 255 }).notNull(),
});

export const genres = pgTable("genres", {
  id: varchar({ length: 255 }).primaryKey().notNull(),
  name: varchar({ length: 255 }).notNull(),
});

export const moviesRelations = relations(movies, ({ many, one }) => ({
  sources: one(sources, {
    fields: [movies.id],
    references: [sources.movieId],
  }),
  characters: one(characters, {
    fields: [movies.id],
    references: [characters.movieId],
  }),
  genres: many(genres),
}));
