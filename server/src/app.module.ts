import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import MovieModule from './modules/movie/movie.module'
import SourceModule from './modules/source/source.module'
import path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env.local', '.env'] }),
    ServeStaticModule.forRoot({
      rootPath: process.env.STORAGE_PREFIX,
      serveRoot: '/static'
    },
    {
      rootPath: path.join(process.cwd(), 'static/client'),
      serveRoot: '/'
    }),
    MovieModule,
    SourceModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
