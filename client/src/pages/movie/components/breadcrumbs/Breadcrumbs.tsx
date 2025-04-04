import { FC } from 'react'
import './styles.scss'

interface Props {
  movieTitle: string
}

const Breadcrumbs: FC<Props> = ({ movieTitle }) => {
  return (
    <div className='breadcrumbs'>
      <span className='breadcrumbs__item'>Home</span>
      <span className='breadcrumbs__bull'>&bull;</span>
      <span className='breadcrumbs__item'>Movies</span>
      <span className='breadcrumbs__bull'>&bull;</span>
      <span className='breadcrumbs__item breadcrumbs__item-current'>
        {movieTitle}
      </span>
    </div>
  )
}

export default Breadcrumbs
