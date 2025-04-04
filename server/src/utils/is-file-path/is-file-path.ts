import path from 'path'

function isFilePath(location: string) {
  const ext = path.extname(location)
  return Boolean(ext)
}

export default isFilePath
