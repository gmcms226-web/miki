import { useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
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
import SaleBanner from './components/SaleBanner/SaleBanner'
import Character from './components/Character/Character'
import Footer from './components/Footer/Footer'
import CollectionPage from './components/CollectionPage/CollectionPage'
import AuthModal from './components/AuthModal/AuthModal'
import HamburgerMenu from './components/HamburgerMenu/HamburgerMenu'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home') // 'home' | 'spring' | 'summer'
  const [authOpen, setAuthOpen] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return unsubscribe
  }, [])

  // Polar 결제 성공 후 Success URL로 돌아왔을 때 안내
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      window.history.replaceState(null, '', window.location.pathname)
      alert('결제가 완료되었습니다! 🎉')
    }
  }, [])

  if (page !== 'home') {
    return <CollectionPage season={page} onBack={() => setPage('home')} user={user} />
  }

  return (
    <div className="page-wrapper">
      <aside className="sidebar-area">
        <Sidebar onSelectCollection={setPage} />
      </aside>
      <div className="main-area">
        <Header
          onMenuOpen={() => setMenuOpen(true)}
          user={user}
          onLoginOpen={() => setAuthOpen(true)}
          onLogout={() => signOut(auth)}
        />
        <Hero />
        <Collection onSelect={setPage} />
        <Shop />
        <Video />
        <Product />
        <Store />
        <AboutBrand />
        <HotSpring />
        <SaleBanner />
        <Character />
        <Footer />
      </div>
      <HamburgerMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

export default App
