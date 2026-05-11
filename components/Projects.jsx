'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { container, item, viewportOnce } from '../lib/animations'

const PROJECTS = [
  {
    id: 1,
    title: 'NexaCall',
    subtitle: 'Real-Time Video Platform',
    tag: 'LIVE',
    tagColor: '#FF4500',
    desc: 'Full-duplex P2P video calling with WebRTC & JWT auth. Reduced call latency by 20–50% vs baseline with optimized signaling via Socket.io.',
    tech: ['WebRTC', 'Socket.io', 'React', 'Node.js', 'MongoDB', 'JWT'],
    live: 'https://nexacall-29di.vercel.app/',
    github: 'https://github.com/Sameer060405/Nexacall',
    gradient: 'from-orange/20 to-transparent',
  },
  {
    id: 2,
    title: 'DevFix',
    subtitle: 'AI Debugging Assistant',
    tag: 'AI',
    tagColor: '#FF6B35',
    desc: 'Browser IDE powered by LLaMA 3.3 via Groq for real-time error diagnosis. Redis-backed session context for multi-turn debugging conversations.',
    tech: ['Monaco Editor', 'LLaMA 3.3', 'Groq', 'Redis', 'FastAPI', 'React'],
    live: null,
    github: 'https://github.com/Sameer060405/DevFix',
    gradient: 'from-orange-dim/20 to-transparent',
  },
  {
    id: 3,
    title: 'Stoxly',
    subtitle: 'AI Trading Simulator',
    tag: 'LIVE',
    tagColor: '#FF4500',
    desc: 'Autonomous AI trading agent with interactive candlestick charts and paper trading mode. Real-time stock data via REST API backend.',
    tech: ['React', 'Python', 'FastAPI', 'AI Agent', 'Chart.js'],
    live: 'https://stoxly-frontend.vercel.app/',
    github: 'https://github.com/Sameer060405/Stoxly',
    gradient: 'from-orange/20 to-transparent',
  },
  {
    id: 4,
    title: 'Video Automation',
    subtitle: 'Multi-Agent Content Pipeline',
    tag: 'AI',
    tagColor: '#CC3700',
    desc: 'End-to-end multi-agent pipeline generating short-form videos. Gemini + Groq for scripts, FFmpeg for stitching, Whisper for auto-subtitles.',
    tech: ['FastAPI', 'Gemini', 'Groq', 'FFmpeg', 'Whisper', 'Python'],
    live: null,
    github: 'https://github.com/Sameer060405/yt-insta-short-video-automation',
    gradient: 'from-orange-dim/20 to-transparent',
  },
  {
    id: 5,
    title: 'Recommendation Engine',
    subtitle: 'ML Movie Recommender',
    tag: 'ML',
    tagColor: '#FF6B35',
    desc: 'Content-based filtering over 10K+ movies using TF-IDF vectors and cosine similarity. Sub-second query response with efficient vector indexing.',
    tech: ['Python', 'scikit-learn', 'TF-IDF', 'Cosine Similarity', 'Flask'],
    live: null,
    github: 'https://github.com/Sameer060405/Movie-Recommendation-System-10K',
    gradient: 'from-orange/15 to-transparent',
  },
  {
    id: 6,
    title: 'Review Scraper',
    subtitle: 'Automated Data Pipeline',
    tag: 'DATA',
    tagColor: '#CC3700',
    desc: 'Selenium-driven scraper with anti-bot mitigations and structured CSV/JSON output. Pluggable architecture for swapping data sources with minimal changes.',
    tech: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'WebDriver'],
    live: null,
    github: 'https://github.com/Sameer060405/Myntra-Review-Scrapper',
    gradient: 'from-orange-dim/15 to-transparent',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative glass rounded-2xl p-7 border border-white/[0.04] overflow-hidden group transition-all duration-500 hover:border-orange/20"
      style={{
        boxShadow: isHovered
          ? '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,69,0,0.08)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Mouse-follow glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, rgba(255,69,0,0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Index number */}
      <div className="absolute top-6 right-6 font-mono text-[11px] text-white/10 font-bold">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Tag */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md tracking-wider"
          style={{
            color: project.tagColor,
            background: `${project.tagColor}18`,
            border: `1px solid ${project.tagColor}40`,
          }}
        >
          {project.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-heading font-bold text-xl mb-1 text-white group-hover:text-orange transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-xs text-white/30 font-mono mb-4">{project.subtitle}</p>

      {/* Description */}
      <p className="text-sm text-white/45 leading-relaxed mb-6">{project.desc}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/35 hover:border-orange/30 hover:text-orange/60 transition-all duration-200"
          >
            {t}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 pt-4 border-t border-white/[0.05]">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-orange hover:text-orange-bright transition-colors group/btn"
          >
            <span className="w-5 h-5 rounded-full bg-orange/20 flex items-center justify-center group-hover/btn:bg-orange/30 transition-colors">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15,3 21,3 21,9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </span>
            Live Demo
          </a>
        )}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white transition-colors group/btn"
        >
          <span className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center group-hover/btn:bg-white/10 transition-colors">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </span>
          GitHub
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 relative">
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
          <div className="section-tag justify-center">Selected Work</div>
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,64px)] leading-tight">
            Things I&apos;ve{' '}
            <span className="gradient-text">built</span>
          </h2>
          <p className="text-white/30 text-sm mt-4 max-w-md mx-auto">
            A selection of projects that span full-stack, AI, and data engineering.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/Sameer060405"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 glass-orange rounded-xl px-8 py-4 text-sm font-semibold text-orange hover:bg-orange/10 transition-all duration-300 hover:scale-105"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
