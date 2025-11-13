import { useEffect, useState, useRef } from 'react'
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection }: PreviewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const preloadImagesSequentially = async () => {
      for (const { id } of videos) {
        await new Promise<void>((resolve) => {
          const img = new Image()
          img.src = `/thumbnails/${id}.jpeg`
          img.onload = () => resolve()
          img.onerror = () => resolve()
        })
      }
    }

    const preloadVideosSequentially = async () => {
      for (const { id } of videos) {
        await new Promise<void>((resolve) => {
          const vid = document.createElement('video')
          vid.src = `/videos/${id}.mp4`
          vid.preload = 'metadata'
          vid.muted = true

          vid.onloadedmetadata = () => resolve()
          vid.onerror = () => resolve()

          setTimeout(() => resolve(), 1500)
        })
      }
    }

    const preloadAll = async () => {
      await preloadImagesSequentially()
      await preloadVideosSequentially()
    }

    preloadAll()
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
        <img src={`/thumbnails/${hoverVideo}.jpeg`} />
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