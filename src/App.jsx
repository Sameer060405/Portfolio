import React from 'react'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Playground from './components/Playground'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 font-inter" style={{ background: '#0c0e1c' }}>
      {/* Fixed animated background — sits behind everything */}
      <Background />

      {/* All page content sits above the background */}
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
