import { useEffect, useState, useRef } from 'react'
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection }: PreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    videos.forEach(({ id }) => {
      const vid = document.createElement('video')
      vid.src = `/videos/${id}.mp4`
      vid.preload = 'metadata'
      vid.muted = true
    })
  }, [])

  useEffect(() => {
    const frameVideo = videoRef.current
    if (!frameVideo || !hoverVideo) return

    setCanPlay(false)
    frameVideo.src = `/videos/${hoverVideo}.mp4`

    const handleCanPlay = () => {
      setCanPlay(true)
      frameVideo.play().catch(() => {})
    }

    frameVideo.addEventListener('canplay', handleCanPlay, { once: true })

    return () => {
      frameVideo.removeEventListener('canplay', handleCanPlay)
    }
  }, [hoverVideo])

  if (!hoverSection) return null

  return (
    <div className="frame">
      { !canPlay && (
        <img src={`/thumbnails/${hoverVideo}.jpeg`} alt="Thumbnail" />
      )}
      <video
        ref={videoRef}
        height="100%"
        autoPlay
        loop
        muted
      />
    </div>
  )
}

export default Preview