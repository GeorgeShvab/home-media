import path from 'path'

const STORAGE_PREFIX = process.env.STORAGE_PREFIX
const DOMAIN = process.env.DOMAIN

const getTorrentUrl = (hash: string = '', extra: string = '') => {
  const url = new URL(
    path.join('http://' + DOMAIN, STORAGE_PREFIX, hash, extra)
  ).href

  return url
}

export default getTorrentUrl
