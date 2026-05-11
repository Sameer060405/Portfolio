'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { container, item, viewportOnce } from '../lib/animations'

const CATEGORIES = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '◱',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript', 'HTML5 / CSS3', 'Vite', 'Three.js'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: '⬡',
    skills: ['Node.js', 'Express', 'FastAPI', 'Python', 'REST APIs', 'WebSockets', 'Socket.io', 'Flask'],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    icon: '◈',
    skills: ['LLMs', 'LLaMA 3.3', 'Gemini API', 'Groq', 'LangChain', 'NLP', 'scikit-learn', 'Whisper', 'TF-IDF'],
  },
  {
    id: 'data',
    label: 'Data & DBs',
    icon: '◎',
    skills: ['MongoDB', 'Redis', 'PostgreSQL', 'SQL', 'Pandas', 'NumPy', 'ETL Pipelines', 'Vector DBs'],
  },
  {
    id: 'infra',
    label: 'DevOps',
    icon: '⬖',
    skills: ['Docker', 'Git / GitHub', 'Vercel', 'Linux', 'CI/CD', 'WebRTC', 'JWT', 'FFmpeg'],
  },
  {
    id: 'concepts',
    label: 'Concepts',
    icon: '◇',
    skills: ['Multi-Agent Systems', 'Microservices', 'Real-Time Systems', 'Vector Embeddings', 'System Design'],
  },
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend')
  const active = CATEGORIES.find((c) => c.id === activeTab)

  return (
    <section id="skills" className="py-28 px-6 relative">
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
          <div className="section-tag justify-center">Tech Arsenal</div>
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,64px)] leading-tight">
            Tools I{' '}
            <span className="gradient-text">wield</span>
          </h2>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {CATEGORIES.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === id
                  ? 'text-white'
                  : 'text-white/35 hover:text-white/60'
              }`}
            >
              {activeTab === id && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 rounded-xl glass-orange border border-orange/25"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span className="relative z-10 text-orange/70">{icon}</span>
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="glass rounded-2xl p-8 md:p-12 border border-white/[0.04]"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl text-orange">{active?.icon}</span>
              <h3 className="font-heading font-semibold text-xl text-white/80">
                {active?.label}
              </h3>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              {active?.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  className="skill-badge"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* All categories grid - compact overview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={container}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8"
        >
          {CATEGORIES.filter((c) => c.id !== activeTab).map((cat) => (
            <motion.button
              key={cat.id}
              variants={item}
              onClick={() => setActiveTab(cat.id)}
              className="glass rounded-xl p-5 text-left hover:border-orange/20 transition-all duration-300 border border-white/[0.03] group"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-orange/60 group-hover:text-orange transition-colors">{cat.icon}</span>
                <span className="text-sm font-medium text-white/40 group-hover:text-white/70 transition-colors">
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/25 font-mono"
                  >
                    {s}
                  </span>
                ))}
                {cat.skills.length > 4 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange/[0.06] text-orange/40 font-mono">
                    +{cat.skills.length - 4}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
