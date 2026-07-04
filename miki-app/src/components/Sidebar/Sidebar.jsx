import { useState, useEffect } from 'react'
import { getCollectionProducts } from '../../data/collections'
import './Sidebar.css'

const quickTags = ['SHIRTS', 'DRESS', 'SHORTALL', 'T-SHIRTS', 'JINBEI', 'OVERALLS']
const clothes = getCollectionProducts()

function normalize(value) {
  return value.trim().toLowerCase()
}

function Sidebar({ onSelectCollection }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev === 0 ? 1 : 0))
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const normalizedQuery = normalize(query)
  const searchResults = normalizedQuery
    ? clothes.filter((item) => {
      const searchableText = [item.name, item.seasonLabel, ...item.keywords].join(' ').toLowerCase()
      return searchableText.includes(normalizedQuery)
    })
    : []

  const openProductSeason = (item) => {
    onSelectCollection(item.season)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (searchResults.length > 0) {
      openProductSeason(searchResults[0])
    }
  }

  const handleTagClick = (tag) => {
    setQuery(tag)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/images/logo.png" alt="HOT BISCUITS MIKIHOUSE" />
      </div>

      <div className="sidebar-search">
        <form className="search-wrap" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="search-btn" type="submit" aria-label="검색">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB8E4E" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
        {query && (
          <div className="search-results" aria-live="polite">
            {searchResults.length > 0 ? (
              searchResults.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className="search-result"
                  onClick={() => openProductSeason(item)}
                >
                  <span className="search-result-main">
                    <span className="search-result-name">{item.name}</span>
                    <span className="search-result-price">{item.price.toLocaleString()}원</span>
                  </span>
                  <span className="search-result-season">{item.seasonLabel} COLLECTION</span>
                </button>
              ))
            ) : (
              <p className="search-empty">판매 중인 상품이 없습니다.</p>
            )}
          </div>
        )}
        <div className="quick-tags">
          {quickTags.map(tag => (
            <button
              key={tag}
              type="button"
              className={`quick-tag${query === tag ? ' active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="collection-slider">
        <div className={`collection-item spring ${activeIdx === 0 ? 'visible' : 'slide-left'}`}>
          <button
            type="button"
            className="collection-img-wrap"
            onClick={() => onSelectCollection('spring')}
          >
            <img src="/images/brand_1.png" alt="Spring Collection" />
            <span className="collection-badge">SPRING</span>
          </button>
        </div>
        <div className={`collection-item summer ${activeIdx === 1 ? 'visible' : 'slide-right'}`}>
          <button
            type="button"
            className="collection-img-wrap"
            onClick={() => onSelectCollection('summer')}
          >
            <img src="/images/brand_2.png" alt="Summer Collection" />
            <span className="collection-badge">SUMMER</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
