import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Player from "@vimeo/player"
import videos from "../../data/videos.json"
import "./Preview.css"

type PlayerItem = { player: Player; container: HTMLDivElement }

const Preview = ({ hoverVideo, hoverSection, mousePosition }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const playersRef = useRef<Record<string, PlayerItem>>({})

  useEffect(() => {
    const el = frameRef.current
    
    if (!el) return
    const startX = mousePosition.current.x * 1.1 + el.offsetWidth / 4
    const startY = mousePosition.current.y - el.offsetHeight / 2

    gsap.set(el, { x: startX, y: startY })

    const setX = gsap.quickTo(el, "x", { duration: 0.2, ease: "power2.out" })
    const setY = gsap.quickTo(el, "y", { duration: 0.2, ease: "power2.out" })

    const move = () => {
      setX(mousePosition.current.x * 1.1 + el.offsetWidth / 4)
      setY(mousePosition.current.y - el.offsetHeight / 2)
    }

    window.addEventListener("mousemove", move)
    return () => {
      window.removeEventListener("mousemove", move)
      gsap.killTweensOf(el)
    }
  }, [])

  useEffect(() => {
    if (!frameRef.current) return

    videos.forEach(v => {
      if (!playersRef.current[v.id]) {
        const container = document.createElement("div")
        container.style.position = "absolute"
        container.style.top = "0"
        container.style.left = "0"
        container.style.width = "100%"
        container.style.height = "100%"
        container.style.opacity = "0"
        container.style.pointerEvents = "none"
        frameRef.current!.appendChild(container)

        const player = new Player(container, {
          id: v.id,
          autoplay: false,
          muted: true,
          loop: true,
          background: true
        })
        player.pause().catch(() => {})

        playersRef.current[v.id] = { player, container }
      }
    })
  }, [])

  useEffect(() => {
    Object.keys(playersRef.current).forEach(id => {
      const { player, container } = playersRef.current[id]

      if(id === hoverVideo) {
        player.setCurrentTime(0).catch(() => {})
        player.ready().then(() => {
          player.play().catch(() => {})
        })
        gsap.to(container, { opacity: id === hoverVideo ? 1 : 0, duration: 0 })
      } else {
        gsap.to(container, { opacity: 0, duration: 0 })
      }
    })
  }, [hoverVideo])

  return (
    <div
      ref={frameRef}
      className="frame"
      style={{ visibility: hoverSection ? 'visible' : 'hidden', pointerEvents: 'none' }}
    />
  )
}

export default Preview