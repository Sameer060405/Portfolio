'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { container, item, fadeLeft, fadeRight, viewportOnce } from '../lib/animations'

const SOCIALS = [
  {
    label: 'GitHub',
    handle: '@Sameer060405',
    href: 'https://github.com/Sameer060405',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    handle: 'sameerkaushik933@gmail.com',
    href: 'mailto:sameerkaushik933@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    handle: 'Sameer Kaushik',
    href: 'https://linkedin.com/in/sameer-kaushik',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send delay — replace with real API (EmailJS, Resend, etc.)
    await new Promise((r) => setTimeout(r, 1400))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,69,0,0.3), transparent)' }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,69,0,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
          className="mb-20 text-center"
        >
          <div className="section-tag justify-center">Get In Touch</div>
          <h2 className="font-heading font-bold text-[clamp(36px,5vw,64px)] leading-tight">
            Let&apos;s{' '}
            <span className="gradient-text">build together</span>
          </h2>
          <p className="text-white/30 text-sm mt-4 max-w-sm mx-auto">
            Open to opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeLeft}
          >
            <p className="text-white/50 leading-relaxed mb-10">
              Whether you have a project in mind, want to discuss AI, or just want to
              say hello — my inbox is always open. I&apos;ll try to respond within 24 hours.
            </p>

            <div className="space-y-4">
              {SOCIALS.map(({ label, handle, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/[0.04] hover:border-orange/25 transition-all duration-300 group hover:bg-orange/[0.03]"
                >
                  <div className="w-10 h-10 rounded-xl glass-orange flex items-center justify-center text-orange flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-white/30 font-mono mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-white/70 group-hover:text-orange transition-colors duration-300">
                      {handle}
                    </div>
                  </div>
                  <div className="ml-auto text-white/20 group-hover:text-orange/50 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeRight}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 border border-white/[0.04] space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-white/30 font-mono mb-2 block tracking-wider">NAME</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="form-input"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-xs text-white/30 font-mono mb-2 block tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/30 font-mono mb-2 block tracking-wider">MESSAGE</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project or idea..."
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full btn-primary rounded-xl justify-center py-4 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'idle' && (
                  <>
                    Send Message
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
                {status === 'sending' && (
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full border border-white/50 border-t-white animate-spin" />
                    Sending...
                  </span>
                )}
                {status === 'sent' && (
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Message Sent!
                  </span>
                )}
              </button>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-xs text-orange/70 font-mono"
                >
                  Thanks! I&apos;ll get back to you within 24 hours.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
