import React, { useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  {
    id: 'github', label: 'GitHub', handle: '@Sameer060405',
    desc: 'Projects, open-source, and code.',
    href: 'https://github.com/Sameer060405',
    accent: 'cyan', cta: '→ View Profile',
  },
  {
    id: 'linkedin', label: 'LinkedIn', handle: 'Sameer Kaushik',
    desc: 'Professional network and opportunities.',
    href: 'https://www.linkedin.com/in/sameer-kaushik-0a9aa5274/',
    accent: 'purple', cta: '→ Connect',
  },
  {
    id: 'email', label: 'Email', handle: 'sameerkaushik933@gmail.com',
    desc: 'Best for project inquiries and direct conversations.',
    href: 'mailto:sameerkaushik933@gmail.com',
    accent: 'crimson', cta: '→ Send Email',
  },
]

const A = {
  cyan:    { card: 'cut-card',                  color: '#00e5ff', dot: 'rgba(0,229,255,0.7)', btn: 'btn-cyan' },
  purple:  { card: 'cut-card cut-card-purple',  color: '#c084fc', dot: 'rgba(168,85,247,0.7)', btn: 'btn-purple' },
  crimson: { card: 'cut-card cut-card-crimson', color: '#ff6b88', dot: 'rgba(255,45,85,0.7)', btn: 'btn-crimson' },
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('sameerkaushik933@gmail.com').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="section-top" />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="section-label">
            <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
              Contact
            </h2>
            <div className="section-line" />
          </div>
        </motion.div>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex mb-14 ml-5"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border font-mono text-xs tracking-[0.12em]"
            style={{ background:'rgba(0,229,255,0.04)', borderColor:'rgba(0,229,255,0.18)', color:'#00e5ff', borderRadius:'2px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            OPEN TO FULL-TIME · FREELANCE · COLLAB
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {links.map((l, i) => {
            const a = A[l.accent]
            return (
              <motion.a
                key={l.id}
                href={l.href}
                target={l.id !== 'email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`${a.card} p-6 flex flex-col no-underline`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: a.dot, boxShadow: `0 0 5px ${a.dot}` }} />
                  <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: a.color }}>
                    {l.label.toUpperCase()}
                  </span>
                </div>

                <p className="font-semibold text-slate-300 text-sm mb-2 break-all">{l.handle}</p>
                <p className="text-[11.5px] text-slate-400 leading-relaxed mb-5 flex-1">{l.desc}</p>

                <span className="text-xs font-mono transition-colors duration-200" style={{ color: a.color }}>
                  {l.cta}
                </span>
              </motion.a>
            )
          })}
        </div>

        {/* Copy email bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="cut-card flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4"
        >
          <span className="font-mono text-sm text-slate-300">sameerkaushik933@gmail.com</span>
          <button onClick={copy} className={`btn ${copied ? 'btn-cyan-solid' : 'btn-cyan'} text-xs px-5 py-2`}>
            {copied ? <><CheckIcon size={12} />Copied!</> : <><CopyIcon size={12} />Copy Email</>}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function CopyIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
}
function CheckIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
}
