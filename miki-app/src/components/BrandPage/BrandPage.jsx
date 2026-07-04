import { useEffect } from 'react'
import './BrandPage.css'

const BRAND_VALUES = [
  {
    id: 'touch',
    circle: 'circle-pink',
    sprite: 'sprite-clothes',
    label: '의류',
    title: '편안한 촉감',
    desc: [
      '아이 피부에 닿는 첫 감촉을 가장 중요하게 생각합니다.',
      '부드러운 면 소재를 중심으로, 세탁을 반복해도 처음의 촉감이',
      '오래가는 원단만을 골라 사용합니다. 태그 위치나 봉제선 하나까지,',
      '아이가 하루 종일 입어도 신경 쓰이지 않도록 설계합니다.',
    ],
  },
  {
    id: 'function',
    circle: 'circle-green',
    sprite: 'sprite-shoes',
    label: '신발',
    title: '기능성 추구',
    desc: [
      '매일 쑥쑥 자라는 아이의 몸에 맞춰,',
      '움직임을 방해하지 않는 패턴을 연구합니다.',
      '혼자서도 쉽게 입고 벗을 수 있는 넉넉한 목둘레와 스냅 버튼,',
      '활동량 많은 아이를 위한 튼튼한 마감까지 —',
      '옷이 아이의 성장을 돕도록 만듭니다.',
    ],
  },
  {
    id: 'safety',
    circle: 'circle-orange',
    sprite: 'sprite-gift',
    label: '선물',
    title: '안심감과 내구성',
    desc: [
      '섬세한 아이 피부에 안전한 봉제,',
      '잡아당겨도 쉽게 떨어지지 않는 단추와 부자재,',
      '반복 세탁에도 강한 튼튼한 원단.',
      '부모님이 안심하고 매일 입힐 수 있는 옷이',
      '핫 비스킷의 기본입니다.',
    ],
  },
]

function BrandPage({ onBack, onSelectCollection }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="brand-page">
      <button className="brand-page-back" onClick={onBack}>
        ← 돌아가기
      </button>

      <div className="brand-header">
        <p className="brand-subtitle">브랜드 정보</p>
        <div className="brand-title-row">
          <img src="/images/icon-car.png" alt="" className="brand-title-icon" />
          <h2 className="brand-title">ABOUT BRAND</h2>
          <img src="/images/icon-helicopter.png" alt="" className="brand-title-icon" />
        </div>
        <img src="/images/about-dots.png" alt="" className="brand-dots" />
      </div>

      <section className="brand-story">
        <h3 className="brand-story-title">갓 구운 비스킷처럼, 따끈따끈한 매일</h3>
        <img src="/images/brand_1.png" alt="핫 비스킷 브랜드 이미지" className="brand-story-img" />
        <p className="brand-story-text">
          HOT BISCUITS(핫 비스킷)는 미키하우스에서 태어난 키즈 캐주얼 브랜드입니다.
          갓 구운 비스킷처럼 따뜻하고 고소한 매일을 아이들에게 선물하고 싶다는
          마음에서 출발했습니다. 뛰고, 구르고, 넘어져도 다시 일어나는 아이들의
          하루하루가 더 즐거워지도록 — 입는 순간 기분까지 폭신해지는 옷을 만듭니다.
        </p>
        <p className="brand-story-text">
          화려한 장식보다 아이의 몸과 마음에 딱 맞는 옷.
          핫 비스킷의 옷장에는 매일 손이 가는 티셔츠부터 특별한 날의 원피스까지,
          아이의 모든 순간이 담겨 있습니다.
        </p>
      </section>

      <section className="brand-values">
        {BRAND_VALUES.map((value) => (
          <div className="brand-value-item" key={value.id}>
            <div className={`brand-circle ${value.circle}`}>
              <div className={`brand-sprite ${value.sprite}`} role="img" aria-label={value.label} />
            </div>
            <h3 className="brand-value-title">{value.title}</h3>
            <p className="brand-value-desc">
              {value.desc.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </p>
          </div>
        ))}
      </section>

      <section className="brand-characters">
        <p className="brand-characters-subtitle">함께하는 친구들</p>
        <h3 className="brand-characters-title">CHARACTER</h3>
        <img src="/images/about-dots.png" alt="" className="brand-dots" />
        <p className="brand-characters-intro">
          핫 비스킷의 옷 곳곳에는 핫 비 월드의 친구들이 숨어 있습니다.
          자수와 프린트로 만나는 두 친구를 소개할게요.
        </p>
        <div className="brand-character-list">
          <div className="brand-character-item">
            <div className="brand-character-sprite sprite-beans" role="img" aria-label="콩" />
            <h4 className="brand-character-name">콩</h4>
            <p className="brand-character-desc">
              언뜻 흐릿해 보이지만 실은 핫 비 월드의 왕자님.
              느긋한 성격이지만 친구가 곤란할 때는
              누구보다 먼저 달려갑니다.
              좋아하는 것은 낮잠과 갓 구운 비스킷.
            </p>
          </div>
          <div className="brand-character-item">
            <div className="brand-character-sprite sprite-cabbit" role="img" aria-label="캐빗" />
            <h4 className="brand-character-name">캐빗</h4>
            <p className="brand-character-desc">
              모두가 동경하는 아이돌.
              조금 뻔뻔스럽고 좋아하는 것과 싫어하는 것이
              분명하지만, 그래서 더 미워할 수 없는 매력쟁이.
              반짝이는 것을 모으는 게 취미입니다.
            </p>
          </div>
        </div>
      </section>

      <section className="brand-cta">
        <p className="brand-cta-text">핫 비스킷의 옷이 궁금해졌다면?</p>
        <div className="brand-cta-buttons">
          <button className="brand-cta-btn" onClick={() => onSelectCollection('spring')}>
            SPRING COLLECTION
          </button>
          <button className="brand-cta-btn" onClick={() => onSelectCollection('summer')}>
            SUMMER COLLECTION
          </button>
        </div>
      </section>
    </div>
  )
}

export default BrandPage
