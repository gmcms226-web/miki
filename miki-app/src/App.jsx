import { useState } from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Collection from './components/Collection/Collection'
import Shop from './components/Shop/Shop'
import Video from './components/Video/Video'
import Product from './components/Product/Product'
import Store from './components/Store/Store'
import AboutBrand from './components/AboutBrand/AboutBrand'
import HotSpring from './components/HotSpring/HotSpring'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="page-wrapper">
      <aside className="sidebar-area">
        <Sidebar />
      </aside>
      <div className="main-area">
        <Header onMenuOpen={() => setMenuOpen(true)} />
        <Hero />
        <Collection />
        <Shop />
        <Video />
        <Product />
        <Store />
        <AboutBrand />
        <HotSpring />
      </div>
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  )
}

export default App
