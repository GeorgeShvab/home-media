import { FC } from 'react'
import './styles.scss'
import { useMutation } from '@tanstack/react-query'
import { loadSource } from '../../../../api/post'
import { Link } from 'react-router-dom'

interface Props {
  type: string
  quality: string
  size: string
  hash: string
  progress: number
  isBeingLoaded: boolean
  movieSlug: string
}

const Source: FC<Props> = ({
  type,
  quality,
  size,
  hash,
  progress,
  isBeingLoaded,
  movieSlug
}) => {
  const { mutate } = useMutation({
    mutationFn: loadSource
  })

  const handleLoadSource = () => {
    mutate(hash)
  }

  const bg = isBeingLoaded
    ? `linear-gradient(90deg, rgb(24, 24, 27) 0% ${progress}%, rgb(30, 30, 33) ${progress}% 100%)`
    : 'rgb(30, 30, 33)'

  return (
    <div
      className='source'
      style={{
        background: bg
      }}
    >
      <div className='source__label'>
        <span className='source__type'>{type.toUpperCase()}</span>
        <span className='source__quality'>{quality}</span>
      </div>
      {isBeingLoaded && (
        <span className='source__progress'>{progress}% / 100%</span>
      )}
      <div className='source__label'>
        <div className='source__size'>{size}</div>
        {progress === 100 && (
          <Link
            to={`/movies/${movieSlug}/watch/${hash}`}
            className='source__watch-button'
          >
            Watch
          </Link>
        )}
        <button className='source__button' onClick={handleLoadSource}>
          Load
        </button>
      </div>
    </div>
  )
}

export default Source
