import { useEffect } from 'react'
import gsap from 'gsap'

interface MouseTrackerProps {
  frameRef: React.RefObject<HTMLDivElement | null>;
}

export const useMouseTracker = ({ frameRef }: MouseTrackerProps) => {
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
  }, [frameRef])
}