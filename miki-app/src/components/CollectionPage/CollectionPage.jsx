import { useEffect } from 'react'
import { COLLECTIONS } from '../../data/collections'
import './CollectionPage.css'

function CollectionPage({
  season,
  onBack,
  user,
  onAddToCart,
  favoriteItems,
  onToggleFavorite,
  onTrackRecent,
  cartCount,
  onCartOpen,
}) {
  const { title, year, heroImage, intro, looks } = COLLECTIONS[season]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [season])

  const getItemContext = (look) => ({
    season,
    seasonLabel: title.replace(' COLLECTION', ''),
    lookNumber: look.number,
    lookTitle: look.title,
  })

  const handleBuy = (item, look) => {
    onTrackRecent({ ...item, ...getItemContext(look) })
    if (!item.checkoutUrl) {
      alert('결제 준비 중입니다.')
      return
    }
    // 로그인한 사용자의 이메일을 결제창에 미리 채워서 이메일 입력 단계 생략
    const url = user?.email
      ? `${item.checkoutUrl}?customer_email=${encodeURIComponent(user.email)}`
      : item.checkoutUrl
    window.location.href = url
  }

  return (
    <div className="collection-page">
      <button className="collection-page-back" onClick={onBack}>
        ← 돌아가기
      </button>
      <button className="collection-cart-float" onClick={onCartOpen} aria-label="장바구니 열기">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        {cartCount > 0 && <span>{cartCount}</span>}
      </button>
      <section className="collection-hero">
        <img src={heroImage} alt={title} className="collection-hero-img" />
        <p className="collection-page-year">{year}</p>
        <h2 className="collection-page-title">{title}</h2>
        <p className="collection-page-intro">{intro}</p>
      </section>

      <nav className="look-index" aria-label={`${title} LOOK INDEX`}>
        <p className="look-index-label">INDEX</p>
        <div className="look-index-list">
          {looks.map((look) => (
            <a href={`#${look.id}`} className="look-index-item" key={look.id}>
              {look.menuImage && <img src={look.menuImage} alt="" className="look-index-img" />}
              <span>LOOK {look.number}</span>
            </a>
          ))}
        </div>
      </nav>

      {looks.map((look, lookIndex) => (
        <section className={`look-section${lookIndex % 2 === 1 ? ' reverse' : ''}`} id={look.id} key={look.id}>
          <div className="look-heading">
            <span className="look-number">LOOK {look.number}</span>
            <h3 className="look-title">{look.title}</h3>
          </div>
          <div className="look-visual">
            <img src={look.images[0]} alt={`${look.title} 메인 착장`} className="look-main-img" />
            <div className="look-sub-images">
              {look.images.slice(1).map((src, index) => (
                <img src={src} alt={`${look.title} 상세 ${index + 1}`} key={src} />
              ))}
            </div>
          </div>
          <p className="look-model">{look.model}</p>
          {look.products.length > 0 && (
            <div className="look-products">
              {look.products.map((item) => (
                <div className="look-product" key={item.id}>
                  <span className="look-product-name">{item.name}</span>
                  <span className="look-product-price">{item.price.toLocaleString()}원</span>
                  <button
                    className={`look-product-favorite${favoriteItems.some((favorite) => favorite.id === item.id) ? ' active' : ''}`}
                    onClick={() => onToggleFavorite(item, getItemContext(look))}
                  >
                    관심
                  </button>
                  <button
                    className="look-product-cart"
                    onClick={() => onAddToCart(item, getItemContext(look))}
                  >
                    담기
                  </button>
                  <button className="look-product-buy" onClick={() => handleBuy(item, look)}>
                    BUY
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export default CollectionPage
