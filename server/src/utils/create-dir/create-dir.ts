import fs from 'fs'
import isFilePath from '../is-file-path/is-file-path'

const createFoldersRecursively = (folders: string[], depth: number) => {
  const currentPath = folders.slice(0, depth).join('\\')

  const isFile = depth === folders.length && isFilePath(currentPath)

  if (depth > folders.length || isFile) return

  if (!fs.existsSync(currentPath)) {
    fs.mkdirSync(currentPath)
  }

  createFoldersRecursively(folders, depth + 1)
}

const createDir = (path: string) => {
  const folders = path
    .split(/\\|\//)
    .filter((item) => !isFilePath(item))
    .join('\\')

  fs.mkdirSync(folders, { recursive: true })
  // const pathArray = path.split(/\\|\//)

  // createFoldersRecursively(pathArray.filter(item => !!item), 1)
}

export default createDir
