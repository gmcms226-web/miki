import './HamburgerMenu.css'

function HamburgerMenu({ isOpen, onClose }) {
  return (
    <>
      <div className={`menu-overlay${isOpen ? ' open' : ''}`} onClick={onClose} />
      <nav className={`hamburger-menu${isOpen ? ' open' : ''}`}>

        <div className="hg-top-strip">
          <button className="hg-close" onClick={onClose}>✕</button>
        </div>

        <div className="hg-logo-wrap">
          <img src="/src/assets/images/logo.png" alt="HOT BISCUITS MIKIHOUSE" className="hg-logo" />
        </div>

        <div className="hg-bump-wrap">
          <img src="/src/assets/images/hg-bump.png" alt="" className="hg-bump" />
          <div className="hg-bump-content">
            <div className="hg-login-bar">
              <a href="#" onClick={onClose}>로그인</a>
              <span className="hg-divider">|</span>
              <a href="#" onClick={onClose}>회원가입</a>
            </div>
            <div className="hg-my-bar">
              <a href="#" onClick={onClose}>마이페이지</a>
              <a href="#" onClick={onClose}>장바구니</a>
              <a href="#" onClick={onClose}>관심상품(0)</a>
              <a href="#" onClick={onClose}>최근본상품(0)</a>
            </div>
          </div>
        </div>

        <ul className="hg-nav-main">
          <li><a href="#collection" onClick={onClose}>Summer Collection</a></li>
          <li><a href="#collection" onClick={onClose}>Spring Collection</a></li>
          <li><a href="#about-brand" onClick={onClose}>브랜드 정보</a></li>
          <li><a href="#pickup" onClick={onClose}>픽업</a></li>
          <li><a href="#product" onClick={onClose}>아기 속옷</a></li>
          <li><a href="#shop" onClick={onClose}>에브리데이 시리즈</a></li>
        </ul>

        <ul className="hg-nav-bottom">
          <li><a href="#store" onClick={onClose}>매장</a></li>
          <li><a href="#faq" onClick={onClose}>자주묻는 질문</a></li>
          <li><a href="#contact" onClick={onClose}>문의</a></li>
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
