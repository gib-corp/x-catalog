import { useEffect } from 'react';
import Player from "@vimeo/player";
import gsap from 'gsap';

export const useVimeo = (videos: Video[], { hoverVideo, containersRef, playersRef }: VimeoProps) => {

  useEffect(() => {
    Object.keys(containersRef.current).forEach((id) => {
        const containerEl = containersRef.current[id]

        if (containerEl && !playersRef.current[id]) {
            const player = new Player(containerEl, {
                id: Number(id),
                autoplay: false, muted: true, loop: true, background: true,
                dnt: true, controls: false, responsive: true
            })
            player.ready().catch(() => {});
            playersRef.current[id] = player
        }
    })

    return () => {
        Object.values(playersRef.current).forEach(p => p.destroy())
        playersRef.current = {}
    }
  }, [containersRef, playersRef, videos])

  useEffect(() => {
    Object.keys(playersRef.current).forEach((id) => {
        const player = playersRef.current[id]
        const container = containersRef.current[id]
        
        if (!container) return

        if (id === hoverVideo) {
            gsap.set(container, { opacity: 1, zIndex: 2, overwrite: true })
            player.play().catch((error: any) => {
                if (error.name !== 'AbortError') console.warn(error)
            })
        } else {
            gsap.set(container, { opacity: 0, zIndex: 1, overwrite: true })
            player.setCurrentTime(0).catch(() => {})
            player.pause().catch(() => {})
        }
    })
  }, [hoverVideo, playersRef, containersRef])
}