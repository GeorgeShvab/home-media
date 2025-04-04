import path from 'path'
import getExtension from '../get-extension/get-extension'
import isVideo from '../is-video/is-video'

const prettifyTorrentFilePath = (filePath: string, fileName: string) => {
  const extension = getExtension(fileName)
  const folder = filePath.split('\\')

  const newFilename = isVideo(extension) ? 'movie' + extension : fileName

  const newFolder = folder.slice(1, folder.length - 1).join('\\')
  const newPath = path.join(newFolder, newFilename).toLowerCase()

  return newPath
}

export default prettifyTorrentFilePath
