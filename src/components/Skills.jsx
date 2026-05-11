import React from 'react'
import { motion } from 'framer-motion'

const cats = [
  {
    id: 'frontend', label: 'Frontend', accent: 'cyan',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'HTML5 / CSS3', 'Vite'],
  },
  {
    id: 'backend', label: 'Backend', accent: 'crimson',
    skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'WebSockets', 'Socket.io'],
  },
  {
    id: 'ai', label: 'AI / ML', accent: 'purple',
    skills: ['Python', 'LLMs', 'LLaMA 3.3', 'Gemini API', 'Groq', 'NLP', 'scikit-learn', 'Whisper'],
  },
  {
    id: 'data', label: 'Data & Databases', accent: 'cyan',
    skills: ['MongoDB', 'Redis', 'SQL', 'Pandas', 'NumPy', 'ETL Pipelines'],
  },
  {
    id: 'infra', label: 'Dev Tools & Infra', accent: 'crimson',
    skills: ['Docker', 'Git / GitHub', 'FFmpeg', 'Vercel', 'WebRTC', 'JWT', 'Linux'],
  },
  {
    id: 'concepts', label: 'Concepts', accent: 'purple',
    skills: ['Multi-Agent Systems', 'Microservices', 'Real-Time Systems', 'Vector Embeddings', 'CI/CD'],
  },
]

const A = {
  cyan:    { card: 'cut-card',                  label: '#e8a820', badge: 'badge-c', dot: 'rgba(200,134,10,0.6)' },
  crimson: { card: 'cut-card cut-card-crimson', label: '#e8823a', badge: 'badge-r', dot: 'rgba(224,90,32,0.6)' },
  purple:  { card: 'cut-card cut-card-purple',  label: '#c084fc', badge: 'badge-p', dot: 'rgba(155,77,202,0.6)' },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative stone-section">
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
              Skills
            </h2>
            <div className="section-line" />
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cats.map((cat, i) => {
            const a = A[cat.accent]
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
                className={`${a.card} p-6`}
              >
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: a.dot, boxShadow: `0 0 6px ${a.dot}` }}
                  />
                  <h3
                    className="font-orbitron font-semibold text-xs tracking-[0.18em]"
                    style={{ color: a.label }}
                  >
                    {cat.label.toUpperCase()}
                  </h3>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(s => (
                    <span key={s} className={`badge ${a.badge}`}>{s}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
