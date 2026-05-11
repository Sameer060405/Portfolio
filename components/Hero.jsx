'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const HeroOrb = dynamic(() => import('./HeroOrb'), { ssr: false })

const ROLES = [
  'Full Stack Developer',
  'AI Engineer',
  'UI/UX Enthusiast',
  'Problem Solver',
]

// Magnetic button: children move toward cursor on hover
function MagneticBtn({ children, className, onClick, href }) {
  const ref = useRef(null)
  const innerRef = useRef(null)

  const handleMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`
    }
  }, [])

  const handleLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'translate(0,0)'
      innerRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25,0.1,0.25,1)'
    }
  }, [])

  const handleEnter = useCallback(() => {
    if (innerRef.current) innerRef.current.style.transition = 'transform 0.1s linear'
  }, [])

  const Tag = href ? 'a' : 'button'
  const extraProps = href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : { onClick }

  return (
    <Tag
      ref={ref}
      {...extraProps}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={handleEnter}
      className={`relative ${className}`}
    >
      <span ref={innerRef} className="inline-flex items-center gap-2 transition-none">
        {children}
      </span>
    </Tag>
  )
}

// Floating particles — CSS-only for performance
function Particles() {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 8 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 rounded-full bg-orange"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-rise ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes particle-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          10%  { opacity: var(--op, 0.3); }
          90%  { opacity: var(--op, 0.3); }
          100% { transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? 40 : -40}px); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(id)
  }, [])

  const nameChars = 'Sameer Kaushik'.split('')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(255,69,0,0.06) 0%, transparent 70%)' }}
    >
      {/* Ambient background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[380, 520, 660].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-orange/[0.04]"
            style={{
              width: size,
              height: size,
              animation: `spin-slow ${20 + i * 8}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          />
        ))}
      </div>

      <Particles />

      {/* 3D Orb */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[340px] h-[340px] md:w-[440px] md:h-[440px]">
          {mounted && <HeroOrb />}
        </div>
      </div>

      {/* Orb glow bloom */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(255,69,0,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-3 mb-8"
        >
          <span className="h-[1px] w-8 bg-orange/60" />
          <span className="text-xs font-mono tracking-[0.3em] text-orange/80 uppercase">Available for hire</span>
          <span className="h-[1px] w-8 bg-orange/60" />
        </motion.div>

        {/* Name — char-by-char reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="font-heading font-bold text-[clamp(48px,9vw,120px)] leading-[0.95] tracking-tight"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.5 } },
            }}
          >
            {nameChars.map((ch, i) => (
              <motion.span
                key={i}
                className={ch === ' ' ? 'inline-block w-[0.3em]' : 'inline-block'}
                variants={{
                  hidden: { opacity: 0, y: 70, rotateX: -80 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] },
                  },
                }}
                style={{ transformOrigin: 'bottom center', perspective: 800 }}
              >
                {ch === ' ' ? ' ' : ch}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        {/* Rotating role */}
        <div className="h-10 overflow-hidden relative mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={roleIdx}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-heading text-lg md:text-2xl font-medium text-white/50 tracking-wide absolute left-0 right-0"
            >
              {ROLES[roleIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Sub-description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-white/35 text-sm md:text-base max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Building fast, intelligent systems at the intersection of software engineering,
          data science, and machine learning.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticBtn
            className="btn-primary rounded-xl text-sm font-semibold px-7 py-4 glow-sm"
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>View Projects</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </MagneticBtn>

          <MagneticBtn
            className="btn-ghost rounded-xl text-sm font-medium px-7 py-4"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact Me
          </MagneticBtn>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-white/20 uppercase font-mono">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-orange/40 to-transparent animate-pulse" />
      </motion.div>
    </section>
  )
}
