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
import EverydayPage from './components/EverydayPage/EverydayPage'
import ShopSelectModal from './components/ShopSelectModal/ShopSelectModal'
import TopButton from './components/TopButton/TopButton'
import './App.css'

const CART_STORAGE_KEY = 'miki-cart-items'

// 저장된 장바구니 복원 (손상된 데이터면 빈 배열)
const loadStoredCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home') // 'home' | 'spring' | 'summer' | 'brand' | 'pickup' | 'everyday'
  const [authOpen, setAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [cartOpen, setCartOpen] = useState(false)
  const [shopSelectOpen, setShopSelectOpen] = useState(false)
  const [pendingHash, setPendingHash] = useState(null)
  const [memberPanel, setMemberPanel] = useState(null)
  const [cartItems, setCartItems] = useState(loadStoredCart)
  const [favoriteItems, setFavoriteItems] = useState([])
  const [recentItems, setRecentItems] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return unsubscribe
  }, [])

  // 장바구니를 localStorage에 보존 — 새로고침/결제 리다이렉트 복귀 후에도 유지
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  // Polar 결제 성공 후 Success URL로 돌아왔을 때 안내
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      window.history.replaceState(null, '', window.location.pathname)
      alert('결제가 완료되었습니다! 🎉')
    }
  }, [])

  // 서브페이지에서 앵커 클릭 → 홈 렌더 후 해당 섹션으로 스크롤
  useEffect(() => {
    if (page === 'home' && pendingHash) {
      document.querySelector(pendingHash)?.scrollIntoView()
      setPendingHash(null)
    }
  }, [page, pendingHash])

  const goHomeWithAnchor = (hash) => {
    setPage('home')
    setPendingHash(hash)
  }

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

  // 이름 변경 후 호출 — updateProfile은 같은 User 객체를 제자리에서 바꾸므로
  // 새 객체로 교체해야 헤더 등이 리렌더된다
  const refreshUser = () => {
    setUser(auth.currentUser ? { ...auth.currentUser } : null)
  }

  // 로그아웃 시 장바구니·관심·최근 본 상품 초기화 — 다음 사용자에게 이전 계정의 데이터가 남지 않도록
  const handleLogout = () => {
    setCartItems([])
    setFavoriteItems([])
    setRecentItems([])
    setCartOpen(false)
    setMemberPanel(null)
    signOut(auth)
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

  if (page === 'pickup' || page === 'everyday') {
    return (
      <>
        <div className="subpage-shell">
          <Header
            onMenuOpen={() => setMenuOpen(true)}
            user={user}
            onLoginOpen={() => openAuth('login')}
            onLogout={handleLogout}
            cartCount={cartCount}
            onCartOpen={openCart}
            onBrandOpen={() => setPage('brand')}
            onPickupOpen={() => setPage('pickup')}
            onAnchor={goHomeWithAnchor}
            onHome={() => setPage('home')}
          />
          {page === 'pickup' ? (
            <PickupPage
              onBack={() => setPage('home')}
              onAddToCart={guardedAddToCart}
              onBuy={handleBuy}
              favoriteItems={favoriteItems}
              onToggleFavorite={guardedToggleFavorite}
            />
          ) : (
            <EverydayPage
              onBack={() => setPage('home')}
              onSelectCollection={setPage}
              onAddToCart={guardedAddToCart}
              onBuy={handleBuy}
            />
          )}
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
          onEverydayOpen={() => setPage('everyday')}
          onAnchor={goHomeWithAnchor}
        />
        <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
        <MemberDrawer
          panel={memberPanel}
          user={user}
          onProfileUpdated={refreshUser}
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
      </>
    )
  }

  if (page !== 'home') {
    return (
      <>
        <div className="subpage-shell">
          <Header
            onMenuOpen={() => setMenuOpen(true)}
            user={user}
            onLoginOpen={() => openAuth('login')}
            onLogout={handleLogout}
            cartCount={cartCount}
            onCartOpen={openCart}
            onBrandOpen={() => setPage('brand')}
            onPickupOpen={() => setPage('pickup')}
            onAnchor={goHomeWithAnchor}
            onHome={() => setPage('home')}
          />
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
          onEverydayOpen={() => setPage('everyday')}
          onAnchor={goHomeWithAnchor}
        />
        <AuthModal isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
        <MemberDrawer
          panel={memberPanel}
          user={user}
          onProfileUpdated={refreshUser}
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
          onLogout={handleLogout}
          cartCount={cartCount}
          onCartOpen={openCart}
          onBrandOpen={() => setPage('brand')}
          onPickupOpen={() => setPage('pickup')}
        />
        <Hero />
        <Collection onSelect={setPage} />
        <Shop onEverydayOpen={() => setPage('everyday')} />
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
        onEverydayOpen={() => setPage('everyday')}
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
        onProfileUpdated={refreshUser}
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
