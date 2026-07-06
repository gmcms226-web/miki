import { useEffect, useState } from 'react'
import { PICKUP_PRODUCTS } from '../../data/collections'
import './PickupPage.css'

const babyAsset = (name) => `/images/babyclothe/${name}`

const COMFORT_POINTS = [
  {
    number: '1',
    title: '부드러운 촉감',
    desc: '아기 피부에 닿는 순간부터 다른, 폭신하고 부드러운 감촉의 원단을 사용합니다.',
  },
  {
    number: '2',
    title: '뛰어난 땀 흡수',
    desc: '땀이 많은 아기를 위해 흡수성이 좋은 소재로 언제나 보송보송하게 유지해 줍니다.',
  },
  {
    number: '3',
    title: '움직임을 방해하지 않는 신축성',
    desc: '몸에 딱 붙지 않고 부드럽게 늘어나서, 팔다리를 마음껏 움직일 수 있습니다.',
  },
  {
    number: '4',
    title: '봉제선은 바깥쪽으로',
    desc: '봉제선과 태그가 피부에 닿지 않도록 바깥쪽에 배치해 자극을 줄였습니다.',
  },
]

const SAFETY_POINTS = [
  {
    number: '5',
    title: '안심·안전의 일본제',
    desc: '일본산 면 100%를 사용해 일본 공장에서 하나하나 정성껏 만듭니다.',
  },
  {
    number: '6',
    title: '반복 세탁에도 튼튼하게',
    desc: '매일 빨아도 형태가 무너지지 않도록 원단과 봉제를 꼼꼼하게 마감했습니다.',
  },
  {
    number: '7',
    title: '깊은 여밈으로 배를 따뜻하게',
    desc: '여밈을 깊게 만들어 흘러내리거나 벌어지지 않고, 배를 항상 감싸줍니다.',
  },
  {
    number: '8',
    title: '신생아도 입히기 쉽게',
    desc: '잘 늘어나는 원단이라 아직 목을 가누지 못하는 신생아에게도 쉽게 입힐 수 있습니다.',
  },
]

const QNA = [
  {
    question: '속옷 고르기가 왜 중요한가요?',
    answer:
      '아기는 하루 종일 속옷을 입고 지내고, 피부가 어른보다 훨씬 얇고 예민합니다. 피부에 직접 닿는 첫 옷인 만큼, 소재와 봉제가 좋은 속옷을 고르는 것이 아기의 쾌적함을 좌우합니다.',
  },
  {
    question: '처음에는 몇 cm를 사면 되나요?',
    answer:
      '신생아라면 50cm를 추천합니다. 갓 태어난 아기의 평균 신장에 맞춘 사이즈로, 여밈 방식이라 몸에 맞게 조절하며 입힐 수 있습니다.',
  },
  {
    question: '몇 장 정도 준비해야 하나요?',
    answer:
      '숏 속옷과 콤비 속옷을 각각 5~6장씩 준비하는 것을 추천합니다. 아기는 땀을 많이 흘리고 하루에도 여러 번 갈아입기 때문에, 넉넉하게 준비해두면 안심입니다.',
  },
  {
    question: '사용하기 전에 세탁해야 하나요?',
    answer:
      '네, 입히기 전에 한 번 물세탁을 해주세요. 새 옷의 풀기가 빠지면서 원단이 한층 부드러워지고, 흡수성도 좋아집니다.',
  },
]

const VOICES = [
  {
    image: 'imgi_15_img_mama01.png',
    text: '갈아입힐 때마다 기분이 좋아 보여요. 아기가 편해서인지 몸도 훨씬 잘 움직여요.',
  },
  {
    image: 'imgi_16_img_mama02.png',
    text: '원단이 정말 부드러워요. 몇 번을 빨아도 촉감이 그대로라서 계속 쓰게 됩니다.',
  },
  {
    image: 'imgi_17_img_mama03.png',
    text: '무늬가 너무 귀여워요. 속옷인데도 보일 때마다 기분이 좋아지는 디자인이에요.',
  },
  {
    image: 'imgi_18_img_mama04.png',
    text: '여밈이 깊어서 입히기 쉽고 잘 벗겨지지 않아요. 선물로도 여러 번 샀습니다.',
  },
]

const LINEUP = [
  { id: 'item01', name: '무지 후라이스', desc: '어떤 옷에도 잘 어울리는 기본 무지 타입이에요.', shortImg: 'imgi_20_item01a.jpg', combiImg: 'imgi_21_item01b.jpg', productId: 'baby-01' },
  { id: 'item02', name: '캐릭터 프린트 A', desc: '핫비 친구들이 콕콕 박힌 귀여운 프린트예요.', shortImg: 'imgi_22_item02a.jpg', combiImg: 'imgi_23_item02b.jpg', productId: 'baby-02' },
  { id: 'item03', name: '캐릭터 프린트 B', desc: '알록달록 무늬로 갈아입힐 때마다 즐거워요.', shortImg: 'imgi_24_item03a.jpg', combiImg: 'imgi_25_item03b.jpg', productId: 'baby-03' },
  { id: 'item04', name: '캐릭터 프린트 C', desc: '은은한 톤의 프린트로 어디에나 무난해요.', shortImg: 'imgi_26_item04a.jpg', combiImg: 'imgi_27_item04b.jpg', productId: 'baby-04' },
  { id: 'item05', name: '잔꽃 무늬', desc: '은은한 잔꽃 무늬로 사랑스러운 분위기예요.', shortImg: 'imgi_28_item05a.jpg', combiImg: 'imgi_29_item05b.jpg', productId: 'baby-05' },
  { id: 'item06', name: '자동차 무늬', desc: '아이들이 좋아하는 자동차가 가득해요.', shortImg: 'imgi_30_item06a.jpg', combiImg: 'imgi_31_item06b.jpg', productId: 'baby-06' },
  { id: 'item07', name: '동물 무늬', desc: '포근한 동물 친구들과 함께하는 하루예요.', shortImg: 'imgi_32_item07a.jpg', combiImg: 'imgi_33_item07b.jpg', productId: 'baby-07' },
  { id: 'item08', name: '컬러 후라이스', desc: '부드러운 컬러로 물들인 데일리 타입이에요.', shortImg: '/images/baby/color_01.jpg', combiImg: '/images/baby/color_02.jpg', productId: 'baby-08' },
]

// babyclothe/ 폴더 파일명 또는 절대 경로 둘 다 허용
const resolveBabyImg = (img) => (img.startsWith('/') ? img : babyAsset(img))

const productById = Object.fromEntries(PICKUP_PRODUCTS.map((product) => [product.id, product]))

const FEATURES = [
  {
    number: '01',
    image: 'imgi_46_no1_img.png',
    title: '평면 봉제',
    desc: '봉제 부분을 평평하게 마감해서, 누워 있어도 등에 배기지 않습니다.',
  },
  {
    number: '02',
    image: 'imgi_50_no2_img.png',
    title: '끈 끝 보강',
    desc: '여밈 끈의 끝부분까지 꼼꼼하게 박음질해 풀리거나 해지지 않습니다.',
  },
  {
    number: '03',
    image: 'imgi_53_no3_img.png',
    title: '옆면 무봉제',
    desc: '옆면을 한 장의 원단으로 만들어 봉제선 없이 부드럽게 늘어납니다.',
  },
  {
    number: '04',
    image: 'imgi_56_no4_img.png',
    title: '태그도 바깥쪽에',
    desc: '태그와 봉제선을 모두 바깥쪽에 배치해 피부에 닿는 자극을 없앴습니다.',
  },
]

function PickupPage({ onBack, onAddToCart, onBuy, favoriteItems = [], onToggleFavorite }) {
  const [openQna, setOpenQna] = useState(null)
  const [cardImageIndex, setCardImageIndex] = useState({}) // 카드별 현재 이미지 (0=숏, 1=콤비)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const toggleQna = (index) => {
    setOpenQna((prev) => (prev === index ? null : index))
  }

  const setCardImage = (id, imageIndex) => {
    setCardImageIndex((prev) => ({ ...prev, [id]: imageIndex }))
  }

  // 장바구니/최근 본 상품에 표시될 컨텍스트
  const itemContext = (index) => ({
    season: 'pickup',
    seasonLabel: 'BABY',
    lookNumber: String(index + 1).padStart(2, '0'),
    lookTitle: 'BABY UNDERWEAR',
  })

  return (
    <div className="pickup-page">
      <button className="pickup-page-back" onClick={onBack}>
        ← 돌아가기
      </button>

      <div className="pickup-header">
        <p className="pickup-subtitle">추천</p>
        <h2 className="pickup-title">PICK UP</h2>
        <img src="/images/about-dots.png" alt="" className="pickup-dots" />
      </div>

      <section className="pickup-hero">
        <h3 className="pickup-hero-headline">
          아기에게 가장 좋은 속옷을
          <br />
          입혀주고 싶다.
        </h3>
        <p className="pickup-hero-text">
          핫 비스킷의 아기 속옷은 실 한 올, 원단 한 장, 바느질 하나까지
          아기의 착용감을 최우선으로 만들었습니다.
        </p>
        <img
          src={babyAsset('imgi_67_hadagi.png')}
          alt="아기 속옷의 4가지 기분 좋은 포인트 위치"
          className="pickup-hero-img"
        />
      </section>

      <section className="pickup-points">
        <h3 className="pickup-section-title pink">기분 좋은 포인트</h3>
        <div className="pickup-point-list">
          {COMFORT_POINTS.map((point) => (
            <div className="pickup-point" key={point.number}>
              <span className="pickup-point-number pink">{point.number}</span>
              <div>
                <h4 className="pickup-point-title">{point.title}</h4>
                <p className="pickup-point-desc">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pickup-points">
        <h3 className="pickup-section-title blue">안심 포인트</h3>
        <div className="pickup-point-list">
          {SAFETY_POINTS.map((point) => (
            <div className="pickup-point" key={point.number}>
              <span className="pickup-point-number blue">{point.number}</span>
              <div>
                <h4 className="pickup-point-title">{point.title}</h4>
                <p className="pickup-point-desc">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pickup-lineup">
        <h3 className="pickup-section-title pink">상품 라인업</h3>
        <p className="pickup-lineup-note">모든 무늬는 숏 속옷과 콤비 속옷 두 가지로 준비되어 있습니다.</p>
        <div className="pickup-lineup-grid">
          {LINEUP.map((item, index) => {
            const product = productById[item.productId]
            const isFavorite = product && favoriteItems.some((favorite) => favorite.id === product.id)
            const images = [item.shortImg, item.combiImg]
            const currentImage = cardImageIndex[item.id] ?? 0
            const nextImage = (currentImage + 1) % images.length
            return (
              <div className="pickup-lineup-item" key={item.id}>
                <div className="pickup-card-media">
                  <img
                    src={resolveBabyImg(images[currentImage])}
                    alt={`${item.name} ${currentImage === 0 ? '숏' : '콤비'} 속옷`}
                    className="pickup-card-photo"
                  />
                  <button
                    type="button"
                    className="pickup-card-nav prev"
                    onClick={() => setCardImage(item.id, nextImage)}
                    aria-label="이전 이미지"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="pickup-card-nav next"
                    onClick={() => setCardImage(item.id, nextImage)}
                    aria-label="다음 이미지"
                  >
                    ›
                  </button>
                  <div className="pickup-card-dots">
                    {images.map((image, imageIndex) => (
                      <button
                        type="button"
                        key={image}
                        className={imageIndex === currentImage ? 'on' : ''}
                        onClick={() => setCardImage(item.id, imageIndex)}
                        aria-label={`${imageIndex + 1}번째 이미지 보기`}
                      />
                    ))}
                  </div>
                  {product && onToggleFavorite && (
                    <button
                      className={`pickup-card-fav${isFavorite ? ' active' : ''}`}
                      onClick={() => onToggleFavorite(product, itemContext(index))}
                      aria-label={`${item.name} 관심상품 ${isFavorite ? '해제' : '등록'}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="pickup-card-body">
                  <h4 className="pickup-card-name">{item.name}</h4>
                  <div className="pickup-card-tags">
                    <span>숏 속옷</span>
                    <span>콤비 속옷</span>
                  </div>
                  <p className="pickup-card-desc">{item.desc}</p>
                  {product && (
                    <div className="pickup-card-footer">
                      <div className="pickup-card-price">
                        <span>PRICE</span>
                        <strong>{product.price.toLocaleString()}원</strong>
                      </div>
                      <div className="pickup-card-buttons">
                        <button className="pickup-shop-add" onClick={() => onAddToCart(product, itemContext(index))}>
                          담기
                        </button>
                        <button className="pickup-shop-buy" onClick={() => onBuy(product)}>
                          BUY
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="pickup-voice">
        <h3 className="pickup-section-title pink">엄마들의 목소리</h3>
        <div className="pickup-voice-list">
          {VOICES.map((voice) => (
            <div className="pickup-voice-item" key={voice.image}>
              <img src={babyAsset(voice.image)} alt="엄마 일러스트" className="pickup-voice-img" />
              <p className="pickup-voice-text">{voice.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pickup-qna">
        <h3 className="pickup-section-title pink">궁금해요 Q&amp;A</h3>
        <div className="pickup-qna-list">
          {QNA.map((qna, index) => (
            <div className={`pickup-qna-item${openQna === index ? ' open' : ''}`} key={qna.question}>
              <button className="pickup-qna-question" onClick={() => toggleQna(index)}>
                <span className="pickup-qna-mark">Q</span>
                {qna.question}
                <span className="pickup-qna-arrow">{openQna === index ? '−' : '+'}</span>
              </button>
              {openQna === index && (
                <p className="pickup-qna-answer">
                  <span className="pickup-qna-mark answer">A</span>
                  {qna.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="pickup-features">
        <h3 className="pickup-section-title blue">핫 비스킷 속옷의 특징</h3>
        <div className="pickup-feature-list">
          {FEATURES.map((feature) => (
            <div className="pickup-feature" key={feature.number}>
              <img src={babyAsset(feature.image)} alt={feature.title} className="pickup-feature-img" />
              <div className="pickup-feature-body">
                <span className="pickup-feature-number">{feature.number}</span>
                <h4 className="pickup-feature-title">{feature.title}</h4>
                <p className="pickup-feature-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default PickupPage
