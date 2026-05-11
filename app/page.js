'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'

import SmoothScroll from '../components/SmoothScroll'
import ScrollProgress from '../components/ScrollProgress'
import LoadingScreen from '../components/LoadingScreen'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

// Cursor is client-only (needs window/mouse events)
const Cursor = dynamic(() => import('../components/Cursor'), { ssr: false })

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      {loaded && (
        <>
          <Cursor />
          <ScrollProgress />
          <SmoothScroll>
            <div
              className="min-h-screen"
              style={{
                background: '#050505',
                backgroundImage:
                  'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,69,0,0.05) 0%, transparent 100%)',
              }}
            >
              <Navbar />
              <main>
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Contact />
              </main>
              <Footer />
            </div>
          </SmoothScroll>
        </>
      )}
    </>
  )
}
