import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { FETCH_MOVIE_QUERY_KEY } from '../../constants/queryKeys'
import useParams from '../../shell/react-router/useParams'
import { fetchMovie } from '../../api/get'
import './styles.scss'
import PlayIcon from '../../components/icons/PlayIcon'
import AddIcon from '../../components/icons/AddIcon'
import Breadcrumbs from './components/breadcrumbs/Breadcrumbs'
import QualityBadges from './components/quality-badges/QualityBadges'
import Button from '../../ui/button/Button'
import Sources from './components/sources/Sources'
import MovieDetails from './components/movie-details/MovieDetails'

const MoviePage: FC = () => {
  const params = useParams()

  const { data } = useQuery({
    queryKey: [FETCH_MOVIE_QUERY_KEY],
    queryFn: fetchMovie(params.slug)
  })

  console.log(data)

  if (!data) return null

  const availableQualities = data.sources.map((item: any) => item.quality)

  const qualities = availableQualities.filter(
    (item, index) => availableQualities.indexOf(item) === index
  )

  return (
    <div>
      <div className='movie-page__backdrop-layer' />
      <img className='movie-page__backdrop-img' src={data.largeCoverImage} />

      <div className='container'>
        <div className='movie-page__banner'>
          <div className='movie-page__poster'>
            <img
              className='movie-page__poster-img'
              src={data.largeCoverImage}
            />
          </div>
          <div className='movie-page__main'>
            <Breadcrumbs movieTitle={data.title} />
            <h2 className='movie-page__title'>{data.title}</h2>
            <QualityBadges qualitiesList={qualities} />
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
              <Button
                startIcon={
                  <PlayIcon
                    strokeWidth={3.5}
                    style={{ height: '20px', width: '20px' }}
                  />
                }
              >
                Watch Now
              </Button>
              <Button
                color='light'
                startIcon={
                  <AddIcon style={{ height: '20px', width: '20px' }} />
                }
              >
                Load
              </Button>
            </div>
            <p className='movie-page__description'>{data.description}</p>
          </div>
          <MovieDetails
            releaseDate={data.releaseDate}
            rating={data.rating}
            runtime={data.runtime}
            originCountries={data.originCountry}
            originalLanguage={data.language}
            genres={data.genres}
            studios={data.productionCompanies}
          />
        </div>
      </div>
      <div className='main-page__content'>
        <div className='container' style={{ display: 'flex', gap: '40px' }}>
          <Sources movieSlug={params.slug} />
          <div style={{ width: '400px' }}></div>
        </div>
      </div>
    </div>
  )
}

export default MoviePage
