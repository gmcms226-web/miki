import { useEffect } from 'react'
import './CollectionPage.css'

const imgSet = (id) => [1, 2, 3].map((n) => `/images/${id}-${n}.png`)

const COLLECTIONS = {
  spring: {
    title: 'SPRING COLLECTION',
    items: [
      { id: 'spring-01', name: '남아 봄옷', price: 29000, imgs: imgSet('spring-01'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_rLN50yrILOe17lfXixuYAuFPQTw5R1xj9Brdw3t8u5s/redirect' },
      { id: 'spring-02', name: '여아 봄옷', price: 32000, imgs: imgSet('spring-02'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_UGzTbcDDm65mAILlYfBGolS87wuCiymcE82P41xlxzy/redirect' },
      { id: 'spring-03', name: '신발', price: 39000, imgs: imgSet('spring-03'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_VZUKOBk1UskUI4L8QK58tAnZ6VqOP4Ex1bwm11cVtzk/redirect' },
    ],
  },
  summer: {
    title: 'SUMMER COLLECTION',
    items: [
      { id: 'summer-01', name: '남아 여름옷', price: 27000, imgs: imgSet('summer-01'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_cwsB6WXndLh8qgI6KGbIKzDrZgsMzvaElb8Zc18fwqN/redirect' },
      { id: 'summer-02', name: '여아 여름옷', price: 25000, imgs: imgSet('summer-02'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_qhk3bMA8XT9mASHPLoTNhlA6OkMwSPW1xAasW2gVY0U/redirect' },
      { id: 'summer-03', name: '신발', price: 35000, imgs: imgSet('summer-03'), checkoutUrl: 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_Phtsix5soFYSrPg5VZmskXT4nTyMqiY11xrJp3fI7pt/redirect' },
    ],
  },
}

function CollectionPage({ season, onBack, user }) {
  const { title, items } = COLLECTIONS[season]

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
      <h2 className="collection-page-title">{title}</h2>
      <div className="collection-page-grid">
        {items.map((item) => (
          <div className="collection-page-card" key={item.id}>
            <div className="collection-page-thumb">
              {item.imgs.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${item.name} ${i + 1}`}
                  className="thumb-slide"
                  style={{ animationDelay: `${i * 3}s` }}
                />
              ))}
            </div>
            <h3 className="collection-page-name">{item.name}</h3>
            <p className="collection-page-price">{item.price.toLocaleString()}원</p>
            <button className="collection-page-buy" onClick={() => handleBuy(item)}>
              구매하기
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollectionPage
