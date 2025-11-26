import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Player from "@vimeo/player"
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const containersRef = useRef<Record<string, HTMLDivElement | null>>({})
  const playersRef = useRef<Record<string, Player>>({})

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const setX = gsap.quickTo(el, "x", { duration: 0.2, ease: "power2.out" })
    const setY = gsap.quickTo(el, "y", { duration: 0.2, ease: "power2.out" })
    
    const mouseRef = { x: 0, y: 0 } 

    const move = (e: MouseEvent) => {
      mouseRef.x = e.clientX
      mouseRef.y = e.clientY

      const x = mouseRef.x * 1.1 + el.offsetWidth / 4 
      const y = mouseRef.y - el.offsetHeight / 2 

      setX(x)
      setY(y)
    }

    window.addEventListener("mousemove", move)

    setX(window.innerWidth / 2)
    setY(window.innerHeight / 2)

    return () => {
      window.removeEventListener("mousemove", move)
      gsap.killTweensOf(el)
    }
  }, [])

  useEffect(() => {
    Object.keys(containersRef.current).forEach((id) => {
      const containerEl = containersRef.current[id]

      if (containerEl && !playersRef.current[id]) {
        const player = new Player(containerEl, {
          id: Number(id),
          autoplay: false,
          muted: true,
          loop: true,
          background: true,
          dnt: true,
          controls: false,
          responsive: true
        })

        player.ready().then(() => {}).catch(() => {});
        playersRef.current[id] = player
      }
    })

    return () => {
      Object.values(playersRef.current).forEach(p => p.destroy())
      playersRef.current = {}
    }
  }, [])

  useEffect(() => {
    Object.keys(playersRef.current).forEach((id) => {
      const player = playersRef.current[id]
      const container = containersRef.current[id]
      
      if (!container) return

      if (id === hoverVideo) {
        player.play().then(() => {
            if (hoverVideo === id) {
               gsap.set(container, { opacity: 1, overwrite: true })
            } else {
               player.pause()
            }
        }).catch((error) => {
            if (error.name !== 'AbortError') console.warn(error)
        })

      } else {
        gsap.set(container, { opacity: 0, overwrite: true })
        
        player.setCurrentTime(0).catch(() => {})
        player.pause().catch(() => {})
      }
    })
  }, [hoverVideo])

  return (
    <div
      ref={frameRef}
      className="frame"
      style={{
        visibility: hoverSection ? 'visible' : 'hidden'
      }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          ref={(el) => { containersRef.current[video.id] = el}}
          className="vimeo"
        />
      ))}
    </div>
  )
}

export default Preview