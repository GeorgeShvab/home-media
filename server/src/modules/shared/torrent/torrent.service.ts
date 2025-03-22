import { Injectable } from '@nestjs/common'
import Torrent from 'torrent-stream'
import path from 'path'
import fs from 'fs'
import { encode } from 'magnet-uri'

const STORAGE_PREFIX = process.env.STORAGE_PREFIX

@Injectable()
class TorrentService {
  torrentStreams = new Map<string, TorrentStream.TorrentEngine>()

  load(hash: string) {
    const torrentLink = encode({
      xt: `urn:btih:${hash}`
    })

    const stream = Torrent(torrentLink, { tmp: this._getTorrentPath(hash) })

    // stream.on('ready', () => {
    //   stream.files.forEach((file) => {
    //     const stream = file.createReadStream()

    //     const folderPath = path.join(this._getTorrentPath(hash), file.name)

    //     stream.pipe(fs.createWriteStream(folderPath))
    //   })
    // })

    stream.on('download', (index) => {
      console.log(index)
    })

    this.torrentStreams.set(hash, stream)
  }

  remove(hash: string) {
    const folder = this._getTorrentPath(hash)

    fs.rmdirSync(folder, { recursive: true })

    this.torrentStreams.delete(hash)
  }

  checkProgress() {}

  private _getTorrentPath(hash: string) {
    const folder = path.join(process.cwd(), STORAGE_PREFIX, hash)

    const storageFolder = path.join(process.cwd(), STORAGE_PREFIX)

    if (!fs.existsSync(storageFolder)) {
      fs.mkdirSync(storageFolder)
    }

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    return folder
  }
}

export default TorrentService
