import { useState, useRef, useEffect } from "react";
import Layout from './layouts/layout'
import Case from './components/Case/Case'
import Preview from './components/Preview/Preview'
import Loading from "./components/Loading/Loading";
import videos from "./data/videos.json"
import Header from "./components/Header/Header";

const App = () => {

  const [hoverVideo, setHoverVideo] = useState<string | null>(null)
  const [hoverSection, setHoverSection] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false) // Animation Landing
  const [isListReady, setIsListReady ] = useState(false) // Animation List

  const handleHover = (fileId: string) => {
    setHoverVideo(fileId)
  }

  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current.x = e.clientX
      mousePosition.current.y = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <Layout hasLoaded={hasLoaded}>
      { !hasLoaded && (
        <Loading onLoaded={() => setHasLoaded(true)} />
      )}
      { isListReady && (
        <Preview
          hoverVideo={hoverVideo}
          hoverSection={hoverSection}
          mousePosition={mousePosition}
        />
      )}
      <Header
        hasLoaded={hasLoaded}
      />
      { hasLoaded && (
        <section style={!isListReady ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onMouseEnter={() => { setHoverSection(true) }}
          onMouseLeave={() => {
            setHoverSection(false)
            handleHover("empty")
          }}
        >
          {videos.map((video: Video) => (
            <Case
              key={video.id}
              title={video.title}
              director={video.director}
              onHover={() => handleHover(video.id)}
              hasLoaded={hasLoaded}
              onListReady={() => setIsListReady(true)}
            />
          ))}
        </section>
      )}
    </Layout>
  )
}

export default App
