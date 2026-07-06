import { useEffect } from 'react'
import { getCollectionProducts } from '../../data/collections'
import './EverydayPage.css'

const POINTS = [
  { number: '1', color: 'pink', title: '데일리 소재', desc: '매일 입어도 부담 없는 부드러운 원단만 골라 씁니다.' },
  { number: '2', color: 'blue', title: '세탁 내구성', desc: '매일 세탁해도 형태가 무너지지 않는 꼼꼼한 봉제.' },
  { number: '3', color: 'orange', title: '부담 없는 가격', desc: '데일리로 여러 벌 장만하기 좋은 실속 구성.' },
]

const TIMELINE = [
  { time: '아침', desc: '보들보들 티셔츠로 기분 좋게 기상' },
  { time: '등원', desc: '활동하기 편한 팬츠로 씩씩하게' },
  { time: '놀이터', desc: '마음껏 뛰어놀아도 튼튼하게' },
  { time: '저녁', desc: '목욕 후엔 포근한 속옷으로 마무리' },
]

function EverydayPage({ onBack, onSelectCollection, onAddToCart, onBuy }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // 기존 컬렉션 상품 중 봄 2개 + 여름 2개를 베스트로 노출
  const allProducts = getCollectionProducts()
  const bestItems = [
    ...allProducts.filter((item) => item.season === 'spring').slice(0, 2),
    ...allProducts.filter((item) => item.season === 'summer').slice(0, 2),
  ]

  const itemContext = (item) => ({
    season: item.season,
    seasonLabel: item.seasonLabel,
    lookNumber: item.lookNumber,
    lookTitle: item.lookTitle,
  })

  return (
    <div className="everyday-page">
      <button className="everyday-back" onClick={onBack}>
        ← 돌아가기
      </button>

      <section className="everyday-hero">
        <p className="everyday-label">HOT BISCUITS EVERYDAY</p>
        <h2 className="everyday-title">핫 비스킷 에브리데이 시리즈</h2>
        <p className="everyday-intro">
          매일 입는 옷이니까, 매일 편해야 하니까.
          <br />
          아이의 하루를 함께하는 데일리 웨어 라인입니다.
        </p>
        <img src="/images/shop-banner.png" alt="핫 비스킷 에브리데이 시리즈" className="everyday-hero-img" />
      </section>

      <section className="everyday-points">
        {POINTS.map((point) => (
          <div className="everyday-point" key={point.number}>
            <span className={`everyday-point-number ${point.color}`}>{point.number}</span>
            <h3 className="everyday-point-title">{point.title}</h3>
            <p className="everyday-point-desc">{point.desc}</p>
          </div>
        ))}
      </section>

      <section className="everyday-timeline">
        <h3 className="everyday-section-title">에브리데이와 함께하는 하루</h3>
        <div className="everyday-timeline-track">
          {TIMELINE.map((step) => (
            <div className="everyday-step" key={step.time}>
              <span className="everyday-step-time">{step.time}</span>
              <p className="everyday-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="everyday-best">
        <h3 className="everyday-section-title">에브리데이 베스트 4</h3>
        <div className="everyday-best-list">
          {bestItems.map((item) => (
            <div className="everyday-best-item" key={item.id}>
              <span className="everyday-best-season">{item.seasonLabel} · LOOK {item.lookNumber}</span>
              <strong className="everyday-best-name">{item.name}</strong>
              <span className="everyday-best-price">{item.price.toLocaleString()}원</span>
              <div className="everyday-best-actions">
                <button className="everyday-add" onClick={() => onAddToCart(item, itemContext(item))}>
                  담기
                </button>
                <button className="everyday-buy" onClick={() => onBuy(item)}>
                  BUY
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="everyday-cta">
        <p className="everyday-cta-text">더 많은 아이템이 궁금하다면?</p>
        <div className="everyday-cta-buttons">
          <button onClick={() => onSelectCollection('spring')}>봄 컬렉션 보러가기</button>
          <button onClick={() => onSelectCollection('summer')}>여름 컬렉션 보러가기</button>
        </div>
      </section>
    </div>
  )
}

export default EverydayPage
