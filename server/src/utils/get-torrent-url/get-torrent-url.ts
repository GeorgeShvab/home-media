import path from 'path'

const STORAGE_PREFIX = process.env.STORAGE_PREFIX
const DOMAIN = process.env.DOMAIN

const getTorrentUrl = (hash: string = '', extra: string = '') => {
  const url = new URL(
    ['http:/' + DOMAIN, "static", hash, extra].join("/")
  ).href

  return url
}

export default getTorrentUrl
