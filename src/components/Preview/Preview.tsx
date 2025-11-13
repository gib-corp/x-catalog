import { useEffect, useRef } from 'react'
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection, onPreloaded}: PreviewProps) => {

  const videoRef = useRef<HTMLVideoElement>(null)
  const cacheRefs = useRef<Record<string, HTMLVideoElement>>({})
  
  useEffect(() => {

    let loadCount = 0

    videos.forEach(({ id }) => {
      const src = `/videos/${id}.mp4`
      const vid = document.createElement('video')
      vid.src = src
      vid.preload = 'metadata'
      vid.muted = true

      const handleLoad = () => {
        cacheRefs.current[src] = vid
        loadCount++

        if (loadCount === videos.length) {
          onPreloaded()
        }
      }

      vid.onloadedmetadata = handleLoad
      vid.onerror = handleLoad
      vid.load()
    })
  }, [])

  useEffect(() => {
    const frameVideo = videoRef.current
    if (!frameVideo || !hoverVideo) return

    const newSrc = `/videos/${hoverVideo}.mp4`
    if (frameVideo.src.endsWith(newSrc)) return

    const cached = cacheRefs.current[newSrc]
    if (cached) {
      frameVideo.src = cached.src
      frameVideo.currentTime = 0
      frameVideo.play().catch(() => {})
    } else {
      frameVideo.src = newSrc
      frameVideo.load()
      frameVideo.play().catch(() => {})
    }
  }, [hoverVideo])
  
  return (
    <div className="frame" style={{ visibility: hoverSection ? 'visible' : 'hidden' }}>
      <video
        ref={videoRef}
        height="100%"
        autoPlay
        loop
        muted 
        />
    </div>
  );
}

export default Preview;