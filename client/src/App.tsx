import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'
import Router from './Router'

function App() {
  return (
    <div className='layout'>
      <Header />
        <Router />
      <Footer />
    </div>
  )
}

export default App
