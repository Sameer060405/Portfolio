'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { container, item, fadeLeft, fadeRight, viewportOnce } from '../lib/animations'

const STATS = [
  { value: '6+', label: 'Projects Built', suffix: '' },
  { value: '5+', label: 'Tech Stacks', suffix: '' },
  { value: '∞', label: 'Problems Solved', suffix: '' },
  { value: '2+', label: 'Years Learning', suffix: '' },
]

const FOCUSES = [
  {
    icon: '⬡',
    label: 'Full-Stack Development',
    desc: 'End-to-end apps with React, Node.js, and modern web APIs — pixel-perfect UIs to scalable REST backends.',
    color: '#FF4500',
  },
  {
    icon: '◈',
    label: 'AI Systems & LLMs',
    desc: 'Multi-agent pipelines, LLM integration (LLaMA, Gemini, Groq), and production-grade AI workflows.',
    color: '#FF6B35',
  },
  {
    icon: '◎',
    label: 'Real-Time Systems',
    desc: 'Low-latency systems with WebRTC, Socket.io, and Redis — live data streams with minimal overhead.',
    color: '#CC3700',
  },
  {
    icon: '⬖',
    label: 'Scalable Architecture',
    desc: 'Docker, FastAPI microservices, and data pipelines designed to handle real-world volume and growth.',
    color: '#FF4500',
  },
]

function StatCard({ value, label, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [displayed, setDisplayed] = useState('0')

  useEffect(() => {
    if (!inView) return
    if (value === '∞') { setDisplayed('∞'); return }
    const num = parseInt(value)
    const suffix = value.replace(num, '')
    const duration = 1400
    const start = Date.now()
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplayed(Math.round(eased * num) + suffix)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <motion.div
      ref={ref}
      variants={item}
      className="glass border-glow rounded-xl p-5 text-center group hover:bg-orange/[0.04] transition-colors duration-300"
    >
      <div
        className="font-heading font-bold text-3xl mb-1 transition-all duration-300 group-hover:scale-110"
        style={{ color: '#FF4500', textShadow: '0 0 20px rgba(255,69,0,0.4)' }}
      >
        {displayed}
      </div>
      <div className="text-xs text-white/35 font-mono tracking-wider uppercase">{label}</div>
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative">
      {/* Section ambient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,69,0,0.3), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="section-tag justify-center">About Me</div>
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,64px)] leading-tight">
            The story{' '}
            <span className="gradient-text">behind the code</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
          >
            <div className="space-y-5 text-white/55 leading-relaxed text-[0.97rem]">
              <p>
                I&apos;m{' '}
                <span className="font-semibold text-orange">Sameer Kaushik</span> — a
                developer at the intersection of software engineering, data science, and
                AI. I build systems that are fast, intelligent, and built to last.
              </p>
              <p>
                My work spans the full stack: clean, responsive frontends to distributed
                backends and AI pipelines. I&apos;m drawn to problems at the edge — where
                real-time constraints meet machine intelligence.
              </p>
              <p>
                Whether wiring WebRTC for sub-50ms video calls, building multi-agent LLM
                orchestrators, or designing recommendation systems over large datasets — I
                care about the craft of building things that actually work at scale.
              </p>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { label: 'GitHub', href: 'https://github.com/Sameer060405', icon: 'GH' },
                { label: 'Email', href: 'mailto:sameerkaushik933@gmail.com', icon: '@' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/sameer-kaushik', icon: 'in' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 glass-orange rounded-lg px-4 py-2.5 text-sm font-medium text-orange hover:bg-orange/10 transition-all duration-300 hover:scale-105"
                >
                  <span className="font-mono text-xs">{icon}</span>
                  {label}
                </a>
              ))}
            </div>

            {/* Stats grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={container}
              className="grid grid-cols-2 gap-3 mt-10"
            >
              {STATS.map((s, i) => (
                <StatCard key={s.label} {...s} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Right — focus cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {FOCUSES.map((f, i) => (
              <motion.div
                key={f.label}
                variants={item}
                className="glass rounded-xl p-6 group hover:border-orange/25 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,69,0,0.08)] border border-white/[0.04]"
              >
                <div
                  className="text-2xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block"
                  style={{ color: f.color }}
                >
                  {f.icon}
                </div>
                <h3
                  className="font-heading font-semibold text-sm mb-3 tracking-wide transition-colors duration-300 group-hover:text-orange"
                  style={{ color: f.color }}
                >
                  {f.label}
                </h3>
                <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
