import { useEffect, useRef } from 'react'
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection}: PreviewProps) => {

  const videoRef = useRef<HTMLVideoElement>(null)
  
  useEffect(()=> {
    if (videoRef.current && hoverVideo) {
      const frameVideo = videoRef.current
      const newSrc = `/videos/${hoverVideo}.mp4`;
      
      if (frameVideo.src.endsWith(newSrc)) return;
      
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

const preloadVideos = (videoData: Video[]) => {
  videoData.forEach(({ id }) => {
    const video = document.createElement('video')
    video.src = `/videos/${id}.mp4`
    video.preload = 'auto'
    video.muted = true
    video.load()
  })
}

export default Preview;