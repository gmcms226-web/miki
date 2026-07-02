import { useRef, useEffect, useState } from 'react'
import './Collection.css'

function Collection() {
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
        <img src="/src/assets/images/spring-collection.png" alt="Spring Collection" />
      </div>
      <div className="collection-summer">
        <img src="/src/assets/images/summer-collection.png" alt="Summer Collection" />
      </div>
    </section>
  )
}

export default Collection
