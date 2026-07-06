import './HamburgerMenu.css'

function HamburgerMenu({
  isOpen,
  onClose,
  onSelectCollection,
  onLoginOpen,
  onSignupOpen,
  onCartOpen,
  onMemberOpen,
  onBrandOpen,
  onPickupOpen,
  onEverydayOpen,
  onAnchor,
}) {
  // 서브페이지에서는 앵커 대신 홈으로 이동 후 해당 섹션으로 스크롤
  const handleAnchor = (event, hash) => {
    onClose()
    if (onAnchor) {
      event.preventDefault()
      onAnchor(hash)
    }
  }

  const openBrand = () => {
    onClose()
    onBrandOpen()
  }

  const openPickup = () => {
    onClose()
    onPickupOpen()
  }

  const openEveryday = () => {
    onClose()
    onEverydayOpen()
  }

  const openCollection = (season) => {
    onSelectCollection(season)
    onClose()
  }

  const openLogin = () => {
    onClose()
    onLoginOpen()
  }

  const openSignup = () => {
    onClose()
    onSignupOpen()
  }

  const openCart = () => {
    onClose()
    onCartOpen()
  }

  const openMemberPanel = (panel) => {
    onClose()
    onMemberOpen(panel)
  }

  return (
    <>
      <div className={`menu-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
      <nav className={`hamburger-menu${isOpen ? ' open' : ''}`}>

        <div className="hg-top-strip">
          <button className="hg-close" onClick={onClose}>✕</button>
        </div>

        <div className="hg-logo-wrap">
          <img src="/images/logo.png" alt="HOT BISCUITS MIKIHOUSE" className="hg-logo" />
        </div>

        <div className="hg-bump-wrap">
          <img src="/images/hg-bump.PNG" alt="" className="hg-bump" />
          <div className="hg-bump-content">
            <div className="hg-login-bar">
              <button type="button" onClick={openLogin}>로그인</button>
              <span className="hg-divider">|</span>
              <button type="button" onClick={openSignup}>회원가입</button>
            </div>
            <div className="hg-my-bar">
              <button type="button" onClick={() => openMemberPanel('mypage')}>마이페이지</button>
              <button type="button" onClick={openCart}>장바구니</button>
              <button type="button" onClick={() => openMemberPanel('favorites')}>관심상품</button>
              <button type="button" onClick={() => openMemberPanel('recent')}>최근본상품</button>
            </div>
          </div>
        </div>

        <ul className="hg-nav-main">
          <li>
            <button type="button" onClick={() => openCollection('summer')}>
              Summer Collection
            </button>
          </li>
          <li>
            <button type="button" onClick={() => openCollection('spring')}>
              Spring Collection
            </button>
          </li>
          <li>
            <button type="button" onClick={openBrand}>브랜드 정보</button>
          </li>
          <li>
            <button type="button" onClick={openPickup}>아기 속옷</button>
          </li>
          <li>
            <button type="button" onClick={openEveryday}>에브리데이 시리즈</button>
          </li>
        </ul>

        <ul className="hg-nav-bottom">
          <li><a href="#store" onClick={(event) => handleAnchor(event, '#store')}>매장</a></li>
          <li><a href="#faq" onClick={(event) => handleAnchor(event, '#faq')}>자주묻는 질문</a></li>
          <li><a href="#contact" onClick={(event) => handleAnchor(event, '#contact')}>문의</a></li>
        </ul>

        <div className="hg-bottom-strip">
          <a href="#" onClick={onClose}>공지사항</a>
          <span className="hg-divider">|</span>
          <a href="#" onClick={onClose}>Q&amp;A</a>
          <span className="hg-divider">|</span>
          <a href="#" onClick={onClose}>이벤트</a>
        </div>

      </nav>
    </>
  )
}

export default HamburgerMenu
