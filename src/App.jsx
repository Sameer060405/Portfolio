import React, { useRef, useEffect } from 'react'
import TempleScene from './components/TempleScene'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Playground from './components/Playground'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <div className="min-h-screen text-slate-200 font-inter" style={{ background: 'transparent' }}>
      <TempleScene mouseRef={mouseRef} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Playground />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
