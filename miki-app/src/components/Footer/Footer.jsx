import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#">회사개요</a>
        <span className="footer-divider">|</span>
        <a href="#">개인정보에 대해서</a>
      </div>
      <p className="footer-copyright">
        Copyright © MIKIHOUSE TRADE. Co.,Ltd. All rights reserved.
      </p>
      <p className="footer-copyright">
        핫 비스킷은 <a href="#" className="footer-brand-link">주식회사 미키 하우스 트레이드</a> 의 취급 브랜드입니다.
      </p>
    </footer>
  )
}

export default Footer
