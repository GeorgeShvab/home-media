import LogoIcon from '../../components/icons/LogoIcon'
import Searchbar from './components/searchbar/Searchbar'
import './styles.scss'

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__logo">
            <LogoIcon />
            <span className="header__logo-text">Home Media</span>
          </div>
          <Searchbar />
        </div>
      </div>
    </div>
  )
}

export default Header
