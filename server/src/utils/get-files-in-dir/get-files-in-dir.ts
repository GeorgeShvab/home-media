import fs from 'fs'

const getFilesInDir = (source: string) =>
  fs
    .readdirSync(source, { withFileTypes: true })
    .filter((el) => el.isFile())
    .map((el) => el.name)

export default getFilesInDir
