import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import "./Nav.css";

function Nav({ hasLoaded }: NavProps) {

  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!hasLoaded || !navRef.current) return

    const tl = gsap.timeline()

    tl.to(navRef.current, {
        opacity: 1,
        duration: 1.2
    })
  }, [hasLoaded])

  return (
    <nav ref={navRef}>
      <div className="logo">
        <a href="#">X-Lab</a>
      </div>
      <div className="links">
        <a href="https://github.com/gib-corp/x-catalog" target="_blank">Github</a>
      </div>
    </nav>
  );
}

export default Nav;
