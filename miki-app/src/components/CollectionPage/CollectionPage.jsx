import { useEffect } from 'react'
import { COLLECTIONS } from '../../data/collections'
import './CollectionPage.css'

function CollectionPage({ season, onBack, user }) {
  const { title, year, heroImage, intro, looks } = COLLECTIONS[season]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [season])

  const handleBuy = (item) => {
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

      {looks.map((look) => (
        <section className="look-section" id={look.id} key={look.id}>
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
                  <button className="look-product-buy" onClick={() => handleBuy(item)}>
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
