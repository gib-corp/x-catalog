import Layout from './layouts/layout'
import Case from './components/Case/Case'
import videos from "./data/videos.json"
import Preview from './components/Preview/Preview'

const App = () => {

  return (
    <Layout>
      <Preview />
      <header>[&nbsp;&nbsp;Selected trailers&nbsp;&nbsp;]</header>
      <section>
        {videos.map((video: Video) => (
          <Case
            key={video.id}
            title={video.title}
            source={video.source}
            link={video.link}
          />
        ))}
      </section>
    </Layout>
  )
}

export default App
