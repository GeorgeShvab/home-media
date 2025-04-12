import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from '@nestjs/common'
import MovieService from './movie.service'

@Controller('movies')
class MovieController {
  constructor(private readonly MovieService: MovieService) {}

  @Get("/search")
  async searchMovies(@Query("q") query: string) {

    if (!query) throw new BadRequestException()

    const movies = await this.MovieService.search(query)
    
    return movies
  }

  @Get('/:slug')
  async getMovie(@Param('slug') slug: string) {
    const movie = await this.MovieService.getBySlug(slug)

    if (!movie) throw new NotFoundException()

    return movie
  }
}

export default MovieController
