import React from 'react'
import { motion } from 'framer-motion'

const focuses = [
  {
    label: 'Full-Stack Dev',
    desc: 'End-to-end apps with React, Node.js, and modern web APIs — pixel-perfect UIs to scalable REST backends.',
    accent: 'cyan',
  },
  {
    label: 'AI Systems & LLMs',
    desc: 'Multi-agent pipelines, LLM integration (LLaMA, Gemini, Groq), and production-grade AI workflows.',
    accent: 'crimson',
  },
  {
    label: 'Real-Time Apps',
    desc: 'Low-latency systems with WebRTC, Socket.io, and Redis — live data streams with minimal overhead.',
    accent: 'purple',
  },
  {
    label: 'Scalable Architecture',
    desc: 'Docker, FastAPI microservices, and data pipelines designed to handle real-world volume and growth.',
    accent: 'cyan',
  },
]

const A = {
  cyan:    { card: 'cut-card',                  label: '#e8a820', dot: 'rgba(200,134,10,0.7)' },
  crimson: { card: 'cut-card cut-card-crimson', label: '#e8823a', dot: 'rgba(224,90,32,0.7)' },
  purple:  { card: 'cut-card cut-card-purple',  label: '#c084fc', dot: 'rgba(155,77,202,0.7)' },
}

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative stone-section">
      <div className="section-top" />
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="section-label">
            <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
              About
            </h2>
            <div className="section-line" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="space-y-4 text-slate-300 leading-relaxed text-[0.95rem]">
              <p>
                I'm <span className="font-semibold" style={{ color: '#e8a820' }}>Sameer Kaushik</span> — a developer
                at the intersection of software engineering, data science, and AI. I build systems
                that are fast, intelligent, and built to last.
              </p>
              <p>
                My work spans the full stack: clean, responsive frontends to distributed backends
                and AI pipelines. I'm drawn to problems at the edge — where real-time constraints
                meet machine intelligence.
              </p>
              <p>
                Whether wiring WebRTC for sub-50ms video, building multi-agent LLM orchestrators,
                or designing recommendation systems over large datasets — I care about the craft
                of building things that actually work at scale.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                { v: '6+', l: 'Projects' },
                { v: '5+', l: 'Tech Stacks' },
                { v: '∞',  l: 'Problems Solved' },
              ].map(s => (
                <div
                  key={s.l}
                  className="cut-card p-4 text-center"
                >
                  <div className="font-orbitron font-black text-2xl mb-1"
                    style={{ color: '#e8a820', textShadow: '0 0 12px rgba(200,134,10,0.5)' }}>
                    {s.v}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono tracking-wider">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Focus cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {focuses.map((f, i) => {
              const a = A[f.accent]
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`${a.card} p-5`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: a.dot, boxShadow: `0 0 5px ${a.dot}` }} />
                    <h3 className="font-orbitron font-semibold text-[11px] tracking-[0.12em]"
                      style={{ color: a.label }}>
                      {f.label.toUpperCase()}
                    </h3>
                  </div>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
