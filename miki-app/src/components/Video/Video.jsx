import './Video.css'

const videos = [
  {
    title: '고집 가득한 퍼스트 슈즈 소개',
    id: 'QmxA4jXw8AY',
  },
  {
    title: '출산 준비 특별 세트 소개',
    id: '230i8WfxIbU',
  },
]

function Video() {
  return (
    <section id="video" className="video-section">
      {videos.map(video => (
        <div key={video.id} className="video-item">
          <h3 className="video-title">{video.title}</h3>
          <div className="video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      ))}
    </section>
  )
}

export default Video
