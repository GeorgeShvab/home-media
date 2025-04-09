import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from "../db/schema"

const targetDbUrl = "postgresql://postgres:1111@192.0.0.9:5432/homemedia"
const sourceDbUrl = "postgresql://postgres:1111@192.0.0.9:5432/homemedia"


const target = drizzle({ connection: targetDbUrl, schema });
const source = drizzle({ connection: sourceDbUrl, schema });

const L = 250;

(async () => {

    let i = 0

    while (true) {
        const movies = await source.query.movies.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!movies.length) break
          
          
          await target.insert(schema.movies).values(movies)
    }

    i = 0

    while (true) {
        const sources = await source.query.sources.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!sources.length) break
          
          
          await target.insert(schema.sources).values(sources)
    }

    i = 0

    while (true) {
        const actors = await source.query.actors.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!actors.length) break
          
          
          await target.insert(schema.actors).values(actors)
    }

    i = 0

    while (true) {
        const characters = await source.query.characters.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!characters.length) break
          
          
          await target.insert(schema.characters).values(characters)
    }

    i = 0

    while (true) {
        const genres = await source.query.genres.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!genres.length) break
          
          
          await target.insert(schema.genres).values(genres)
    }

    i = 0

    while (true) {
        const genresToMovies = await source.query.genresToMovies.findMany({
            
            limit: L,
            offset: i * L
          })

          if (!genresToMovies.length) break
          
          
          await target.insert(schema.genresToMovies).values(genresToMovies)
    }
})()