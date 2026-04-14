import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Playground', href: '#playground' },
  { label: 'Contact',    href: '#contact' },
]

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobile]   = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#060609]/92 backdrop-blur-md border-b border-[rgba(0,229,255,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* ── Emblem Logo ── */}
        <a
          href="#hero"
          onClick={e => { e.preventDefault(); scrollTo('#hero') }}
          className="flex items-center gap-2.5 group"
          aria-label="Home"
        >
          {/* Hexagonal SVG emblem */}
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.7)]">
            <polygon
              points="16,1 30,9 30,27 16,35 2,27 2,9"
              fill="none"
              stroke="rgba(0,229,255,0.6)"
              strokeWidth="1.2"
            />
            <polygon
              points="16,6 26,12 26,24 16,30 6,24 6,12"
              fill="rgba(0,229,255,0.06)"
              stroke="rgba(0,229,255,0.25)"
              strokeWidth="0.8"
            />
            <text
              x="16" y="22"
              textAnchor="middle"
              fontFamily="Orbitron, sans-serif"
              fontWeight="800"
              fontSize="10"
              fill="#00e5ff"
              letterSpacing="0.5"
            >SK</text>
          </svg>
          <div className="hidden sm:block">
            <p className="font-orbitron font-bold text-sm text-white leading-none tracking-wider">SAMEER</p>
            <p className="font-mono text-[10px] text-[rgba(0,229,255,0.55)] tracking-[0.18em] leading-none mt-0.5">KAUSHIK</p>
          </div>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={e => { e.preventDefault(); scrollTo(l.href) }}
              className="nav-link"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/Sameer060405"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cyan text-[0.7rem] px-4 py-2 ml-2"
          >
            <GithubIcon size={13} />
            GitHub
          </a>
        </div>

        {/* ── Hamburger ── */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 cursor-pointer"
          onClick={() => setMobile(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="block h-px bg-[#00e5ff] transition-all duration-300"
              style={{
                width: i === 1 ? (mobileOpen ? '24px' : '18px') : '24px',
                transform: i === 0 ? (mobileOpen ? 'rotate(45deg) translateY(6px)' : '') :
                           i === 2 ? (mobileOpen ? 'rotate(-45deg) translateY(-6px)' : '') : '',
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-[#060609]/96 backdrop-blur-md border-b border-[rgba(0,229,255,0.08)]"
          >
            <div className="px-6 py-5 flex flex-col gap-5">
              {NAV.map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={e => { e.preventDefault(); setMobile(false); scrollTo(l.href) }}
                  className="nav-link text-slate-300 hover:text-[#00e5ff] font-medium text-sm tracking-widest uppercase"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://github.com/Sameer060405"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-cyan text-xs self-start mt-1"
              >
                <GithubIcon size={13} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}
