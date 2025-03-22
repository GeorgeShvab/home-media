import db from '.'
import { actors, characters, genres, movies, sources } from './schema'

export class MovieModel {
  schema = movies
  insert() {
    return db.insert(movies)
  }
  select() {
    return db.select().from(movies)
  }
}

export class SourceModel {
  schema = sources
  insert() {
    return db.insert(sources)
  }
  select() {
    return db.select().from(sources)
  }
}

export class GenreModel {
  schema = genres
  insert() {
    return db.insert(genres)
  }
  select() {
    return db.select().from(genres)
  }
}

export class ActorModel {
  schema = actors
  insert() {
    return db.insert(actors)
  }
  select() {
    return db.select().from(actors)
  }
}

export class CharacterModel {
  schema = characters
  insert() {
    return db.insert(characters)
  }
  select() {
    return db.select().from(characters)
  }
}
