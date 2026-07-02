import './HotSpring.css'

const looks = Array.from({ length: 11 }, (_, i) => String(i + 1).padStart(2, '0'))

function HotSpring() {
  return (
    <section id="hotspring" className="hotspring-section">
      <h2 className="hotspring-title">2026 HOT SPRING</h2>
      <div className="hotspring-band">
        <div className="hotspring-track">
          {[...looks, ...looks].map((num, i) => (
            <div className="hotspring-item" key={`${num}-${i}`}>
              <img src={`/src/assets/images/menu_${num}.png`} alt={`LOOK ${num}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HotSpring
