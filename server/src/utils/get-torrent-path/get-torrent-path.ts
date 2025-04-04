import path from 'path'

const STORAGE_PREFIX = process.env.STORAGE_PREFIX

const getTorrentPath = (hash: string = '', extra: string = '') => {
  const folderPath = path.join(STORAGE_PREFIX, hash, extra)

  return folderPath
}

export default getTorrentPath
