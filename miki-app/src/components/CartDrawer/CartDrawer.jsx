import './CartDrawer.css'

function CartDrawer({ isOpen, items, onClose, onIncrease, onDecrease, onRemove, onBuy }) {
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={`cart-drawer${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      <button className="cart-backdrop" onClick={onClose} aria-label="장바구니 닫기" />
      <aside className="cart-panel" aria-label="장바구니">
        <div className="cart-panel-header">
          <div>
            <p className="cart-panel-label">CART</p>
            <h2 className="cart-panel-title">장바구니</h2>
          </div>
          <button className="cart-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-empty">담긴 상품이 없습니다.</p>
        ) : (
          <>
            <div className="cart-list">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-main">
                    <span className="cart-item-season">{item.seasonLabel} · LOOK {item.lookNumber}</span>
                    <strong className="cart-item-name">{item.name}</strong>
                    <span className="cart-item-price">{(item.price * item.quantity).toLocaleString()}원</span>
                  </div>
                  <div className="cart-item-actions">
                    <div className="cart-qty">
                      <button onClick={() => onDecrease(item.id)} aria-label={`${item.name} 수량 줄이기`}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => onIncrease(item.id)} aria-label={`${item.name} 수량 늘리기`}>
                        +
                      </button>
                    </div>
                    <button className="cart-buy" onClick={() => onBuy(item)}>
                      BUY
                    </button>
                    <button className="cart-remove" onClick={() => onRemove(item.id)}>
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <span>총 {totalCount}개</span>
              <strong>{totalPrice.toLocaleString()}원</strong>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default CartDrawer
