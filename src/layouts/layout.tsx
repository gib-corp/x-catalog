import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import '../App.css'

interface LayoutProps {
  children: React.ReactNode
  hasLoaded: boolean
}

const Layout = ({ children, hasLoaded }: LayoutProps) => {

  return (
    <>
      <Nav hasLoaded={ hasLoaded }/>
      <main>
          {children}
      </main>
      <Footer hasLoaded={ hasLoaded }/>
    </>
  )
}

export default Layout