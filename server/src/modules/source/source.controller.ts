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

  @Get('/sources/:hash')
  async getSourceByHash(@Param('hash') hash: string) {
    if (!this.TorrentService.isExists(hash)) throw new NotFoundException()

    const source = await this.SourceService.getByHash(hash)

    return {
      ...source,
      src: this.TorrentService.getUrl(hash)
    }
  }

  @Get('/movies/:slug/sources')
  async getSourcesByMovieId(@Param('slug') slug: string) {
    const movieId = await this.MovieService.getIdBySlug(slug)

    if (!movieId) throw new NotFoundException()

    const sources = await this.SourceService.getByMovieId(movieId)

    const sourcesWithProgress = sources.map((source) => ({
      ...source,
      isBeingLoaded: this.TorrentService.isExists(source.hash),
      progress: this.TorrentService.getProgress(source.hash)
    }))

    return sourcesWithProgress
  }

  @Post('/sources/:hash/load')
  loadSource(@Param('hash') hash: string) {
    this.TorrentService.load(hash)

    return 'SUCCESS'
  }

  @Get('/sources/:hash/progress')
  getProgress(@Param('hash') hash: string) {
    const progress = this.TorrentService.getProgress(hash)

    if (progress === null) throw new NotFoundException()

    return progress
  }

  @Get('/sources/:hash/url')
  async getSourceUrl(@Param('hash') hash: string) {
    const torrent = this.TorrentService.isExists(hash)

    if (torrent === null) throw new NotFoundException()

    return this.TorrentService.getUrl(hash)
  }
}

export default SourceController
