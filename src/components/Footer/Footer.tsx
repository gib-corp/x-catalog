import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import "./Footer.css";

function Footer({ hasLoaded }: FooterProps) {

  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!hasLoaded || !footerRef.current) return;

    const tl = gsap.timeline()

    tl.to(
        footerRef.current,{
        opacity: 1,
        duration: 1.2
      }
    )
  }, [hasLoaded])

  return (
    <footer ref={footerRef}>
      <p>Exp - 01</p>
      <p>Testing - Catalog</p>
    </footer>
  );
}

export default Footer;
