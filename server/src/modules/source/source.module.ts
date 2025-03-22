import { Module } from '@nestjs/common'
import SourceController from './source.controller'
import SourceService from './source.service'
import TorrentService from '../shared/torrent/torrent.service'
import { MovieModel, SourceModel } from 'src/db/models'
import MovieService from '../movie/movie.service'

@Module({
  controllers: [SourceController],
  providers: [
    SourceService,
    TorrentService,
    SourceModel,
    MovieService,
    MovieModel
  ]
})
class SourceModule {}

export default SourceModule
