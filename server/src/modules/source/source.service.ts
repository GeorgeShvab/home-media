import { Injectable } from '@nestjs/common'
import { eq } from 'drizzle-orm'
import { SourceModel } from 'src/db/models'

@Injectable()
class SourceService {
  constructor(private readonly SourceModel: SourceModel) {}

  getByMovieId(movieId: number) {
    return this.SourceModel.select().where(
      eq(this.SourceModel.schema.movieId, movieId)
    )
  }
}

export default SourceService
