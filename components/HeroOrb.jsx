'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Same GLSL shaders as before — just using imperative Three.js instead of R3F
// to avoid the ReactCurrentOwner conflict in @react-three/fiber v8 + React 18.3.x
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  vec3 mod289v3(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289v4(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289v4(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289v3(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - abs(dot(viewDir, vNormal)), 2.2);

    vec3 pos = vWorldPos;
    float n1 = snoise(pos * 1.4 + uTime * 0.22) * 0.5 + 0.5;
    float n2 = snoise(pos * 2.8 - uTime * 0.17) * 0.5 + 0.5;
    float n3 = snoise(pos * 5.0 + uTime * 0.11) * 0.5 + 0.5;

    vec3 cA = vec3(0.55, 0.03, 0.0);
    vec3 cB = vec3(1.0,  0.22, 0.0);
    vec3 cC = vec3(1.0,  0.55, 0.08);

    vec3 color = mix(cA, cB, n1);
    color = mix(color, cC, n2 * 0.55);
    color += fresnel * cB * 2.8;
    color += n3 * 0.12 * cC;

    float dist = length(vUv - 0.5) * 2.0;
    float core = exp(-dist * dist * 4.0);
    color += core * cC * 0.7;

    float alpha = fresnel * 0.88 + 0.12 + core * 0.25;
    alpha = clamp(alpha, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`

export default function HeroOrb() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene()
    const w = mount.clientWidth
    const h = mount.clientHeight
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    // ── Plasma sphere ───────────────────────────────────────
    const uniforms = { uTime: { value: 0 } }
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.55, 128, 128),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
      })
    )
    scene.add(sphere)

    // ── Corona glow ─────────────────────────────────────────
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.0, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xff2200,
          transparent: true,
          opacity: 0.045,
          side: THREE.BackSide,
          depthWrite: false,
        })
      )
    )
    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(2.7, 32, 32),
        new THREE.MeshBasicMaterial({
          color: 0xff4400,
          transparent: true,
          opacity: 0.018,
          side: THREE.BackSide,
          depthWrite: false,
        })
      )
    )

    const light = new THREE.PointLight(0xff4500, 3, 12, 2)
    scene.add(light)

    // ── Animation loop ──────────────────────────────────────
    const clock = new THREE.Clock()
    let animId

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      uniforms.uTime.value = t
      sphere.rotation.y = t * 0.09
      sphere.rotation.x = Math.sin(t * 0.06) * 0.08
      renderer.render(scene, camera)
    }
    animate()

    // ── Resize observer ─────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const nw = mount.clientWidth
      const nh = mount.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
