import { useQuery } from '@tanstack/react-query'
import useParams from '../../shell/react-router/useParams'
import { GET_FETCH_SOURCE } from '../../constants/apiEndpoint'
import { fetchSource } from '../../api/get'
import './styles.scss'

const WatchMoviePage = () => {
  const params = useParams()

  const { data } = useQuery({
    queryKey: [GET_FETCH_SOURCE, params.hash],
    queryFn: fetchSource(params.hash)
  })

  if (!data) return null

  console.log(data)

  return (
    <div className='watch-movie-page'>
      <div className='container'>
        <div className='watch-movie-page__container'>
          <video controls className='player' src={data.src}></video>
        </div>
      </div>
    </div>
  )
}

export default WatchMoviePage
