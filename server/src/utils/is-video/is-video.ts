const videoExtensions = [
  '.mp4',
  '.m4v',
  '.mov',
  '.qt',
  '.avi',
  '.wmv',
  '.asf',
  '.mkv',
  '.webm',
  '.flv',
  '.vob',
  '.ogv',
  '.ogg',
  '.drc',
  '.gifv',
  '.mng',
  '.mts',
  '.m2ts',
  '.ts',
  '.divx',
  '.f4v',
  '.3gp',
  '.3g2',
  '.rm',
  '.rmvb',
  '.viv',
  '.amv',
  '.mpg',
  '.mpeg',
  '.mpv',
  '.mxf',
  '.roq',
  '.nsv',
  '.f4p',
  '.f4a',
  '.f4b'
]

const isVideo = (extension: string) => {
  const possibleVideoExtensions = new Set(videoExtensions)

  return possibleVideoExtensions.has(extension.toLowerCase())
}

export default isVideo
