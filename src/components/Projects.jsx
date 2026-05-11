import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ALL = 'All'
const CATS = [ALL, 'Full Stack', 'AI / ML', 'Data']

const projects = [
  {
    id: 1,
    title: 'NexaCall',
    subtitle: 'Real-Time Video Calling',
    category: 'Full Stack',
    tag: 'LIVE',
    accent: 'cyan',
    tech: ['WebRTC', 'Socket.io', 'React', 'Node.js', 'MongoDB', 'JWT'],
    summary: 'Full-duplex P2P video calling with WebRTC & JWT auth — reduced call latency by 20–50%.',
    bullets: [
      'Full-duplex video calling powered by WebRTC peer connections',
      'Real-time signaling via Socket.io for instant setup',
      'JWT-based auth with secure session management',
      'MongoDB backend for user data and call history',
      'Reduced end-to-end latency by 20–50% vs baseline',
    ],
    live: 'https://nexacall-29di.vercel.app/',
    github: 'https://github.com/Sameer060405/Nexacall',
  },
  {
    id: 2,
    title: 'DevFix',
    subtitle: 'AI Debugging Assistant',
    category: 'AI / ML',
    tag: 'AI',
    accent: 'crimson',
    tech: ['Monaco Editor', 'LLaMA 3.3', 'Groq', 'Redis', 'FastAPI', 'React'],
    summary: 'Browser IDE with AI-powered error diagnosis via LLaMA 3.3 and Redis session context.',
    bullets: [
      'Monaco Editor (same core as VS Code) in-browser IDE',
      'LLaMA 3.3 via Groq for error diagnosis and fix suggestions',
      'Redis-backed session context for multi-turn debugging',
      'Analytics dashboard tracking error patterns over time',
      'Supports JS, Python, and TypeScript environments',
    ],
    live: null,
    github: 'https://github.com/Sameer060405/DevFix',
  },
  {
    id: 3,
    title: 'Stoxly',
    subtitle: 'AI Trading Simulator',
    category: 'Full Stack',
    tag: 'LIVE',
    accent: 'purple',
    tech: ['React', 'Python', 'FastAPI', 'AI Agent', 'Chart.js', 'REST API'],
    summary: 'Autonomous AI trading agent with interactive charts and paper trading mode.',
    bullets: [
      'Autonomous AI agent that simulates portfolio decisions',
      'Interactive candlestick + line charts with live price simulation',
      'REST API backend powering real-time stock data feeds',
      'Risk analysis engine with position sizing recommendations',
      'Paper trading — no real money, full real experience',
    ],
    live: 'https://stoxly-frontend.vercel.app/',
    github: 'https://github.com/Sameer060405/Stoxly',
  },
  {
    id: 4,
    title: 'Video Automation',
    subtitle: 'Multi-Agent Content Pipeline',
    category: 'AI / ML',
    tag: 'AI',
    accent: 'cyan',
    tech: ['FastAPI', 'Gemini', 'Groq', 'FFmpeg', 'Whisper', 'Python'],
    summary: 'End-to-end multi-agent pipeline generating short-form videos with Gemini, FFmpeg & Whisper.',
    bullets: [
      'Multi-agent orchestration for automated video generation',
      'Gemini + Groq LLMs for script writing and content structuring',
      'FFmpeg for video stitching, transitions, post-processing',
      'Whisper for automatic subtitle generation and voice sync',
      'Outputs YouTube Shorts / Instagram Reels autonomously',
    ],
    live: null,
    github: 'https://github.com/Sameer060405/yt-insta-short-video-automation',
  },
  {
    id: 5,
    title: 'Recommendation Engine',
    subtitle: 'ML Movie Recommender',
    category: 'AI / ML',
    tag: 'ML',
    accent: 'purple',
    tech: ['Python', 'scikit-learn', 'TF-IDF', 'Cosine Similarity', 'Pandas', 'Flask'],
    summary: 'Content-based filtering over 10K+ movies using TF-IDF vectors and cosine similarity.',
    bullets: [
      'Content-based filtering over a 10K+ movie dataset',
      'Cosine similarity on TF-IDF vectorized feature space',
      'Efficient vector indexing for sub-second query response',
      'Genre, cast, and keyword-aware similarity scoring',
      'Clean REST API for integration with any frontend',
    ],
    live: null,
    github: 'https://github.com/Sameer060405/Movie-Recommendation-System-10K',
  },
  {
    id: 6,
    title: 'Review Scraper',
    subtitle: 'Automated Data Pipeline',
    category: 'Data',
    tag: 'DATA',
    accent: 'crimson',
    tech: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'WebDriver'],
    summary: 'Selenium-driven scraper for Myntra reviews with anti-bot mitigations and structured output.',
    bullets: [
      'Selenium browser automation for large-scale data extraction',
      'Pagination handling across thousands of product pages',
      'Structured CSV / JSON output for downstream ML pipelines',
      'Anti-bot mitigations: delays, user-agent rotation',
      'Pluggable architecture — swap targets with minimal changes',
    ],
    live: null,
    github: 'https://github.com/Sameer060405/Myntra-Review-Scrapper',
  },
]

const A = {
  cyan: {
    card: 'cut-card',
    tag: { bg: 'rgba(200,134,10,0.1)', color: '#e8a820', border: 'rgba(200,134,10,0.35)' },
    bullet: '#e8a820',
    badge: 'badge-c',
    back: 'rgba(200,134,10,0.25)',
    btn: 'btn-cyan',
  },
  crimson: {
    card: 'cut-card cut-card-crimson',
    tag: { bg: 'rgba(224,90,32,0.1)', color: '#e8823a', border: 'rgba(224,90,32,0.35)' },
    bullet: '#e8823a',
    badge: 'badge-r',
    back: 'rgba(224,90,32,0.25)',
    btn: 'btn-crimson',
  },
  purple: {
    card: 'cut-card cut-card-purple',
    tag: { bg: 'rgba(155,77,202,0.1)', color: '#c084fc', border: 'rgba(155,77,202,0.35)' },
    bullet: '#c084fc',
    badge: 'badge-p',
    back: 'rgba(155,77,202,0.25)',
    btn: 'btn-purple',
  },
}

/* Category badge styles */
const CAT_STYLE = {
  'Full Stack': { color: '#e8a820', bg: 'rgba(200,134,10,0.08)', border: 'rgba(200,134,10,0.22)' },
  'AI / ML':   { color: '#c084fc', bg: 'rgba(155,77,202,0.08)', border: 'rgba(155,77,202,0.22)' },
  'Data':      { color: '#e8823a', bg: 'rgba(224,90,32,0.08)',  border: 'rgba(224,90,32,0.22)'  },
}

function Card({ project }) {
  const [flipped, setFlipped] = useState(false)
  const a = A[project.accent]
  const cs = CAT_STYLE[project.category]

  return (
    <div
      className="flip-container"
      style={{ height: '400px', cursor: 'pointer' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        className="flip-inner"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* ── FRONT ── */}
        <div className={`flip-front ${a.card} p-6 flex flex-col`}>
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-[1rem] leading-snug">{project.title}</h3>
              <p className="text-[11px] font-mono mt-0.5 text-[#3a4a5a]">{project.subtitle}</p>
            </div>
            <span
              className="text-[10px] font-mono font-bold px-2 py-1 ml-2 flex-shrink-0"
              style={{ background: a.tag.bg, color: a.tag.color, border: `1px solid ${a.tag.border}`, borderRadius: '2px' }}
            >
              {project.tag}
            </span>
          </div>

          {/* Category pill */}
          <span
            className="self-start text-[10px] font-semibold px-2.5 py-0.5 mb-4"
            style={{ background: cs.bg, color: cs.color, border: `1px solid ${cs.border}`, borderRadius: '20px' }}
          >
            {project.category}
          </span>

          {/* Summary */}
          <p className="text-slate-400 text-[12.5px] leading-relaxed mb-5 flex-1">
            {project.summary}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map(t => (
              <span key={t} className={`badge ${a.badge}`}>{t}</span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#2a3340] tracking-wider">TAP FOR DETAILS</span>
            <span style={{ color: a.tag.color }} className="text-sm">↺</span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-back flex flex-col p-6"
          style={{ background: 'rgba(11,13,28,0.97)', border: `1px solid ${a.back}`, borderRadius: '2px' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm" style={{ color: a.tag.color }}>{project.title}</h3>
            <span className="text-[10px] font-mono text-[#2a3340] tracking-wider">TAP TO FLIP</span>
          </div>

          <ul className="space-y-2.5 flex-1 mb-5">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5 text-[12px] text-[#5a6a7a] leading-relaxed">
                <span className="mt-[3px] flex-shrink-0 text-[9px]" style={{ color: a.bullet }}>▸</span>
                <span className="text-slate-300">{b}</span>
              </li>
            ))}
          </ul>

          <div
            className="flex items-center gap-3 pt-3"
            style={{ borderTop: `1px solid ${a.back}` }}
          >
            {project.live && (
              <a
                href={project.live}
                target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className={`btn ${a.btn} text-[0.7rem] px-4 py-2`}
              >
                <ExternalIcon size={11} /> Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="btn btn-ghost text-[0.7rem] px-4 py-2"
            >
              <GithubIcon size={11} /> GitHub
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* Count per category */
function counts() {
  const c = {}
  CATS.forEach(k => { c[k] = k === ALL ? projects.length : projects.filter(p => p.category === k).length })
  return c
}
const CNT = counts()

export default function Projects() {
  const [filter, setFilter] = useState(ALL)

  const visible = filter === ALL ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="py-24 px-6 relative stone-section">
      <div className="section-top" />
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-label">
            <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">Projects</h2>
            <div className="section-line" />
          </div>
          <p className="text-[#3a4a5a] text-sm mt-2 ml-5">Tap any card to flip and see full details</p>
        </motion.div>

        {/* ── Category filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-10 ml-5"
        >
          {CATS.map(cat => {
            const active = filter === cat
            const cs = cat === ALL ? null : CAT_STYLE[cat]
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className="relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  borderRadius: '2px',
                  background: active
                    ? (cat === ALL ? 'rgba(200,134,10,0.12)' : cs.bg)
                    : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${active
                    ? (cat === ALL ? 'rgba(200,134,10,0.45)' : cs.border.replace('0.22)', '0.5)'))
                    : 'rgba(200,134,10,0.08)'}`,
                  color: active
                    ? (cat === ALL ? '#e8a820' : cs.color)
                    : '#4a3a20',
                  boxShadow: active
                    ? `0 0 14px ${cat === ALL ? 'rgba(200,134,10,0.15)' : cs.bg}`
                    : 'none',
                }}
              >
                {cat}
                <span
                  className="text-[10px] px-1.5 py-0.5 font-mono"
                  style={{
                    background: active ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '3px',
                    color: active ? 'inherit' : '#3a4a5a',
                  }}
                >
                  {CNT[cat]}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Cards grid with AnimatePresence ── */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {visible.map(p => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <Card project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div className="text-center py-20 text-[#3a4a5a] font-mono text-sm">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  )
}

function ExternalIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
}
function GithubIcon({ size = 12 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
}
