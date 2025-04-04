import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import router from './router'
import Header from './layout/header/Header'
import Footer from './layout/footer/Footer'

function App() {
  return (
    <div className='layout'>
      <Header />
      <RouterProvider router={createBrowserRouter(router)} />
      <Footer />
    </div>
  )
}

export default App
