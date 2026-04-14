import React, { useEffect, useRef } from 'react'

const COUNT  = 58
const DIST   = 115
const SPEED  = 0.22

export default function Background() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let pts = []

    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    const makePoint = () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.1 + 0.4,
    })

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pts.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 210, 240, 0.5)'
        ctx.fill()
      })

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < DIST * DIST) {
            const alpha = (1 - Math.sqrt(d2) / DIST) * 0.11
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,210,240,${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(tick)
    }

    setSize()
    pts = Array.from({ length: COUNT }, makePoint)
    tick()

    const onResize = () => {
      setSize()
      pts = Array.from({ length: COUNT }, makePoint)
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <>
      {/* Particle network canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Large decorative SVG geometry — fixed in bg */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>

        {/* Top-right double hexagon */}
        <svg
          style={{ position: 'absolute', top: '-80px', right: '-80px', opacity: 0.055 }}
          width="460" height="460" viewBox="0 0 460 460" fill="none"
        >
          <polygon points="230,12 430,127 430,333 230,448 30,333 30,127"
            stroke="#00e5ff" strokeWidth="1.2"/>
          <polygon points="230,55 385,140 385,320 230,405 75,320 75,140"
            stroke="#00e5ff" strokeWidth="0.6"/>
          <polygon points="230,100 340,160 340,300 230,360 120,300 120,160"
            stroke="rgba(0,229,255,0.5)" strokeWidth="0.4"/>
        </svg>

        {/* Bottom-left hexagon */}
        <svg
          style={{ position: 'absolute', bottom: '-60px', left: '-90px', opacity: 0.04 }}
          width="380" height="380" viewBox="0 0 460 460" fill="none"
        >
          <polygon points="230,12 430,127 430,333 230,448 30,333 30,127"
            stroke="#a855f7" strokeWidth="1.2"/>
          <polygon points="230,70 370,148 370,312 230,390 90,312 90,148"
            stroke="#a855f7" strokeWidth="0.5"/>
        </svg>

        {/* Mid-right crimson ring */}
        <svg
          style={{ position: 'absolute', top: '38%', right: '-120px', opacity: 0.04 }}
          width="320" height="320" viewBox="0 0 320 320" fill="none"
        >
          <circle cx="160" cy="160" r="140" stroke="#ff2d55" strokeWidth="1"/>
          <circle cx="160" cy="160" r="100" stroke="#ff2d55" strokeWidth="0.5" strokeDasharray="6 8"/>
        </svg>

        {/* Center faint ring (very large) */}
        <svg
          style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.025 }}
          width="700" height="700" viewBox="0 0 700 700" fill="none"
        >
          <circle cx="350" cy="350" r="300" stroke="#00e5ff" strokeWidth="0.8"/>
          <circle cx="350" cy="350" r="220" stroke="#00e5ff" strokeWidth="0.4" strokeDasharray="8 14"/>
          <circle cx="350" cy="350" r="140" stroke="#00e5ff" strokeWidth="0.3"/>
        </svg>

        {/* Bottom-right small hex cluster */}
        <svg
          style={{ position: 'absolute', bottom: '18%', right: '6%', opacity: 0.05 }}
          width="120" height="120" viewBox="0 0 120 120" fill="none"
        >
          <polygon points="60,4 110,32 110,88 60,116 10,88 10,32" stroke="#00e5ff" strokeWidth="1"/>
          <polygon points="60,22 92,40 92,78 60,96 28,78 28,40" stroke="#00e5ff" strokeWidth="0.5"/>
        </svg>

        {/* Top-left cross-hair */}
        <svg
          style={{ position: 'absolute', top: '12%', left: '5%', opacity: 0.06 }}
          width="80" height="80" viewBox="0 0 80 80" fill="none"
        >
          <line x1="40" y1="0" x2="40" y2="30" stroke="#00e5ff" strokeWidth="0.8"/>
          <line x1="40" y1="50" x2="40" y2="80" stroke="#00e5ff" strokeWidth="0.8"/>
          <line x1="0" y1="40" x2="30" y2="40" stroke="#00e5ff" strokeWidth="0.8"/>
          <line x1="50" y1="40" x2="80" y2="40" stroke="#00e5ff" strokeWidth="0.8"/>
          <circle cx="40" cy="40" r="10" stroke="#00e5ff" strokeWidth="0.8"/>
          <circle cx="40" cy="40" r="3" fill="rgba(0,229,255,0.4)"/>
        </svg>

      </div>
    </>
  )
}
