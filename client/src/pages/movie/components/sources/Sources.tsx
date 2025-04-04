import { FC } from 'react'
import Source from '../source/Source'
import './styles.scss'
import { useQuery } from '@tanstack/react-query'
import { FETCH_SOURCES_QUERY_KEY } from '../../../../constants/queryKeys'
import { fetchSources } from '../../../../api/get'

interface Props {
  movieSlug: string
}

const Sources: FC<Props> = ({ movieSlug }) => {
  const { data } = useQuery({
    queryKey: [FETCH_SOURCES_QUERY_KEY, movieSlug],
    queryFn: fetchSources(movieSlug),
    refetchInterval: 10 * 1000
  })

  if (!data) return null

  return (
    <div className='sources'>
      {data.map((source) => (
        <Source
          isBeingLoaded={source.isBeingLoaded}
          size={source.size}
          type={source.type}
          quality={source.quality}
          hash={source.hash}
          progress={source.progress}
          movieSlug={movieSlug}
        />
      ))}
    </div>
  )
}

export default Sources
