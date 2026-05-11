import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TYPED_WORDS = [
  'Software Developer',
  'Data Scientist',
  'AI/ML Engineer',
  'Systems Architect',
]

function useTypewriter(words, speed = 85) {
  const [text, setText]    = useState('')
  const [idx, setIdx]      = useState(0)
  const [deleting, setDel] = useState(false)
  const [pause, setPause]  = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => { setDel(true); setPause(false) }, 1600)
      return () => clearTimeout(t)
    }
    const word = words[idx % words.length]
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1)
        setText(next)
        if (next === word) setPause(true)
      } else {
        const next = word.slice(0, text.length - 1)
        setText(next)
        if (next === '') { setDel(false); setIdx(i => i + 1) }
      }
    }, deleting ? 42 : speed)
    return () => clearTimeout(t)
  }, [text, deleting, idx, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(TYPED_WORDS)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Dark vignette overlay — lets the 3D corridor show through */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(6,4,2,0.15) 0%, rgba(6,4,2,0.7) 100%)',
        zIndex: 0,
      }} />

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, transparent, rgba(6,4,2,0.95))',
        zIndex: 1,
      }} />

      {/* ── Ancient corner bracket decorations ── */}
      {[
        'top-[76px] left-6  border-t border-l',
        'top-[76px] right-6 border-t border-r',
        'bottom-12  left-6  border-b border-l',
        'bottom-12  right-6 border-b border-r',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-10 h-10 ${cls}`} style={{
          borderColor: 'rgba(200,134,10,0.4)',
          zIndex: 2,
        }} />
      ))}

      {/* ── Horizontal rune lines ── */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '76px', zIndex: 2 }}>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 5%, rgba(200,134,10,0.12) 25%, rgba(200,134,10,0.12) 75%, transparent 95%)' }} />
      </div>
      <div className="absolute left-0 right-0 pointer-events-none bottom-12" style={{ zIndex: 2 }}>
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent 5%, rgba(200,134,10,0.12) 25%, rgba(200,134,10,0.12) 75%, transparent 95%)' }} />
      </div>

      <div className="relative max-w-4xl mx-auto" style={{ zIndex: 3 }}>

        {/* Status rune */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 border font-mono text-xs tracking-[0.15em]"
          style={{
            background: 'rgba(200,134,10,0.08)',
            borderColor: 'rgba(200,134,10,0.4)',
            color: '#e8a820',
            borderRadius: '2px',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8860a] animate-pulse" style={{ boxShadow: '0 0 6px rgba(200,134,10,0.8)' }} />
          AVAILABLE · OPEN TO WORK
        </motion.div>

        {/* ── Name carved in stone ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <h1
            className="font-orbitron font-black leading-none mb-1 select-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '0.04em' }}
          >
            <span
              className="glitch-wrap torch-flicker"
              data-text="SAMEER"
              style={{ color: '#ffffff', display: 'inline-block' }}
            >
              SAMEER
            </span>
          </h1>
          <h1
            className="font-orbitron font-black leading-none mb-8"
            style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '0.04em' }}
          >
            <span className="gradient-text">KAUSHIK</span>
          </h1>
        </motion.div>

        {/* ── Typewriter role ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6 h-9 flex items-center justify-center"
        >
          <span className="font-mono text-base md:text-xl tracking-wide" style={{ color: '#8a7a5a' }}>
            <span style={{ color: '#e8a820', fontWeight: 700, textShadow: '0 0 16px rgba(200,134,10,0.6)' }}>{typed}</span>
            <span className="cursor" />
          </span>
        </motion.div>

        {/* ── Tagline ── */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="max-w-lg mx-auto mb-12 text-base md:text-lg leading-relaxed font-light"
          style={{ color: '#8a7a5a' }}
        >
          Building scalable systems, AI agents, and real-time applications.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#projects"
            onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="btn btn-cyan-solid text-[0.8rem] tracking-wide px-7 py-3 font-semibold">
            <TargetIcon size={14} /> VIEW PROJECTS
          </a>
          <a href="https://github.com/Sameer060405" target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost text-[0.8rem] tracking-wide px-7 py-3 font-semibold">
            <GithubIcon size={14} /> GITHUB
          </a>
          <a href="https://www.linkedin.com/in/sameer-kaushik-0a9aa5274/" target="_blank" rel="noopener noreferrer"
            className="btn btn-purple text-[0.8rem] tracking-wide px-7 py-3 font-semibold">
            <LinkedinIcon size={14} /> LINKEDIN
          </a>
        </motion.div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3 }}
      >
        <span className="text-[10px] tracking-[0.3em] font-mono" style={{ color: 'rgba(200,134,10,0.4)' }}>DESCEND</span>
        <motion.div
          animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg, rgba(200,134,10,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  )
}

function TargetIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
    </svg>
  )
}
function GithubIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}
function LinkedinIcon({ size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
}
