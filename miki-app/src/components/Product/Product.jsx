import './Product.css'

function Product() {
  return (
    <section id="product" className="product-section">
      <div className="product-item">
        <div className="product-img-wrap">
          <img src="/src/assets/images/product-image.jpg" alt="아기 속옷" />
        </div>
        <p className="product-label">추천</p>
        <h3 className="product-title">아기 속옷</h3>
        <p className="product-desc">
          섬세한 아기의 피부 때문에 착용감이 좋은 촉감만 것은 물론, 매일의 세탁에서도 형태 무너지지 않게, 세세한 봉제에도 구애되었습니다. 안심의 일본제입니다.
        </p>
        <button className="product-btn">추천 더 보기</button>
      </div>
    </section>
  )
}

export default Product
