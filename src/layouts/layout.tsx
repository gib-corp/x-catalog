import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer/Footer'
import '../App.css'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav />
      <main>
          {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout