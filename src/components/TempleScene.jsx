import React, { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils.js'

// Shared audio — one instance reused, currentTime reset before each play
const lionRoar = typeof window !== 'undefined' ? new Audio('/lion-roar.mp3') : null
if (lionRoar) { lionRoar.volume = 0.6; lionRoar.preload = 'auto' }

/* ══════════════════════════════════════════
   LION
══════════════════════════════════════════ */
function LionModel({
  zDepth   = -5,
  xLeft    = -13,
  xRight   = 13,
  speed    = 4.5,
  startX   = -13,
  startDir = 1,
  scale    = 2.2,
  groundY   = -5.5,
  roarDelay = 8000,
}) {
  const groupRef    = useRef()
  const posXRef     = useRef(startX)
  const dirRef      = useRef(startDir)
  const rotYRef     = useRef(startDir > 0 ?  Math.PI / 2 : -Math.PI / 2)
  const tgtRotYRef  = useRef(rotYRef.current)

  const { scene: src, animations } = useGLTF('/lion_walk_cycle_on_place.glb')
  const scene = useMemo(() => cloneSkeleton(src), [src])
  const { mixer, actions } = useAnimations(animations, groupRef)

  useEffect(() => {
    scene.traverse(obj => {
      if (!obj.isMesh) return
      obj.castShadow    = true
      obj.receiveShadow = true

      const upgradeMat = (mat) => {
        const m = mat.clone()
        m.color.r = Math.min(1, m.color.r * 1.35)
        m.color.g = Math.min(1, m.color.g * 0.75)
        m.color.b = Math.min(1, m.color.b * 0.42)
        if (m.isMeshStandardMaterial || m.isMeshPhysicalMaterial) {
          m.roughness       = 0.88
          m.metalness       = 0.0
          m.envMapIntensity = 0.4
        }
        m.needsUpdate = true
        return m
      }
      obj.material = Array.isArray(obj.material)
        ? obj.material.map(upgradeMat)
        : upgradeMat(obj.material)
    })

    scene.scale.setScalar(scale)
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene, true)
    scene.position.y = -box.min.y

    mixer.timeScale = 0.75
    const anim = Object.values(actions)[0]
    if (anim) anim.reset().play()

    // Roar cycle: play sound at random intervals, walk continues uninterrupted
    const doRoar = () => {
      if (lionRoar) { lionRoar.currentTime = 0; lionRoar.play().catch(() => {}) }
      roarTimer = setTimeout(doRoar, 14000 + Math.random() * 14000)
    }

    let roarTimer
    const firstTimer = setTimeout(doRoar, roarDelay)

    return () => {
      clearTimeout(firstTimer)
      clearTimeout(roarTimer)
    }
  }, [scene, actions, scale, mixer, roarDelay])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    mixer.update(delta)

    posXRef.current += dirRef.current * speed * delta

    if (posXRef.current >= xRight && dirRef.current === 1) {
      dirRef.current     = -1
      tgtRotYRef.current = -Math.PI / 2
    } else if (posXRef.current <= xLeft && dirRef.current === -1) {
      dirRef.current     = 1
      tgtRotYRef.current =  Math.PI / 2
    }

    rotYRef.current = THREE.MathUtils.lerp(rotYRef.current, tgtRotYRef.current, 0.1)
    groupRef.current.position.set(posXRef.current, groundY, zDepth)
    groupRef.current.rotation.y = rotYRef.current
  })

  return <group ref={groupRef}><primitive object={scene} /></group>
}

useGLTF.preload('/lion_walk_cycle_on_place.glb')

/* ══════════════════════════════════════════
   CAMERA RIG — subtle mouse parallax
══════════════════════════════════════════ */
function CameraRig({ mouseRef }) {
  useFrame(({ camera, clock }) => {
    const t  = clock.getElapsedTime()
    const mx = mouseRef?.current?.x ?? 0
    const my = mouseRef?.current?.y ?? 0
    const tx = mx * 1.5 + Math.sin(t * 0.14) * 0.15
    camera.position.x += (tx - camera.position.x) * 0.038
    camera.position.y += (0.5 - camera.position.y) * 0.038
    camera.position.z += (12 - camera.position.z) * 0.038
    camera.lookAt(camera.position.x * 0.3, camera.position.y - 0.4 + my * 0.4, -6)
  })
  return null
}

/* ══════════════════════════════════════════
   SCENE
══════════════════════════════════════════ */
function Scene({ mouseRef }) {
  return (
    <>
      {/* Warm sun key — upper right */}
      <directionalLight position={[40, 30, 20]}   intensity={4.0} color="#ffcc70" castShadow
        shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      {/* Soft front fill */}
      <directionalLight position={[0, 8, 30]}     intensity={1.8} color="#fff0d0" />
      {/* Ground bounce — warm amber from below */}
      <directionalLight position={[0, -6, 10]}    intensity={0.9} color="#e8960a" />
      {/* Cool rim from behind — separates silhouette */}
      <directionalLight position={[-20, 20, -15]} intensity={0.7} color="#c8e0ff" />
      {/* Ambient */}
      <ambientLight intensity={2.2} color="#ffe4a0" />

      <Suspense fallback={null}>
        {/* roarDelay offset so the two lions don't roar at the same time */}
        <LionModel zDepth={-5}  xLeft={-13} xRight={13} speed={4.5} startX={-13} startDir={ 1} scale={2.2} groundY={-10} roarDelay={7000}  />
        <LionModel zDepth={-10} xLeft={-16} xRight={16} speed={3.8} startX={ 16} startDir={-1} scale={2.2} groundY={-10} roarDelay={16000} />
      </Suspense>

      <CameraRig mouseRef={mouseRef} />
    </>
  )
}

/* ══════════════════════════════════════════
   CANVAS
══════════════════════════════════════════ */
export default function TempleScene({ mouseRef }) {
  return (
    <Canvas
      shadows="soft"
      camera={{ position: [0, 0.5, 12], fov: 70 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <Scene mouseRef={mouseRef} />
    </Canvas>
  )
}
