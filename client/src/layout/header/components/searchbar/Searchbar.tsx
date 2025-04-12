import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { SEARCH_QUERY_KEY } from '../../../../constants/queryKeys'
import { fetchSearch } from '../../../../api/get'
import './styles.scss'
import { Link } from 'react-router-dom'
import cn from 'classnames'
import DetectOutsideClick from '../../../../components/DetectOutsideClick/DetectOutsideClick'

const Searchbar: FC = () => {
  const [value, setValue] = useState('')

  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: [SEARCH_QUERY_KEY, value],
    queryFn: fetchSearch(value),
    enabled: !!value.trim(),
  })

  const showSuggestions = value.trim() && data && isSuggestionsOpen

  return (
    <DetectOutsideClick
      onOutsideClick={() => {
        console.log('B')
        setIsSuggestionsOpen(false)
      }}
    >
      <div
        className={cn(
          'searchbar',
          showSuggestions && 'searchbar_suggestions-shown'
        )}
        onClick={() => {
          console.log('A')
          setIsSuggestionsOpen(true)
        }}
      >
        <label className="searchbar__container">
          <input
            className="searchbar__input"
            type="text"
            placeholder="Search..."
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        {showSuggestions && (
          <div className="searchbar__suggestions">
            {data?.map((item) => (
              <Link
                className="searchbar__suggestions-item"
                key={item.id}
                to={`/movies/${item.slug}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </DetectOutsideClick>
  )
}

export default Searchbar
