import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

/* ─────────────── JS EDITOR ─────────────── */
const SNIPPETS = {
  fibonacci: {
    label: 'Fibonacci',
    code: `// Fibonacci with memoization
const memo = {};
function fib(n) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  return (memo[n] = fib(n-1) + fib(n-2));
}
for (let i = 0; i <= 10; i++)
  console.log(\`fib(\${i}) = \${fib(i)}\`);`,
  },
  quicksort: {
    label: 'Quick Sort',
    code: `// Quick Sort
function qs(arr) {
  if (arr.length <= 1) return arr;
  const p = arr[arr.length >> 1];
  return [
    ...qs(arr.filter(x => x < p)),
    ...arr.filter(x => x === p),
    ...qs(arr.filter(x => x > p)),
  ];
}
const data = [38, 27, 43, 3, 9, 82, 10];
console.log('Input:  ', data.join(', '));
console.log('Sorted: ', qs(data).join(', '));`,
  },
  primes: {
    label: 'Prime Gen',
    code: `// Infinite prime generator
function* primes() {
  const seen = [];
  for (let n = 2; ; n++) {
    if (seen.every(p => n % p !== 0)) {
      seen.push(n); yield n;
    }
  }
}
const gen = primes();
const first12 = Array.from({length:12}, () => gen.next().value);
console.log('First 12 primes:', first12.join(', '));`,
  },
  matrix: {
    label: 'Matrix Mul',
    code: `// Matrix multiplication
const mul = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) =>
      row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)
    )
  );

const A = [[1,2,3],[4,5,6]];
const B = [[7,8],[9,10],[11,12]];
console.log('A x B:');
mul(A, B).forEach(r => console.log(' ', r.join('  ')));`,
  },
}

function runCode(code) {
  const logs = []
  const fc = {
    log:   (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')),
    error: (...a) => logs.push('ERR: ' + a.map(String).join(' ')),
    warn:  (...a) => logs.push('WRN: ' + a.map(String).join(' ')),
  }
  try {
    // eslint-disable-next-line no-new-func
    new Function('console', code)(fc)
    return { ok: true, out: logs.join('\n') || '// (no output)' }
  } catch (e) {
    return { ok: false, out: `RuntimeError: ${e.message}` }
  }
}

function EditorPanel() {
  const [snippet, setSnippet] = useState('fibonacci')
  const [code, setCode]       = useState(SNIPPETS.fibonacci.code)
  const [output, setOutput]   = useState('')
  const [ok, setOk]           = useState(true)
  const [running, setRunning] = useState(false)
  const taRef = useRef(null)

  const handleSnippet = (key) => { setSnippet(key); setCode(SNIPPETS[key].code); setOutput('') }

  const handleTab = (e) => {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const ta = taRef.current
    const s = ta.selectionStart, en = ta.selectionEnd
    const next = code.slice(0, s) + '  ' + code.slice(en)
    setCode(next)
    requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = s + 2 })
  }

  const run = () => {
    setRunning(true)
    setTimeout(() => {
      const r = runCode(code)
      setOutput(r.out); setOk(r.ok); setRunning(false)
    }, 100)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Editor */}
      <div className="terminal-wrap">
        <div className="terminal-bar">
          <span className="t-dot bg-red-500/60" />
          <span className="t-dot bg-yellow-500/60" />
          <span className="t-dot bg-green-500/60" />
          <span className="text-[#2a3a4a] text-[11px] font-mono ml-3">playground.js</span>
        </div>

        {/* Snippet tabs */}
        <div className="flex border-b border-[rgba(200,134,10,0.08)] overflow-x-auto">
          {Object.entries(SNIPPETS).map(([k, s]) => (
            <button
              key={k}
              onClick={() => handleSnippet(k)}
              className={`pg-tab ${snippet === k ? 'active' : ''}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          <textarea
            ref={taRef}
            className="code-input"
            style={{ minHeight: '220px' }}
            value={code}
            onChange={e => setCode(e.target.value)}
            onKeyDown={handleTab}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      </div>

      {/* Run */}
      <button
        onClick={run}
        disabled={running}
        className="btn btn-cyan-solid text-[0.8rem] font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {running ? <><span className="spinner" />RUNNING...</> : <><PlayIcon size={13} />RUN JAVASCRIPT</>}
      </button>

      {/* Output */}
      {output && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="terminal-wrap"
        >
          <div className="terminal-bar">
            <span className="text-[11px] font-mono" style={{ color: ok ? '#e8a820' : '#e8823a' }}>
              {ok ? '✓ output' : '✗ error'}
            </span>
          </div>
          <pre className="p-4 text-[0.78rem] leading-relaxed overflow-x-auto"
            style={{ color: ok ? '#7a8fa8' : '#e8823a', fontFamily: "'JetBrains Mono', monospace" }}>
            {output}
          </pre>
        </motion.div>
      )}
    </div>
  )
}

/* ─────────────── AI CONSOLE ─────────────── */
const QUICK_PROMPTS = [
  { q: 'Explain recursion',          a: 'Recursion: a function solving a problem by calling itself on smaller inputs. Needs a base case to stop + a recursive case that narrows toward it. Classic: factorial(n) = n × factorial(n−1), with factorial(0) = 1.' },
  { q: 'What is cosine similarity?', a: 'Cosine similarity measures the angle between two vectors — how aligned they are in direction (ignores magnitude). Ranges −1 to 1. In NLP/ML, embeddings of similar items score close to 1.' },
  { q: 'WebRTC in 30 words',         a: 'WebRTC enables direct peer-to-peer real-time video, audio, and data transfer between browsers — no media server needed, only a lightweight signaling server to initiate the connection.' },
  { q: 'Explain Redis',              a: 'Redis is an in-memory key-value store. It\'s blazing fast because all data lives in RAM. Used for caching, session storage, pub/sub messaging, rate limiting, and leaderboards.' },
]

function AIPanel() {
  const [input, setInput]     = useState('')
  const [response, setResp]   = useState('')
  const [loading, setLoading] = useState(false)
  const [asked, setAsked]     = useState('')

  const ask = (q) => {
    const query = q || input
    if (!query.trim()) return
    setLoading(true); setResp(''); setAsked(query)
    const match = QUICK_PROMPTS.find(p => p.q.toLowerCase() === query.toLowerCase())
    setTimeout(() => {
      setResp(match?.a || `Processing: "${query}"\n\nThis is a mock AI console. Connect to Groq, Gemini, or OpenAI to power live responses — the integration pattern is demonstrated in the DevFix project.`)
      setLoading(false)
    }, 720)
  }

  return (
    <div className="terminal-wrap flex flex-col" style={{ minHeight: '440px' }}>
      <div className="terminal-bar">
        <span className="t-dot bg-red-500/60" /><span className="t-dot bg-yellow-500/60" /><span className="t-dot bg-green-500/60" />
        <span className="text-[#2a3a4a] text-[11px] font-mono ml-3">ai-console</span>
        <span className="ml-auto text-[10px] font-mono" style={{ color: 'rgba(168,85,247,0.5)' }}>MOCK</span>
      </div>

      {/* Quick prompts */}
      <div className="px-4 pt-3 pb-3 border-b border-[rgba(168,85,247,0.07)]">
        <p className="text-[11px] text-[#3a4a5a] mb-2 font-medium">Quick prompts</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map(p => (
            <button key={p.q} onClick={() => { setInput(p.q); ask(p.q) }}
              className="text-[11px] px-3 py-1.5 font-mono transition-all duration-200 cursor-pointer"
              style={{ background:'rgba(168,85,247,0.07)', border:'1px solid rgba(168,85,247,0.18)', color:'#9d6fd4', borderRadius:'2px' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(168,85,247,0.14)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(168,85,247,0.07)'}
            >{p.q}</button>
          ))}
        </div>
      </div>

      {/* Response area */}
      <div className="flex-1 p-4 overflow-y-auto" style={{ minHeight: '180px' }}>
        {!response && !loading && (
          <p className="text-[#1e2a38] text-[11px] font-mono leading-loose">
            {'> '}Select a prompt or type below...<br/>
            {'> '}No API key required — this runs as a mock demo.
          </p>
        )}
        {loading && (
          <div className="flex items-center gap-2" style={{ color:'#9d6fd4' }}>
            <span className="spinner" style={{ borderColor:'#9d6fd4', borderTopColor:'transparent' }} />
            <span className="text-[11px] font-mono">Generating response...</span>
          </div>
        )}
        {response && !loading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.35 }}>
            <p className="text-[11px] font-mono mb-2" style={{ color:'#9d6fd4' }}>&gt; {asked}</p>
            <p className="text-[12px] leading-relaxed font-mono whitespace-pre-wrap" style={{ color:'#8090a8' }}>{response}</p>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t border-[rgba(168,85,247,0.08)]">
        <span className="font-mono text-sm flex-shrink-0" style={{ color:'#9d6fd4' }}>&gt;_</span>
        <input
          type="text" value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ask()}
          placeholder="Ask anything about code or CS..."
          className="flex-1 bg-transparent text-[11px] font-mono text-slate-400 placeholder-[#1e2a38] outline-none"
        />
        <button onClick={() => ask()} disabled={loading}
          className="btn btn-purple text-[0.68rem] px-4 py-1.5 flex-shrink-0 disabled:opacity-40"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>
    </div>
  )
}

/* ─────────────── SNAKE GAME ─────────────── */
const CELL = 18
const COLS = 22
const ROWS = 22
const W = COLS * CELL  // 396
const H = ROWS * CELL  // 396

function randomFood(snake) {
  let pos
  do {
    pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === pos.x && s.y === pos.y))
  return pos
}

function SnakeGame() {
  const canvasRef  = useRef(null)
  const stateRef   = useRef(null)   // mutable game state
  const rafRef     = useRef(null)
  const lastTick   = useRef(0)
  const SPEED_MS   = 120            // ms per tick

  const [score, setScore]       = useState(0)
  const [best, setBest]         = useState(0)
  const [phase, setPhase]       = useState('idle') // idle | running | over

  /* ── Draw ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const g   = stateRef.current
    if (!g) return

    // Clear
    ctx.fillStyle = '#02020a'
    ctx.fillRect(0, 0, W, H)

    // Subtle grid
    ctx.strokeStyle = 'rgba(200,134,10,0.04)'
    ctx.lineWidth   = 0.5
    for (let i = 0; i <= COLS; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, H); ctx.stroke()
    }
    for (let i = 0; i <= ROWS; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(W, i * CELL); ctx.stroke()
    }

    // Snake
    g.snake.forEach((seg, i) => {
      const isHead = i === 0
      const alpha  = Math.max(0.25, 1 - (i / g.snake.length) * 0.75)
      if (isHead) {
        ctx.shadowColor = '#e8a820'; ctx.shadowBlur = 10
        ctx.fillStyle = '#00e5ff'
      } else {
        ctx.shadowBlur = 0
        ctx.fillStyle = `rgba(0,200,220,${alpha})`
      }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2)
    })
    ctx.shadowBlur = 0

    // Food
    const fx = g.food.x * CELL + CELL / 2
    const fy = g.food.y * CELL + CELL / 2
    ctx.shadowColor = '#e8823a'; ctx.shadowBlur = 12
    ctx.fillStyle   = '#ff2d55'
    ctx.beginPath(); ctx.arc(fx, fy, CELL / 2 - 2, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0
  }, [])

  /* ── Idle screen ── */
  const drawIdle = useCallback((msg = 'PRESS START') => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#02020a'
    ctx.fillRect(0, 0, W, H)

    // Border glow
    ctx.strokeStyle = 'rgba(200,134,10,0.15)'
    ctx.lineWidth = 1
    ctx.strokeRect(1, 1, W - 2, H - 2)

    ctx.textAlign = 'center'
    ctx.fillStyle = 'rgba(200,134,10,0.35)'
    ctx.font = `bold 13px "JetBrains Mono", monospace`
    ctx.fillText(msg, W / 2, H / 2)

    if (msg === 'GAME OVER') {
      ctx.fillStyle = 'rgba(224,90,32,0.55)'
      ctx.font = `bold 18px "Orbitron", sans-serif`
      ctx.fillText('GAME OVER', W / 2, H / 2 - 22)
    }
  }, [])

  /* ── Tick ── */
  const tick = useCallback((timestamp) => {
    if (phase !== 'running') return
    if (timestamp - lastTick.current >= SPEED_MS) {
      lastTick.current = timestamp
      const g = stateRef.current
      if (!g) return

      // Commit buffered direction
      g.dir = g.nextDir

      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y }

      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        setPhase('over')
        return
      }
      // Self collision
      if (g.snake.some(s => s.x === head.x && s.y === head.y)) {
        setPhase('over')
        return
      }

      g.snake.unshift(head)

      if (head.x === g.food.x && head.y === g.food.y) {
        g.score++
        setScore(g.score)
        setBest(b => Math.max(b, g.score))
        g.food = randomFood(g.snake)
      } else {
        g.snake.pop()
      }

      draw()
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [phase, draw])

  /* ── Start / restart ── */
  const start = () => {
    const snake = [
      { x: 11, y: 11 },
      { x: 10, y: 11 },
      { x: 9,  y: 11 },
    ]
    stateRef.current = {
      snake,
      food:    randomFood(snake),
      dir:     { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      score:   0,
    }
    setScore(0)
    setPhase('running')
  }

  /* ── Keyboard controls ── */
  useEffect(() => {
    if (phase !== 'running') return
    const DIRS = {
      ArrowUp:    { x: 0,  y: -1 },
      ArrowDown:  { x: 0,  y:  1 },
      ArrowLeft:  { x: -1, y:  0 },
      ArrowRight: { x: 1,  y:  0 },
      w: { x: 0, y: -1 }, s: { x: 0, y: 1 },
      a: { x: -1, y: 0 }, d: { x: 1, y: 0 },
    }
    const onKey = (e) => {
      const g = stateRef.current
      const nd = DIRS[e.key]
      if (!nd || !g) return
      if (nd.x === -g.dir.x && nd.y === -g.dir.y) return // no 180°
      g.nextDir = nd
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase])

  /* ── RAF loop ── */
  useEffect(() => {
    if (phase === 'running') {
      lastTick.current = performance.now()
      rafRef.current = requestAnimationFrame(tick)
    } else {
      cancelAnimationFrame(rafRef.current)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [phase, tick])

  /* ── Game over screen ── */
  useEffect(() => {
    if (phase === 'over') {
      draw()
      setTimeout(() => drawIdle('GAME OVER'), 200)
    }
    if (phase === 'idle') drawIdle('PRESS START')
  }, [phase, draw, drawIdle])

  /* Mobile swipe */
  const touchStart = useRef(null)
  const onTouchStart = (e) => { touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }
  const onTouchEnd = (e) => {
    if (!touchStart.current || phase !== 'running') return
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const g  = stateRef.current
    if (!g) return
    if (Math.abs(dx) > Math.abs(dy)) {
      const nd = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }
      if (!(nd.x === -g.dir.x)) g.nextDir = nd
    } else {
      const nd = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 }
      if (!(nd.y === -g.dir.y)) g.nextDir = nd
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Score bar */}
      <div className="w-full flex items-center justify-between px-1">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-[10px] font-mono text-[#2a3a4a] tracking-widest">SCORE</p>
            <p className="font-orbitron font-bold text-lg text-[#e8a820]"
              style={{ textShadow:'0 0 10px rgba(200,134,10,0.5)' }}>
              {String(score).padStart(4, '0')}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#2a3a4a] tracking-widest">BEST</p>
            <p className="font-orbitron font-bold text-lg text-[#e8823a]"
              style={{ textShadow:'0 0 10px rgba(224,90,32,0.4)' }}>
              {String(best).padStart(4, '0')}
            </p>
          </div>
        </div>
        <button
          onClick={start}
          className="btn btn-cyan-solid text-[0.78rem] font-semibold px-5 py-2"
        >
          {phase === 'idle' ? 'START' : 'RESTART'}
        </button>
      </div>

      {/* Canvas */}
      <div style={{ border:'1px solid rgba(200,134,10,0.18)', borderRadius:'2px', lineHeight:0 }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          style={{ display:'block', maxWidth:'100%', imageRendering:'pixelated' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      </div>

      {/* Controls hint */}
      <div className="flex items-center gap-4 text-[10px] font-mono text-[#1e2a38]">
        <span>WASD / Arrow keys to move</span>
        <span>·</span>
        <span>Swipe on mobile</span>
        <span>·</span>
        <span style={{ color:'#e8823a' }}>● food</span>
      </div>
    </div>
  )
}

/* ─────────────── PLAYGROUND ROOT ─────────────── */
const TABS = ['Editor', 'AI Console', 'Snake']

export default function Playground() {
  const [tab, setTab] = useState('Editor')

  return (
    <section id="playground" className="py-24 px-6 relative stone-section">
      <div className="section-top" />
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="section-label">
            <h2 className="font-bold text-3xl md:text-4xl text-white tracking-tight">
              Playground
            </h2>
            <div className="section-line" />
          </div>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex border-b mb-8"
          style={{ borderColor: 'rgba(0,229,255,0.08)' }}
        >
          {TABS.map(t => (
            <button
              key={t}
              className={`pg-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'Snake' ? '🐍 ' : ''}{t}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'Editor'     && <EditorPanel />}
          {tab === 'AI Console' && <AIPanel />}
          {tab === 'Snake'      && <SnakeGame />}
        </motion.div>
      </div>
    </section>
  )
}

function PlayIcon({ size = 13 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
}
