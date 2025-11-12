import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import "./Loading.css"

const Loading = ({ onLoaded }: LoadingProps) => {

    const container = useRef<HTMLDivElement>(null)
    const load = useRef<HTMLDivElement>(null)
    const bar = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (load.current && bar.current && container.current) {
            const tl = gsap.timeline({ delay: 0.5, onComplete: onLoaded })

            tl.to(
                bar.current,
                {
                    width:'100%',
                    duration: 1,
                    ease: 'power2.out'
                }
            ).to(
                load.current,
                {
                    width:'100%',
                    duration: .6,
                    ease: 'power2.inOut'
                }, .2
            ).call( () => {
                    if (container.current) {
                        container.current.style.justifyContent = 'flex-end'
                    }
                }
            ).to(
                load.current,
                {
                    width:'0%',
                    duration: .6,
                    ease: 'power2.out'
                }
            ).to(
                bar.current,
                {
                    width:'0%',
                    duration: .7,
                    ease: 'power2.out'
                }, "-=.5"
            )
        }
    }, [])

    return (
        <div className="loader">
            <div ref={container} className="container">
                <div ref={load} className="load"></div>
                <div ref={bar} className="bar"></div>   
            </div>   
        </div>
    )
}

export default Loading