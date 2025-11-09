declare module './components/Nav/Nav' {
  const Nav: () => JSX.Element;
  export default Nav;
}

declare module './components/Footer/Footer' {
  const Footer: () => JSX.Element;
  export default Footer;
}

type Video = {
  id: number
  title: string
  source: string
  link: string
}

type CaseProps = {
  title: string
  source: string
  link: string
}