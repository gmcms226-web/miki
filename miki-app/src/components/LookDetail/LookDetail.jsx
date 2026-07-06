import { useEffect } from 'react'
import './LookDetail.css'

function LookDetail({
  look,
  year,
  collectionTitle,
  favoriteItems,
  onToggleFavorite,
  onAddToCart,
  onBuy,
  onBack,
  cartCount,
  onCartOpen,
}) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [look.id])

  return (
    <div className="look-detail">
      <button className="look-detail-back" onClick={onBack}>
        ← LOOK INDEX
      </button>
      <button className="look-detail-cart" onClick={onCartOpen} aria-label="장바구니 열기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>

      <p className="look-detail-collection">{year} {collectionTitle}</p>
      <div className="look-detail-heading">
        <span className="look-detail-number">LOOK {look.number}</span>
        <h2 className="look-detail-title">{look.title}</h2>
      </div>

      <div className="look-detail-visual">
        <img src={look.images[0]} alt={`${look.title} 메인 착장`} className="look-detail-main-img" />
        <div className="look-detail-sub-images">
          {look.images.slice(1).map((src, index) => (
            <img src={src} alt={`${look.title} 상세 ${index + 1}`} key={src} />
          ))}
        </div>
      </div>
      <p className="look-detail-model">{look.model}</p>

      {look.products.length > 0 && (
        <div className="look-detail-products">
          {look.products.map((item) => (
            <div className="look-detail-product" key={item.id}>
              <span className="look-detail-product-name">{item.name}</span>
              <span className="look-detail-product-price">{item.price.toLocaleString()}원</span>
              <button
                className={`look-detail-favorite${favoriteItems.some((favorite) => favorite.id === item.id) ? ' active' : ''}`}
                onClick={() => onToggleFavorite(item)}
                aria-label={`${item.name} 관심상품 ${favoriteItems.some((favorite) => favorite.id === item.id) ? '해제' : '등록'}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={favoriteItems.some((favorite) => favorite.id === item.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
              <button className="look-detail-add-cart" onClick={() => onAddToCart(item)}>
                담기
              </button>
              <button className="look-detail-buy" onClick={() => onBuy(item)}>
                BUY
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LookDetail
