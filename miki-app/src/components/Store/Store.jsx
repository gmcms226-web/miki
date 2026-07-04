import './Store.css'

function Store({ onOnlineShopOpen }) {
  return (
    <section id="store" className="store-section">
      <p className="store-label">매장</p>
      <h2 className="store-title">
        <img src="/images/icon-donut.png" alt="도넛" className="store-icon" />
        SHOP
        <img src="/images/icon-biscuit.png" alt="비스켓" className="store-icon" />
      </h2>
      <a href="#" className="store-img-link">
        <img src="/images/store-image.jpg" alt="매장" className="store-img" />
      </a>
      <p className="store-desc">
        장난감 상자를 뒤집은 것 같은 활기찬 가게에서 고객을 기다리고 있습니다.
      </p>
      <div className="store-buttons">
        <button
          className="store-btn-more"
          onClick={() => window.open('https://www.hotbiscuits.jp/shop/', '_blank', 'noopener')}
        >
          추천 더보기
        </button>
        <button className="store-btn-online" onClick={onOnlineShopOpen}>
          <img src="/images/shop.png" alt="" className="store-btn-icon" />
          ONLINE SHOP
        </button>
      </div>
    </section>
  )
}

export default Store
