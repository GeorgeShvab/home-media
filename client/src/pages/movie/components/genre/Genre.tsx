import { FC, PropsWithChildren } from 'react'

const Genre: FC<PropsWithChildren> = ({ children }) => {
  return <div className='genre'>{children}</div>
}

export default Genre
