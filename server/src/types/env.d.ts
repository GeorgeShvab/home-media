declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      ALL_MOVIES_LINK: string
      MOVIE_LINK: string
      STORAGE_PREFIX: string
      TEMP_STORAGE_PREFIX: string
      DOMAIN: string
    }
  }
}

declare module 'torrent-stream' {
  export interface Swarm {
    overallSize: number
  }
}

export {}
