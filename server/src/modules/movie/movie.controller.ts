import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import MovieService from './movie.service'

@Controller('movies')
class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get('/:movieId')
  async getMovie(@Param('movieId') id: number) {
    const movie = await this.MovieService.getById(id)

    if (!movie) throw new NotFoundException()

    return movie
  }
}

export default MovieController
