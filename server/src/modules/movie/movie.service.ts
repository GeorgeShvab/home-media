import { Injectable } from '@nestjs/common'
import { MovieModel } from 'src/db/models'
import { eq, ilike } from 'drizzle-orm'
import db from 'src/db'
import { movies } from 'src/db/schema'

@Injectable()
class MovieService {
  db = db

  constructor(private readonly MovieModel: MovieModel) {}

  async getAll() {
    return this.MovieModel.select()
  }

  async getById(id: number) {
    return this.db.query.movies
      .findFirst({
        where: eq(this.MovieModel.schema.id, id),
        with: {
          sources: true,
          genres: {
            columns: {
              movieId: false,
              genreId: false
            },
            with: { genre: { columns: { name: true } } }
          }
        }
      })
      .then((res) => ({
        ...res,
        genres: res?.genres.map((item) => item.genre.name)
      }))
  }

  async getBySlug(slug: string) {
    return this.db.query.movies
      .findFirst({
        where: eq(this.MovieModel.schema.slug, slug),
        with: {
          sources: true,
          genres: {
            columns: {
              movieId: false,
              genreId: false
            },
            with: { genre: { columns: { name: true } } }
          }
        }
      })
      .then((res) => ({
        ...res,
        genres: res?.genres.map((item) => item.genre.name)
      }))
  }

  async getIdBySlug(slug: string) {
    const movie = await this.db.query.movies.findFirst({
      where: eq(this.MovieModel.schema.slug, slug)
    })

    return movie?.id
  }

  async search(query: string) {
    const movies = await this.db.query.movies.findMany({
      where: ilike(this.MovieModel.schema.title, `%${query}%`),
      limit: 15,
      orderBy: (movies, {desc}) => [desc(movies.popularity)]
    })

    console.log(movies, query)

    return movies
  }
}

export default MovieService
