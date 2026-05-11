'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { viewportOnce } from '../lib/animations'

const TIMELINE = [
  {
    year: '2024 – Present',
    title: 'Independent Projects & Open Source',
    org: 'Self-Directed',
    type: 'Development',
    desc: 'Building production-grade projects spanning full-stack web apps, multi-agent AI systems, and data pipelines. Focus on WebRTC, LLM integration, and real-time architectures.',
    tags: ['React', 'Next.js', 'FastAPI', 'LLMs', 'WebRTC'],
  },
  {
    year: '2023 – 2024',
    title: 'AI & Machine Learning Exploration',
    org: 'Research & Learning',
    type: 'AI / ML',
    desc: 'Deep dive into LLM ecosystems — prompt engineering, RAG pipelines, and multi-agent orchestration with LangChain, Groq, and Gemini. Built recommendation systems and NLP projects.',
    tags: ['Python', 'LangChain', 'Scikit-learn', 'NLP', 'Transformers'],
  },
  {
    year: '2022 – 2023',
    title: 'Full-Stack Web Development',
    org: 'Academic & Personal',
    type: 'Engineering',
    desc: 'Mastered the MERN stack, REST API design, and database architecture. Built real-time chat applications and dynamic web platforms with authentication and deployment.',
    tags: ['Node.js', 'MongoDB', 'Express', 'React', 'Socket.io'],
  },
  {
    year: '2021 – 2022',
    title: 'Programming Foundations',
    org: 'Computer Science Curriculum',
    type: 'Education',
    desc: 'Core CS fundamentals: data structures, algorithms, OOP with Python and C++. First web projects with HTML/CSS/JavaScript. Developed problem-solving instincts through competitive programming.',
    tags: ['Python', 'C++', 'DSA', 'JavaScript', 'HTML/CSS'],
  },
]

function TimelineEntry({ entry, index, isLeft }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      {/* Content box */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50, y: 20 }}
        animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`w-full md:w-[calc(50%-2.5rem)] glass rounded-2xl p-6 border border-white/[0.04] hover:border-orange/20 transition-all duration-400 group ${
          isLeft ? 'md:mr-10' : 'md:ml-10'
        }`}
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
      >
        {/* Year badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <span
            className="text-[10px] font-mono font-bold px-3 py-1 rounded-full tracking-wider"
            style={{
              color: '#FF4500',
              background: 'rgba(255,69,0,0.1)',
              border: '1px solid rgba(255,69,0,0.25)',
            }}
          >
            {entry.year}
          </span>
          <span className="text-[10px] font-mono text-white/25 tracking-wider">{entry.type}</span>
        </div>

        <h3 className="font-heading font-semibold text-base text-white mb-1 group-hover:text-orange transition-colors duration-300">
          {entry.title}
        </h3>
        <p className="text-xs text-orange/60 font-mono mb-3">{entry.org}</p>
        <p className="text-sm text-white/40 leading-relaxed mb-4">{entry.desc}</p>

        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/30"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center dot + line connector */}
      <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2 top-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-4 h-4 rounded-full border-2 border-orange bg-bg flex-shrink-0"
          style={{ boxShadow: '0 0 16px rgba(255,69,0,0.5)' }}
        />
      </div>

      {/* Empty space on opposite side (desktop) */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,69,0,0.3), transparent)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="section-tag justify-center">Journey</div>
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,64px)] leading-tight">
            My{' '}
            <span className="gradient-text">evolution</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2">
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(255,69,0,0.35) 15%, rgba(255,69,0,0.35) 85%, transparent)',
              }}
            />
          </div>

          <div className="flex flex-col gap-10">
            {TIMELINE.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
