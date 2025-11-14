import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection, mousePosition }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    if (!frameRef.current || !hoverSection) return

    const el = frameRef.current

    const startX = mousePosition.current.x * 1.1 + el.offsetWidth / 4
    const startY = mousePosition.current.y - el.offsetHeight / 2

    el.style.transform = `translate(${startX}px, ${startY}px)`

    const setX = gsap.quickTo(el, "x", { duration: 0.3, ease: "power2.out" })
    const setY = gsap.quickTo(el, "y", { duration: 0.3, ease: "power2.out" })

    const move = () => {
      const x = mousePosition.current.x * 1.1 + el.offsetWidth / 4
      const y = mousePosition.current.y - el.offsetHeight / 2
      setX(x)
      setY(y)
    }

    window.addEventListener("mousemove", move)

    return () => {
      window.removeEventListener("mousemove", move)
      gsap.killTweensOf(el)
    }
  }, [hoverSection])

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

    if (frameVideo.readyState >= 3) { 
      handleCanPlay()
    }

    return () => {
      frameVideo.removeEventListener('canplay', handleCanPlay)
    }
  }, [hoverVideo])

  if (!hoverSection) return null

  return (
    <div ref={frameRef} className="frame">
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