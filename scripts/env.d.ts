declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      ALL_MOVIES_LINK: string
      MOVIE_LINK: string
    }
  }
}

export {}
