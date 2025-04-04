import { RouteObject } from 'react-router-dom'
import MoviePage from './pages/movie/MoviePage'
import MainPage from './pages/main/MainPage'
import WatchMoviePage from './pages/watch-movie/WatchMoviePage'

const router: RouteObject[] = [
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: '/movies/:slug',
    element: <MoviePage />
  },
  { path: '/movies/:slug/watch/:hash', element: <WatchMoviePage /> }
]

export default router
