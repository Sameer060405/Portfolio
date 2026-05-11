'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const cursorX = useMotionValue(-200)
  const cursorY = useMotionValue(-200)

  const springCfg = { stiffness: 70, damping: 14, mass: 0.6 }
  const trailX = useSpring(cursorX, springCfg)
  const trailY = useSpring(cursorY, springCfg)

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const addHover = () => {
      document.querySelectorAll('a, button, [data-cursor="pointer"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true))
        el.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    // Re-query on each render cycle to catch dynamically added elements
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      observer.disconnect()
    }
  }, [cursorX, cursorY])

  const dotSize = clicked ? 4 : hovered ? 8 : 6
  const ringSize = hovered ? 52 : 32
  const ringOpacity = hidden ? 0 : 1

  return (
    <>
      {/* Dot — instant follow */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-orange mix-blend-difference"
      />

      {/* Ring — lagging trail */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: ringOpacity,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor: hovered ? 'rgba(255,69,0,0.1)' : 'transparent',
          borderColor: hovered ? 'rgba(255,107,53,0.8)' : 'rgba(255,69,0,0.55)',
          scale: clicked ? 0.85 : 1,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border"
      />
    </>
  )
}
