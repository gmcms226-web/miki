import './AboutBrand.css'

function AboutBrand() {
  return (
    <section id="about" className="about-section">
      <div className="about-header">
        <p className="about-subtitle">브랜드 정보</p>
        <div className="about-title-row">
          <img src="/images/icon-car.png" alt="" className="about-title-icon" />
          <h2 className="about-title">ABOUT BRAND</h2>
          <img src="/images/icon-helicopter.png" alt="" className="about-title-icon" />
        </div>
        <img src="/images/about-dots.png" alt="" className="about-dots" />
      </div>
      <div className="about-item">
        <div className="about-circle circle-pink">
          <div className="about-sprite sprite-clothes" role="img" aria-label="의류" />
        </div>
        <h3 className="about-item-title">편안한 촉감</h3>
        <p className="about-item-desc">
          어떤 때에도 쾌적하게 지내고 싶기 때문에,
          <br />
          촉감이 좋은 원단이나 소재 선택을 하고 있습니다.
        </p>
      </div>
      <div className="about-item">
        <div className="about-circle circle-green">
          <div className="about-sprite sprite-shoes" role="img" aria-label="신발" />
        </div>
        <h3 className="about-item-title">기능성 추구</h3>
        <p className="about-item-desc">
          매일 점점 성장하는 어린이를 위해
          <br />
          기능성을 추구한 제조를 소중히하고 있습니다.
        </p>
      </div>
      <div className="about-item">
        <div className="about-circle circle-orange">
          <div className="about-sprite sprite-gift" role="img" aria-label="선물" />
        </div>
        <h3 className="about-item-title">안심감과 내구성</h3>
        <p className="about-item-desc">
          섬세한 아이의 피부에 안전한 봉제나
          <br />
          내구성이 풍부한 천 등, 안심 안전의 만들기를 소중히 하고 있습니다.
        </p>
      </div>
      <button className="about-btn">브랜드에 대해 자세히 알아보기</button>
    </section>
  )
}

export default AboutBrand
