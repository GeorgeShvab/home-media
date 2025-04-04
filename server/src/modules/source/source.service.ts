import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import db from 'src/db'
import { SourceModel } from 'src/db/models'

@Injectable()
class SourceService {
  db = db

  constructor(private readonly SourceModel: SourceModel) {}

  getByMovieId(movieId: number) {
    return this.SourceModel.select().where(
      eq(this.SourceModel.schema.movieId, movieId)
    )
  }

  getByHash(hash: string) {
    return this.db.query.sources.findFirst({
      where: eq(this.SourceModel.schema.hash, hash)
    })
  }
}

export default SourceService
