import './ShopSelectModal.css'

function ShopSelectModal({ isOpen, onClose, onSelect }) {
  if (!isOpen) return null

  return (
    <div className="shop-select-overlay" onClick={onClose}>
      <div className="shop-select-modal" onClick={(e) => e.stopPropagation()}>
        <button className="shop-select-close" onClick={onClose} aria-label="닫기">
          ×
        </button>
        <h2 className="shop-select-title">ONLINE SHOP</h2>
        <p className="shop-select-desc">어떤 컬렉션을 보러 갈까요?</p>
        <div className="shop-select-options">
          <button className="shop-select-option" onClick={() => onSelect('spring')}>
            <img src="/images/spring-collection.png" alt="Spring Collection" />
            <span className="shop-select-label">SPRING</span>
          </button>
          <button className="shop-select-option" onClick={() => onSelect('summer')}>
            <img src="/images/summer-collection.png" alt="Summer Collection" />
            <span className="shop-select-label">SUMMER</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopSelectModal
