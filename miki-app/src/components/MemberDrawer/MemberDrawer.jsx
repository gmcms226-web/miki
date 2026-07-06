import { useEffect, useState } from 'react'
import { updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'
import './MemberDrawer.css'

const PANEL_TITLES = {
  mypage: ['MY PAGE', '마이페이지'],
  favorites: ['WISH LIST', '관심상품'],
  recent: ['RECENTLY VIEWED', '최근본상품'],
}

function MemberDrawer({
  panel,
  user,
  cartCount,
  favoriteItems,
  recentItems,
  onClose,
  onLoginOpen,
  onCartOpen,
  onAddToCart,
  onRemoveFavorite,
  onClearRecent,
  onBuy,
  onProfileUpdated,
}) {
  const isOpen = Boolean(panel)
  const [label, title] = PANEL_TITLES[panel] || PANEL_TITLES.mypage
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [savingName, setSavingName] = useState(false)

  // 패널을 닫거나 다른 탭으로 바꾸면 이름 수정 모드 해제
  useEffect(() => {
    setEditingName(false)
  }, [panel])

  const startNameEdit = () => {
    setNameInput(user?.displayName || '')
    setEditingName(true)
  }

  const handleNameSave = async (event) => {
    event.preventDefault()
    const trimmed = nameInput.trim()
    if (!trimmed) return
    setSavingName(true)
    try {
      await updateProfile(auth.currentUser, { displayName: trimmed })
      onProfileUpdated()
      setEditingName(false)
    } catch {
      alert('이름 저장에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setSavingName(false)
    }
  }

  const addItemToCart = (item) => {
    onAddToCart(item, {
      season: item.season,
      seasonLabel: item.seasonLabel,
      lookNumber: item.lookNumber,
      lookTitle: item.lookTitle,
    })
  }

  const openLogin = () => {
    onClose()
    onLoginOpen()
  }

  const openCart = () => {
    onClose()
    onCartOpen()
  }

  const renderItemList = (items, emptyText, type) => (
    items.length === 0 ? (
      <p className="member-empty">{emptyText}</p>
    ) : (
      <div className="member-list">
        {items.map((item) => (
          <div className="member-item" key={item.id}>
            <div className="member-item-main">
              <span className="member-item-season">{item.seasonLabel} · LOOK {item.lookNumber}</span>
              <strong className="member-item-name">{item.name}</strong>
              <span className="member-item-price">{item.price.toLocaleString()}원</span>
            </div>
            <div className="member-item-actions">
              <button className="member-action-primary" onClick={() => addItemToCart(item)}>
                담기
              </button>
              <button className="member-action-buy" onClick={() => onBuy(item)}>
                BUY
              </button>
              {type === 'favorites' && (
                <button className="member-action-subtle" onClick={() => onRemoveFavorite(item.id)}>
                  삭제
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  )

  return (
    <div className={`member-drawer${isOpen ? ' open' : ''}`} aria-hidden={!isOpen}>
      <button className="member-backdrop" onClick={onClose} aria-label="회원 메뉴 닫기" />
      <aside className="member-panel" aria-label={title}>
        <div className="member-panel-header">
          <div>
            <p className="member-panel-label">{label}</p>
            <h2 className="member-panel-title">{title}</h2>
          </div>
          <button className="member-close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        {panel === 'mypage' && (
          <div className="member-mypage">
            <div className="member-profile">
              <span className="member-avatar">{user ? (user.displayName || user.email).slice(0, 1).toUpperCase() : 'G'}</span>
              <div>
                <p className="member-profile-label">{user ? '로그인 계정' : '게스트'}</p>
                <strong>{user ? (user.displayName ? `${user.displayName}님` : user.email) : '로그인이 필요합니다.'}</strong>
              </div>
              {user && !editingName && (
                <button className="member-name-edit" onClick={startNameEdit}>
                  이름 수정
                </button>
              )}
            </div>
            {user && editingName && (
              <form className="member-name-form" onSubmit={handleNameSave}>
                <input
                  className="member-name-input"
                  value={nameInput}
                  onChange={(event) => setNameInput(event.target.value)}
                  placeholder="이름"
                  required
                />
                <button type="submit" className="member-action-primary" disabled={savingName}>
                  {savingName ? '저장 중...' : '저장'}
                </button>
                <button type="button" className="member-action-subtle" onClick={() => setEditingName(false)}>
                  취소
                </button>
              </form>
            )}
            {!user && (
              <button className="member-wide-button" onClick={openLogin}>
                로그인 / 회원가입
              </button>
            )}
            <div className="member-stats">
              <div>
                <span>{cartCount}</span>
                <p>장바구니</p>
              </div>
              <div>
                <span>{favoriteItems.length}</span>
                <p>관심상품</p>
              </div>
              <div>
                <span>{recentItems.length}</span>
                <p>최근본상품</p>
              </div>
            </div>
            <button className="member-wide-button light" onClick={openCart}>
              장바구니 보기
            </button>
          </div>
        )}

        {panel === 'favorites' && renderItemList(favoriteItems, '관심상품이 없습니다.', 'favorites')}

        {panel === 'recent' && (
          <>
            {recentItems.length > 0 && (
              <button className="member-clear" onClick={onClearRecent}>
                최근본상품 비우기
              </button>
            )}
            {renderItemList(recentItems, '최근 본 상품이 없습니다.', 'recent')}
          </>
        )}
      </aside>
    </div>
  )
}

export default MemberDrawer
