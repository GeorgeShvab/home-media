import Searchbar from '../../layout/header/components/searchbar/Searchbar'
import './styles.scss'

const MainPage = () => {
  return (
    <div className="main-page">
      <div>
        <h1 className="main-page__title">Search Movies</h1>
        <Searchbar />
      </div>
    </div>
  )
}

export default MainPage
