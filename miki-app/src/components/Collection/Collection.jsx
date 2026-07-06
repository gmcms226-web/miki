import { useRef, useEffect, useState } from 'react'
import './Collection.css'

function Collection({ onSelect }) {
  const ref = useRef(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setAnimate(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="collection" className={`collection-section${animate ? ' animate' : ''}`} ref={ref}>
      <div className="collection-spring">
        <button
          type="button"
          className="collection-cta spring-cta"
          onClick={() => onSelect('spring')}
          aria-label="봄 컬렉션 판매 페이지로 이동"
        >
          <span className="collection-cta-sprite cta-beans" />
          <span className="collection-cta-bubble">봄옷 보러 가기!</span>
        </button>
        <img
          src="/images/spring-collection.png"
          alt="Spring Collection"
          className="collection-clickable"
          onClick={() => onSelect('spring')}
        />
      </div>
      <div className="collection-summer">
        <button
          type="button"
          className="collection-cta summer-cta"
          onClick={() => onSelect('summer')}
          aria-label="여름 컬렉션 판매 페이지로 이동"
        >
          <span className="collection-cta-bubble">여름옷 보러 가기!</span>
          <span className="collection-cta-sprite cta-cabbit" />
        </button>
        <img
          src="/images/summer-collection.png"
          alt="Summer Collection"
          className="collection-clickable"
          onClick={() => onSelect('summer')}
        />
      </div>
    </section>
  )
}

export default Collection
