import { useParams as useParamsModule } from 'react-router-dom'

const useParams = () => {
  return useParamsModule() as Record<string, string>
}

export default useParams
