export interface Movie {
  id: number
  imdbCode: string
  title: string
  titleEnglish: string
  titleLong: string
  slug: string
  year: 2024
  rating: string
  runtime: 100
  description: string
  ytTrailerCode: string
  language: string
  backgroundImage: string
  backgroundImageOriginal: string
  smallCoverImage: string
  mediumCoverImage: string
  largeCoverImage: string
  movieDbId: number
  adult: boolean
  budget: number
  revenue: number
  homePage: string
  originCountry: string[]
  popularity: string
  productionCompanies: string[]
  productionCountries: string[]
  releaseDate: string
  status: string
  tagline: string
  voteAverage: string
  voteCount: number
  sources: Source[]
  genres: string[]
}

export interface Source {
  id: number
  url: string
  hash: string
  quality: string
  type: string
  isRepack: boolean
  videoCodec: string
  bitDepth: number
  audioChannels: string
  size: string
  sizeBytes: number
  movieId: number
  progress: number
  isBeingLoaded: boolean
}
