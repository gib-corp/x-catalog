import { useState } from "react";
import Layout from './layouts/layout'
import Case from './components/Case/Case'
import Preview from './components/Preview/Preview'
import Loading from "./components/Loading/Loading";
import videos from "./data/videos.json"
import Header from "./components/Header/Header";

const App = () => {

  const [hoverVideo, setHoverVideo] = useState<string | null>(null) //Video ID = Vimeo
  const [hoverSection, setHoverSection] = useState(false) // Section Visible ? True False
  const [hasLoaded, setHasLoaded] = useState(false) // Animation Landing
  const [isListReady, setIsListReady ] = useState(false) // Animation List

  const handleHover = (fileId: string | null) => {
    setHoverVideo(fileId)
  }

  return (
    <Layout hasLoaded={hasLoaded}>
      { !hasLoaded && (
        <Loading onLoaded={() => setHasLoaded(true)} />
      )}

      <Preview
        hoverVideo={hoverVideo}
        hoverSection={hoverSection}
      />

      <Header
        hasLoaded={hasLoaded}
      />

      { hasLoaded && (
        <section style={!isListReady ? { pointerEvents: 'none' } : { pointerEvents: 'auto' }}
          onMouseEnter={() => { setHoverSection(true) }}
          onMouseLeave={() => {
            setHoverSection(false)
            handleHover(null)
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
