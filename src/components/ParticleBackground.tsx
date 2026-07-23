import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  radius: number
}

const DOT_COLOR = '148, 163, 184' // slate-400, kept muted against the dark background
const LINK_DISTANCE = 140
const MOUSE_RADIUS = 150
const MOUSE_FORCE = 0.045
const DRIFT_DAMPING = 0.02
const MAX_SPEED = 0.35

function createParticles(width: number, height: number): Particle[] {
  const count = Math.min(90, Math.max(28, Math.floor((width * height) / 16000)))
  return Array.from({ length: count }, () => {
    const baseVx = (Math.random() - 0.5) * 0.18
    const baseVy = (Math.random() - 0.5) * 0.18
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: baseVx,
      vy: baseVy,
      baseVx,
      baseVy,
      radius: Math.random() * 1.1 + 0.6,
    }
  })
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let animationFrame = 0
    const mouse = { x: -9999, y: -9999, active: false }

    function resize() {
      const canvasEl = canvasRef.current
      if (!canvasEl) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvasEl.width = width * dpr
      canvasEl.height = height * dpr
      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${height}px`
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = createParticles(width, height)
    }

    function drawStaticFrame() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const particle of particles) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT_COLOR}, 0.35)`
        ctx.fill()
      }
    }

    function step() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      for (const particle of particles) {
        if (mouse.active) {
          const dx = particle.x - mouse.x
          const dy = particle.y - mouse.y
          const distance = Math.hypot(dx, dy)
          if (distance < MOUSE_RADIUS && distance > 0.01) {
            const pull = (1 - distance / MOUSE_RADIUS) * MOUSE_FORCE
            particle.vx += (dx / distance) * pull
            particle.vy += (dy / distance) * pull
          }
        }

        particle.vx += (particle.baseVx - particle.vx) * DRIFT_DAMPING
        particle.vy += (particle.baseVy - particle.vy) * DRIFT_DAMPING

        const speed = Math.hypot(particle.vx, particle.vy)
        if (speed > MAX_SPEED) {
          particle.vx = (particle.vx / speed) * MAX_SPEED
          particle.vy = (particle.vy / speed) * MAX_SPEED
        }

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance < LINK_DISTANCE) {
            const opacity = (1 - distance / LINK_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(${DOT_COLOR}, ${opacity})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      for (const particle of particles) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT_COLOR}, 0.4)`
        ctx.fill()
      }

      animationFrame = requestAnimationFrame(step)
    }

    function handlePointerMove(event: PointerEvent) {
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.active = true
    }

    function handlePointerLeave() {
      mouse.active = false
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(animationFrame)
      } else if (!prefersReducedMotion) {
        animationFrame = requestAnimationFrame(step)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      drawStaticFrame()
    } else {
      window.addEventListener('pointermove', handlePointerMove)
      window.addEventListener('pointerleave', handlePointerLeave)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      animationFrame = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
