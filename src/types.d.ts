declare module './components/Nav/Nav' {
  const Nav: () => JSX.Element;
  export default Nav;
}

declare module './components/Footer/Footer' {
  const Footer: () => JSX.Element;
  export default Footer;
}

type Video = {
  id: string
  title: string
  director: string
  link: string
}

type PreviewProps = {
  hoverVideo: string | null;
  hoverSection: boolean | null;
}

type CaseProps = {
  title: string
  director: string
  link: string
  onHover: () => void;
}