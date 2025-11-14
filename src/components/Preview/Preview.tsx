import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection, mousePosition }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    if (!frameRef.current || !hoverSection) return

    const setX = gsap.quickSetter(frameRef.current, "x", "px")
    const setY = gsap.quickSetter(frameRef.current, "y", "px")

    const frameWidth = frameRef.current.offsetWidth
    const frameHeight = frameRef.current.offsetHeight

    setX(mousePosition.current.x)
    setY(mousePosition.current.y)

    const move = () => {
      setX(mousePosition.current.x * 1.1 + frameWidth / 4)
      setY(mousePosition.current.y - frameHeight / 2)
      rafId.current = requestAnimationFrame(move)
    }

    rafId.current = requestAnimationFrame(move)

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
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