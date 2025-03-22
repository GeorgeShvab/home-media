import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common'
import SourceService from './source.service'
import TorrentService from '../shared/torrent/torrent.service'
import MovieService from '../movie/movie.service'

@Controller()
class SourceController {
  constructor(
    private readonly SourceService: SourceService,
    private readonly TorrentService: TorrentService,
    private readonly MovieService: MovieService
  ) {}

  @Get('/movies/:slug/sources')
  async getSourcesByMovieId(@Param('slug') slug: string) {
    const movieId = await this.MovieService.getIdBySlug(slug)

    if (!movieId) throw new NotFoundException()

    return this.SourceService.getByMovieId(movieId)
  }

  @Post('/sources/:hash/load')
  loadSource(@Param('hash') hash: string) {
    this.TorrentService.load(hash)

    return null
  }
}

export default SourceController
