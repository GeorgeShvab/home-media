import { FC } from 'react'
import './styles.scss'

interface Props {
  qualitiesList: string[]
}

const QualityBadges: FC<Props> = ({ qualitiesList }) => {
  return (
    <div className='quality-badges'>
      {qualitiesList.map((quality) => (
        <span key={quality} className='quality-badges__badge'>
          {quality}
        </span>
      ))}
    </div>
  )
}

export default QualityBadges
