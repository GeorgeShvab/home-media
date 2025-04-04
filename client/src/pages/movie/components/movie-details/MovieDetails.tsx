import { FC } from 'react'
import './styles.scss'
import { format, intervalToDuration } from 'date-fns'
import countryMap from '../../../../constants/countryMap'
import languageMap from '../../../../constants/languageMap'

interface Props {
  releaseDate: string
  originCountries: string[]
  studios: string[]
  originalLanguage: string
  rating: string
  runtime: number
  genres: string[]
}

const MovieDetails: FC<Props> = ({
  originCountries,
  originalLanguage,
  studios,
  genres,
  runtime,
  rating,
  releaseDate
}) => {
  const duration = intervalToDuration({ start: 0, end: runtime * 60 * 1000 })

  const parts = []

  if (duration.hours) parts.push(`${duration.hours}h`)
  if (duration.minutes) parts.push(`${duration.minutes}m`)

  return (
    <div className='movie-details'>
      <p>
        <span className='movie-details__property'>Language:</span>
        <span className='movie-details__value'>
          {languageMap[originalLanguage]}
        </span>
      </p>
      <p>
        <span className='movie-details__property'>Aired:</span>
        <span className='movie-details__value'>
          {format(new Date(releaseDate), 'MMMM d, yyyy')}
        </span>
      </p>
      <p>
        <span className='movie-details__property'>Duration:</span>
        <span className='movie-details__value'>{parts.join(' ')}</span>
      </p>
      <p>
        <span className='movie-details__property'>Country:</span>
        <span className='movie-details__value'>
          {originCountries.map((item) => countryMap[item]).join(', ')}
        </span>
      </p>
      <p>
        <span className='movie-details__property'>Rating:</span>
        <span className='movie-details__value'>{rating}</span>
      </p>
      <hr className='divider' />
      <div className='genres'>
        <span className='movie-details__property'>Genres:</span>
        {genres.map((item) => (
          <div key={item} className='genre'>
            {item}
          </div>
        ))}
      </div>
      <hr className='divider' />
      <p>
        <span className='movie-details__property'>Studios:</span>
        <span className='movie-details__value'>{studios.join(', ')}</span>
      </p>
    </div>
  )
}

export default MovieDetails
