import { Injectable } from '@nestjs/common'
import CreateTorrent from 'torrent-stream'
import fs from 'fs'
import { encode } from 'magnet-uri'
import createDir from 'src/utils/create-dir/create-dir'
import getExtension from 'src/utils/get-extension/get-extension'
import getTempTorrentPath from 'src/utils/get-temp-torrent-path/get-temp-torrent-path'
import getTorrentPath from 'src/utils/get-torrent-path/get-torrent-path'
import prettifyTorrentfileUrl from 'src/utils/prettify-torrent-file-path/prettify-torrent-file-path'
import getDirectories from 'src/utils/get-directories/get-directories'
import getFilesInDir from 'src/utils/get-files-in-dir/get-files-in-dir'
import getTorrentUrl from 'src/utils/get-torrent-url/get-torrent-url'
import isVideo from 'src/utils/is-video/is-video'
import path from "path"

const isTrash = (extension: string) => {
  return extension === '.txt' || extension === '.jpg'
}

const getFileName = (name: string) => {
  const extension = getExtension(name)
  
  return isVideo(extension) ? 'movie' + extension : name
}

interface Torrent {
  percentsLoaded: number
  fileUrl: string
  download: (cb: () => void) => void
  remove: () => void
}

class ActiveTorrent implements Torrent {
  percentsLoaded: number = 0
  fileUrl: string
  private _hash: string
  private _stream: TorrentStream.TorrentEngine
  private _pieces: number
  private _piecesLoaded: number = 0

  constructor(hash: string) {
    this._hash = hash.toLowerCase()
    this._stream = this._createStream(this._hash)

    this._stream.on('torrent', (metadata: any) => {
      this._pieces = metadata.pieces.length
    })
  }

  download(cb: () => void) {
    this._stream.on('ready', () => {
      this._stream.files.forEach((file) => {
        const extension = getExtension(file.name)

        if (isTrash(extension)) return

        const relativePath = prettifyTorrentfileUrl(file.path)

        const stream = file.createReadStream()

        const fullPath = getTorrentPath(this._hash, relativePath)

        const fileName = getFileName(file.name)

        this.fileUrl = getTorrentUrl(this._hash, path.join(relativePath, fileName))

        fs.mkdirSync(fullPath, { recursive: true })

        stream.pipe(fs.createWriteStream(path.join(fullPath, fileName)))
      })
    })

    this._stream.on('download', () => {
      this._piecesLoaded += 1

      this.percentsLoaded = Math.round(
        (this._piecesLoaded / this._pieces) * 100
      )

      if (this._piecesLoaded === this._pieces) {
        this._removeTemp()
        cb()
      }
    })
  }

  remove() {
    this._stream.destroy(() => {
      this._stream.remove(false, () => {
        const folder = getTorrentPath(this._hash)
        fs.rmdirSync(folder)
      })
    })
  }

  private _removeTemp() {
    this._stream.destroy(() => {
      this._stream.remove(false, () => {
        const folder = getTempTorrentPath(this._hash)
        fs.rmSync(folder, { recursive: true, force: true })
      })
    })
  }

  private _createStream(hash: string) {
    const torrentLink = encode({
      xt: `urn:btih:${hash}`
    })

    const tempPath = getTempTorrentPath(hash)

    createDir(tempPath)

    const stream = CreateTorrent(torrentLink, {
      path: tempPath
    })

    return stream
  }
}

class InactiveTorrent implements Torrent {
  percentsLoaded: number = 100
  fileUrl: string
  private _hash: string

  constructor(hash: string) {
    this._hash = hash
    const movieFileName = getFilesInDir(getTorrentPath(hash)).find((item) =>
      item.includes('movie.')
    )

    this.fileUrl = getTorrentUrl(hash, movieFileName)
  }

  download() {}

  remove() {
    const folder = getTorrentPath(this._hash)
    fs.rmdirSync(folder)
  }
}

@Injectable()
class TorrentService {
  torrents = new Map<string, Torrent>()

  constructor() {
    fs.rmSync(getTempTorrentPath(), { recursive: true, force: true })
    fs.rmSync(getTorrentPath(), { recursive: true, force: true })

    this._initialize()
  }

  load(hash: string) {
    const lowerCasedHash = hash.toLowerCase()

    if (this.torrents.has(lowerCasedHash)) return

    const newTorrent = new ActiveTorrent(lowerCasedHash)

    this.torrents.set(lowerCasedHash, newTorrent)

    newTorrent.download(() => {
      this.torrents.set(lowerCasedHash, new InactiveTorrent(lowerCasedHash))
    })
  }

  remove(hash: string) {
    const lowerCasedHash = hash.toLowerCase()

    const torrent = this._getTorrent(lowerCasedHash)

    torrent.remove()

    this.torrents.delete(lowerCasedHash)
  }

  getProgress(hash: string) {
    const lowerCasedHash = hash.toLowerCase()

    if (!this.isExists(hash)) return null

    const torrent = this._getTorrent(lowerCasedHash)

    return torrent.percentsLoaded
  }

  getUrl(hash: string) {
    return this._getTorrent(hash.toLowerCase()).fileUrl
  }

  isExists(hash: string) {
    return this.torrents.has(hash.toLowerCase())
  }

  private _initialize() {
    if (!fs.existsSync("/storage")) {
      fs.mkdirSync("/storage")
    }

    if (!fs.existsSync(getTempTorrentPath())) {
      fs.mkdirSync(getTempTorrentPath())
    }

      if (!fs.existsSync(getTorrentPath())) {
        fs.mkdirSync(getTorrentPath())
      }



    const dirs = getDirectories(getTorrentPath())

    dirs.forEach((hash) => {
      this.torrents.set(hash, new InactiveTorrent(hash))
    })
  }

  private _getTorrent(hash: string) {
    return this.torrents.get(hash)!
  }
}

export default TorrentService
