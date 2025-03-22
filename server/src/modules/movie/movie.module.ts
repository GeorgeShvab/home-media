import { Module } from '@nestjs/common'
import MovieController from './movie.controller'
import MovieService from './movie.service'
import { MovieModel } from 'src/db/models'

@Module({
  controllers: [MovieController],
  providers: [MovieService, MovieModel]
})
class MovieModule {}

export default MovieModule
