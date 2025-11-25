import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Player from "@vimeo/player"
import videos from "../../data/videos.json"
import "./Preview.css"

type PlayerItem = { player: Player; container: HTMLDivElement }

const Preview = ({ hoverVideo, hoverSection }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const playersRef = useRef<Record<string, PlayerItem>>({})
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const el = frameRef.current
    if (!el) return

    const setX = gsap.quickTo(el, "x", { duration: 0.2, ease: "power2.out" })
    const setY = gsap.quickTo(el, "y", { duration: 0.2, ease: "power2.out" })

    const move = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      const x = mouseRef.current.x * 1.1 + el.offsetWidth / 4
      const y = mouseRef.current.y - el.offsetHeight / 2

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
        container.style.overflow = "hidden"
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

    if (!hoverVideo) {
      Object.values(playersRef.current).forEach(({ container }) => {
        gsap.to(container, { opacity: 0, duration: 0 })
      })
      return
    }

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