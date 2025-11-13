declare module './components/Nav/Nav' {
  const Nav: () => JSX.Element;
  export default Nav;
}

declare module './components/Footer/Footer' {
  const Footer: () => JSX.Element;
  export default Footer;
}

interface NavProps {
  hasLoaded: boolean
}

interface FooterProps {
  hasLoaded: boolean
}

type LoadingProps = {
  onLoaded: () => void
}

type Video = {
  id: string
  title: string
  director: string
  link: string
}

type PreviewProps = {
  hoverVideo: string | null
  hoverSection: boolean | null
}

type HeaderProps = {
  hasLoaded: boolean
}

type CaseProps = {
  title: string
  director: string
  onHover: () => void
  hasLoaded: boolean
  onListReady: () => void
}