import path from 'path'

const TEMP_STORAGE_PREFIX = process.env.TEMP_STORAGE_PREFIX

const getTempTorrentPath = (hash: string = '', extra: string = '') => {
  const folderPath = path.join(TEMP_STORAGE_PREFIX, hash, extra)

  return folderPath
}

export default getTempTorrentPath
