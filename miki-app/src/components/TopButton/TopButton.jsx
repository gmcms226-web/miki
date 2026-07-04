import { useState, useEffect } from 'react'
import './TopButton.css'

function TopButton({ raised = false }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      className={`top-button${visible ? ' visible' : ''}${raised ? ' raised' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
    >
      <img src="/images/pagetop_sp.png" alt="PAGE TOP" />
    </button>
  )
}

export default TopButton
