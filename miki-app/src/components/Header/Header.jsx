import './Header.css'

const navItems = [
  { label: '컬렉션', href: '#collection' },
  { label: '브랜드정보', action: 'brand' },
  { label: '픽업', action: 'pickup' },
  { label: '매장', href: '#store' },
  { label: '자주묻는질문', action: 'faq' },
  { label: '문의', action: 'contact' },
]

function Header({ onMenuOpen, user, onLoginOpen, onLogout, cartCount, onCartOpen, onBrandOpen, onPickupOpen, onAnchor, onHome }) {
  const navActions = {
    brand: onBrandOpen,
    pickup: onPickupOpen,
    faq: () => alert('서비스 준비중입니다.'),
    contact: () => alert('점검중입니다.'),
  }

  // 서브페이지에서는 앵커 대신 홈으로 이동 후 해당 섹션으로 스크롤
  const handleAnchorClick = (event, href) => {
    if (onAnchor) {
      event.preventDefault()
      onAnchor(href)
    }
  }

  const handleLogoClick = (event) => {
    if (onHome) {
      event.preventDefault()
      onHome()
    }
  }

  return (
    <header className="main-header">
      <div className="header-top">
        <a href="#" className="header-logo" onClick={handleLogoClick}>
          <img src="/images/logo.png" alt="HOT BISCUITS MIKIHOUSE" />
        </a>
        <div className="header-actions">
          {user ? (
            <div className="auth-status">
              <span className="auth-email">{user.displayName ? `${user.displayName}님` : user.email}</span>
              <button className="auth-action-btn" onClick={onLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <button className="auth-action-btn" onClick={onLoginOpen}>
              로그인
            </button>
          )}
          <button className="cart-btn" onClick={onCartOpen} aria-label="장바구니">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="hamburger-flower" onClick={onMenuOpen} aria-label="메뉴 열기">
            <svg width="38" height="38" viewBox="0 0 48 48" aria-hidden="true">
              <g fill="#005CA3">
                <circle cx="36" cy="24" r="8" />
                <circle cx="32.5" cy="32.5" r="8" />
                <circle cx="24" cy="36" r="8" />
                <circle cx="15.5" cy="32.5" r="8" />
                <circle cx="12" cy="24" r="8" />
                <circle cx="15.5" cy="15.5" r="8" />
                <circle cx="24" cy="12" r="8" />
                <circle cx="32.5" cy="15.5" r="8" />
                <circle cx="24" cy="24" r="12" />
              </g>
              <g stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
                <line x1="17" y1="19" x2="31" y2="19" />
                <line x1="17" y1="24" x2="31" y2="24" />
                <line x1="17" y1="29" x2="31" y2="29" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      <nav className="header-nav">
        {navItems.map(item => (
          item.action ? (
            <button key={item.label} type="button" className="nav-item" onClick={navActions[item.action]}>
              {item.label}
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className="nav-item"
              onClick={(event) => handleAnchorClick(event, item.href)}
            >
              {item.label}
            </a>
          )
        ))}
      </nav>
    </header>
  )
}

export default Header
