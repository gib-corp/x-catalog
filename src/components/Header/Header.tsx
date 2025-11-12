import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import "./Header.css";

const Header = ( { hasLoaded }: HeaderProps ) => {

    const headerRef = useRef<HTMLElement>(null)

    useEffect(() => {

        if (!hasLoaded) return;

        const tl = gsap.timeline()

        tl.to(headerRef.current, {
            opacity: 1,
            duration: 1.2
        })
    }, [hasLoaded])

    return(
        <header ref={headerRef}>
            [&nbsp;&nbsp;Selected trailers&nbsp;&nbsp;]
        </header>
    )
}

export default Header;