import { useState, useEffect } from 'react'
import './Sidebar.css'

const quickTags = ['SHIRTS', 'DRESS', 'SHORTALL', 'T-SHIRTS', 'JINBEI', 'OVERALLS']

function Sidebar() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev === 0 ? 1 : 0))
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const handleTagClick = (tag) => {
    setQuery(tag)
  }

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/src/assets/images/logo.png" alt="HOT BISCUITS MIKIHOUSE" />
      </div>

      <div className="sidebar-search">
        <div className="search-wrap">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="search-btn" aria-label="검색">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FB8E4E" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>
        <div className="quick-tags">
          {quickTags.map(tag => (
            <button
              key={tag}
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
          <div className="collection-img-wrap">
            <img src="/src/assets/images/spring-collection.png" alt="Spring Collection" />
          </div>
        </div>
        <div className={`collection-item summer ${activeIdx === 1 ? 'visible' : 'slide-right'}`}>
          <div className="collection-img-wrap">
            <img src="/src/assets/images/summer-collection.png" alt="Summer Collection" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
