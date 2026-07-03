import './Shop.css'

function Shop() {
  return (
    <section id="shop" className="shop-section">
      <p className="shop-label">추천</p>
      <h2 className="shop-title">
        <img src="/images/icon-grape.png" alt="포도" className="shop-icon" />
        SHOP
        <img src="/images/icon-apple.png" alt="사과" className="shop-icon" />
      </h2>
      <div className="shop-dots">
        <img src="/images/shop-dots.png" alt="" />
      </div>
      <div className="shop-banner">
        <a href="#">
          <img src="/images/shop-banner.png" alt="Shop Banner" />
        </a>
      </div>
      <p className="shop-series">핫 비스킷 에브리데이 시리즈!</p>
    </section>
  )
}

export default Shop
