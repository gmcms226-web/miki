import './Character.css'

function Character() {
  return (
    <section className="character-section">
      <img src="/images/cloud01.png" alt="" className="character-cloud cloud-1" />
      <img src="/images/cloud02.png" alt="" className="character-cloud cloud-2" />
      <img src="/images/cloud03.png" alt="" className="character-cloud cloud-3" />
      <img src="/images/cloud04.png" alt="" className="character-cloud cloud-4" />
      <div className="character-header">
        <p className="character-subtitle">캐릭터 소개</p>
        <div className="character-title-row">
          <img src="/images/icon-sun.png" alt="" className="character-title-icon" />
          <h2 className="character-title">CHARACTER</h2>
          <img src="/images/icon-tree.png" alt="" className="character-title-icon" />
        </div>
        <img src="/images/about-dots.png" alt="" className="character-dots" />
        <img src="/images/icon-airplane.gif" alt="" className="character-airplane" />
      </div>
      <div className="character-list">
        <div className="character-item character-beans">
          <div className="character-sprite sprite-beans" role="img" aria-label="콩" />
          <h3 className="character-name">콩</h3>
          <p className="character-desc">
            언뜻 흐릿해 보이지만
            <br />
            실은, 핫 비월드의 왕자님.
          </p>
        </div>
        <div className="character-item character-cabbit">
          <div className="character-sprite sprite-cabbit" role="img" aria-label="캐빗" />
          <h3 className="character-name">캐빗</h3>
          <p className="character-desc">
            모두 동경의 아이돌. 조금 뻔뻔스럽고,
            <br />
            좋아하고 싫어하는 것이 많다.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Character
