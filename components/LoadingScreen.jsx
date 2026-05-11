'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('counting') // 'counting' | 'reveal' | 'exit'

  useEffect(() => {
    // Count from 0 → 100 in ~1.8s
    const duration = 1800
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * 100))
      if (progress < 1) {
        requestAnimationFrame(tick)
      } else {
        setPhase('reveal')
        setTimeout(() => {
          setPhase('exit')
          setTimeout(onComplete, 700)
        }, 600)
      }
    }
    requestAnimationFrame(tick)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-bg overflow-hidden"
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,69,0,0.08) 0%, transparent 70%)',
              }}
            />
          </div>

          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-center mb-16 relative z-10"
          >
            <div className="font-heading font-bold text-2xl text-white/30 tracking-[0.4em] uppercase mb-2 font-mono">
              Sameer Kaushik
            </div>
            <div className="text-xs text-orange/60 tracking-[0.3em] uppercase font-mono">
              Portfolio
            </div>
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-10"
          >
            <div
              className="font-heading font-bold text-[clamp(80px,15vw,160px)] leading-none tabular-nums"
              style={{
                color: count < 100 ? 'rgba(255,255,255,0.08)' : '#FF4500',
                textShadow: count >= 80 ? '0 0 60px rgba(255,69,0,0.4)' : 'none',
                transition: 'color 0.3s, text-shadow 0.3s',
              }}
            >
              {String(count).padStart(3, '0')}
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-12 w-48 h-[1px] bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-orange origin-left"
              style={{ scaleX: count / 100 }}
            />
          </div>

          {/* Loading label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.4 }}
            className="relative z-10 mt-4 text-[10px] tracking-[0.35em] uppercase font-mono text-white/40"
          >
            Initializing
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
