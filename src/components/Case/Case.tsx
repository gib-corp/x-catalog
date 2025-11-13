import { useEffect } from 'react'
import gsap from 'gsap'

import "./Case.css";

const Case = ({ title, director, onHover, hasLoaded }: CaseProps) => {

  useEffect(() => {

    if (!hasLoaded) return

    const text = gsap.utils.toArray<HTMLDivElement>(".case > .container")
    const tl = gsap.timeline()

    tl.to(text, {
      y: 0,
      duration: 1.2,
      ease: 'power2.Out',
      stagger: {
        each: 0.05,
        from: "start"
      }
    })
  }, [hasLoaded])

  return (
    <p className="case" onMouseEnter={onHover}>
      <div className="container">
          <span className="title">{title}</span>
          <span className="separator">&nbsp; - &nbsp;</span>
          <span className="director">{director}</span>
      </div>
    </p>
  );
}

export default Case;