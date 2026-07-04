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
import CartDrawer from './components/CartDrawer/CartDrawer'
import MemberDrawer from './components/MemberDrawer/MemberDrawer'
import BrandPage from './components/BrandPage/BrandPage'
import PickupPage from './components/PickupPage/PickupPage'
import ShopSelectModal from './components/ShopSelectModal/ShopSelectModal'
import TopButton from './components/TopButton/TopButton'
import './App.css'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home') // 'home' | 'spring' | 'summer' | 'brand' | 'pickup'
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [cartOpen, setCartOpen] = useState(false)
  const [shopSelectOpen, setShopSelectOpen] = useState(false)
  const [memberPanel, setMemberPanel] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [favoriteItems, setFavoriteItems] = useState([])
  const [recentItems, setRecentItems] = useState([])
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

  const addToCart = (item, context) => {
    const cartItem = {
      ...item,
      season: context.season,
      seasonLabel: context.seasonLabel,
      lookNumber: context.lookNumber,
      lookTitle: context.lookTitle,
    }
    addRecentItem(cartItem)
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === cartItem.id)
      if (existing) {
        return prev.map((entry) => (
          entry.id === cartItem.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        ))
      }
      return [...prev, { ...cartItem, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const increaseCartItem = (id) => {
    setCartItems((prev) => prev.map((item) => (
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )))
  }

  const decreaseCartItem = (id) => {
    setCartItems((prev) => prev.flatMap((item) => {
      if (item.id !== id) return [item]
      if (item.quantity <= 1) return []
      return [{ ...item, quantity: item.quantity - 1 }]
    }))
  }

  const removeCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleBuy = (item) => {
    addRecentItem(item)
    if (!item.checkoutUrl) {
      alert('결제 준비 중입니다.')
      return
    }
    const url = user?.email
      ? `${item.checkoutUrl}?customer_email=${encodeURIComponent(user.email)}`
      : item.checkoutUrl
    window.location.href = url
  }

  const openAuth = (mode = 'login') => {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  // 비로그인 상태에서 회원 기능 접근 시 로그인 모달로 유도
  const requireLogin = (action) => (...args) => {
    if (!user) {
      openAuth('login')
      return
    }
    action(...args)
  }

  const addRecentItem = (item) => {
    setRecentItems((prev) => [
      { ...item, viewedAt: Date.now() },
      ...prev.filter((entry) => entry.id !== item.id),
    ].slice(0, 12))
  }

  const toggleFavorite = (item, context) => {
    const favoriteItem = {
      ...item,
      season: context.season,
      seasonLabel: context.seasonLabel,
      lookNumber: context.lookNumber,
      lookTitle: context.lookTitle,
    }
    addRecentItem(favoriteItem)
    setFavoriteItems((prev) => (
      prev.some((entry) => entry.id === favoriteItem.id)
        ? prev.filter((entry) => entry.id !== favoriteItem.id)
        : [favoriteItem, ...prev]
    ))
  }

  const removeFavorite = (id) => {
    setFavoriteItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearRecentItems = () => {
    setRecentItems([])
  }

  const guardedAddToCart = requireLogin(addToCart)
  const guardedToggleFavorite = requireLogin(toggleFavorite)
  const openCart = requireLogin(() => setCartOpen(true))
  const openMemberPanel = requireLogin((panel) => setMemberPanel(panel))

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (page === 'brand') {
    return (
      <>
        <BrandPage onBack={() => setPage('home')} onSelectCollection={setPage} />
        <TopButton />
      </>
    )
  }

  if (page === 'pickup') {
    return (
      <>
        <PickupPage onBack={() => setPage('home')} />
        <TopButton />
      </>
    )
  }

  if (page !== 'home') {
    return (
      <>
        <CollectionPage
          season={page}
          onBack={() => setPage('home')}
          user={user}
          onAddToCart={guardedAddToCart}
          favoriteItems={favoriteItems}
          onToggleFavorite={guardedToggleFavorite}
          onTrackRecent={addRecentItem}
          cartCount={cartCount}
          onCartOpen={openCart}
        />
        <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
        <CartDrawer
          isOpen={cartOpen}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onIncrease={increaseCartItem}
          onDecrease={decreaseCartItem}
          onRemove={removeCartItem}
          onBuy={handleBuy}
        />
        <TopButton raised />
      </>
    )
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
          onLoginOpen={() => openAuth('login')}
          onLogout={() => signOut(auth)}
          cartCount={cartCount}
          onCartOpen={openCart}
          onBrandOpen={() => setPage('brand')}
          onPickupOpen={() => setPage('pickup')}
        />
        <Hero />
        <Collection onSelect={setPage} />
        <Shop />
        <Video />
        <Product onPickupOpen={() => setPage('pickup')} />
        <Store onOnlineShopOpen={() => setShopSelectOpen(true)} />
        <AboutBrand onBrandOpen={() => setPage('brand')} />
        <HotSpring />
        <SaleBanner />
        <Character />
        <Footer />
      </div>
      <HamburgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSelectCollection={setPage}
        onLoginOpen={() => openAuth('login')}
        onSignupOpen={() => openAuth('signup')}
        onCartOpen={openCart}
        onMemberOpen={openMemberPanel}
        onBrandOpen={() => setPage('brand')}
        onPickupOpen={() => setPage('pickup')}
      />
      <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
      <ShopSelectModal
        isOpen={shopSelectOpen}
        onClose={() => setShopSelectOpen(false)}
        onSelect={(season) => {
          setShopSelectOpen(false)
          setPage(season)
        }}
      />
      <MemberDrawer
        panel={memberPanel}
        user={user}
        cartCount={cartCount}
        favoriteItems={favoriteItems}
        recentItems={recentItems}
        onClose={() => setMemberPanel(null)}
        onLoginOpen={() => openAuth('login')}
        onCartOpen={() => setCartOpen(true)}
        onAddToCart={addToCart}
        onRemoveFavorite={removeFavorite}
        onClearRecent={clearRecentItems}
        onBuy={handleBuy}
      />
      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onIncrease={increaseCartItem}
        onDecrease={decreaseCartItem}
        onRemove={removeCartItem}
        onBuy={handleBuy}
      />
      <TopButton />
    </div>
  )
}

export default App
