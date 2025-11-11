import { useState } from "react";
import Layout from './layouts/layout'
import Case from './components/Case/Case'
import videos from "./data/videos.json"
import Preview from './components/Preview/Preview'

const App = () => {

  const [hoverVideo, setHoverVideo] = useState<string | null>(null)
  const [hoverSection, setHoverSection] = useState(false)

  const handleHover = (fileId: string) => {
    setHoverVideo(fileId)
  }

  return (
    <Layout>
      <Preview
        hoverVideo={hoverVideo}
        hoverSection={hoverSection}
      />
      <header>[&nbsp;&nbsp;Selected trailers&nbsp;&nbsp;]</header>
      <section
        onMouseEnter={() => { setHoverSection(true) }}
        onMouseLeave={() => { setHoverSection(false) }}
      >
        {videos.map((video: Video) => (
          <Case
            key={video.id}
            title={video.title}
            director={video.director}
            link={video.link}
            onHover={() => handleHover(video.id)}
          />
        ))}
      </section>
    </Layout>
  )
}

export default App
