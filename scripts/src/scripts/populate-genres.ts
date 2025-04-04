import { eq } from 'drizzle-orm'
import fetchMovie from '../api/fetch-movie/fetch-movie'
import db from '../db'
import { genres, genresToMovies } from '../db/schema'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config()
;(async () => {
  for (let i = 0; i < 55; i++) {
    const movies = await db.query.movies.findMany({
      offset: 500 * i,
      limit: 500
    })

    for (let j = 0; j < movies.length; j++) {
      try {
        const externalMovie = await fetchMovie(movies[j].id)

        for (let a = 0; a < externalMovie.data.movie.genres.length; a++) {
          try {
            const genre = externalMovie.data.movie.genres[a]

            const isExists = await db.query.genres.findFirst({
              where: eq(genres.id, genre.toLowerCase())
            })

            if (!isExists) {
              await db.insert(genres).values({
                id: genre.toLowerCase(),
                name: genre
              })
            }

            await db.insert(genresToMovies).values({
              movieId: movies[j].id,
              genreId: genre.toLocaleLowerCase()
            })

            console.log(
              `Processed genre: ${genre} for movie ID: ${movies[j].id}`
            )
          } catch (err) {
            console.error(
              `Error processing genre for movie ID: ${movies[j].id}`
            )

            fs.appendFileSync(
              path.join(
                process.cwd(),
                'src',
                'logs',
                `${new Date().toDateString()}.txt`
              ),
              `${JSON.stringify({
                error: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                id: movies[j].id,
                group: i,
                inGroup: j,
                genre: externalMovie.data.movie.genres[a]
              })}\n\n`
            )
          }
        }
      } catch (err) {
        console.error(`Error processing genre for movie ID: ${movies[j].id}`)

        fs.appendFileSync(
          path.join(
            process.cwd(),
            'src',
            'logs',
            `${new Date().toDateString()}.txt`
          ),
          `${JSON.stringify({
            error: JSON.stringify(err, Object.getOwnPropertyNames(err)),
            id: movies[j].id,
            group: i,
            inGroup: j
          })}\n\n`
        )
      }
    }
  }
})()
