import path from 'path'
import getExtension from '../get-extension/get-extension'
import isVideo from '../is-video/is-video'

const prettifyTorrentFilePath = (filePath: string) => {
  const folder = filePath.split('\\')

  const newFolder = folder.slice(1, folder.length - 1).join('\\')
  const newPath = path.join(newFolder).toLowerCase()

  return newPath
}

export default prettifyTorrentFilePath
