import { useRef } from 'react'
import { useMouseTracker } from '../../hooks/useMouseTracker'
import { useVimeo } from '../../hooks/useVimeo'
import Player from "@vimeo/player"
import videos from "../../data/videos.json"
import "./Preview.css"

const Preview = ({ hoverVideo, hoverSection }: PreviewProps) => {
  const frameRef = useRef<HTMLDivElement>(null)
  const containersRef = useRef<Record<string, HTMLDivElement | null>>({})
  const playersRef = useRef<Record<string, Player>>({})

  useMouseTracker({ frameRef })
  useVimeo(videos, { hoverVideo, containersRef, playersRef })

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