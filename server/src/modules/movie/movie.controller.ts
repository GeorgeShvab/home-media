import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import MovieService from './movie.service'

@Controller('movies')
class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get('/:slug')
  async getMovie(@Param('slug') slug: string) {
    const movie = await this.MovieService.getBySlug(slug)

    if (!movie) throw new NotFoundException()

    return movie
  }
}

export default MovieController
