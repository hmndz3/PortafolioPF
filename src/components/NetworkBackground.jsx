import { useEffect, useRef } from 'react'

export default function NetworkBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId = null
    let t = 0
    let mx = 0.5, my = 0.5
    let scrollPct = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    // Large soft blobs - aurora style
    const blobs = [
      { x: 0.15, y: 0.2,  r: 0.32, color: '255,140,122', speed: 0.0004, phase: 0     },
      { x: 0.8,  y: 0.15, r: 0.28, color: '184,228,211', speed: 0.0003, phase: 1.5   },
      { x: 0.5,  y: 0.6,  r: 0.35, color: '214,196,240', speed: 0.0005, phase: 3.0   },
      { x: 0.1,  y: 0.75, r: 0.25, color: '255,200,180', speed: 0.0004, phase: 0.8   },
      { x: 0.9,  y: 0.7,  r: 0.3,  color: '44,95,111',   speed: 0.0003, phase: 2.2   },
      { x: 0.55, y: 0.1,  r: 0.22, color: '255,217,168', speed: 0.0006, phase: 4.1   },
    ]

    // Small floating particles
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 3 + 1.5,
      speed: Math.random() * 0.00008 + 0.00003,
      phase: Math.random() * Math.PI * 2,
      color: ['255,140,122','184,228,211','214,196,240','44,95,111'][Math.floor(Math.random()*4)],
      floatAmp: Math.random() * 0.04 + 0.02,
    }))

    const onMouse = e => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight }
    const onScroll = () => { scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1) }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll, { passive: true })

    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width, H = canvas.height

      // Draw blobs
      blobs.forEach(b => {
        const bx = (b.x + Math.sin(t * b.speed + b.phase) * 0.1 + (mx - 0.5) * -0.04) * W
        const by = (b.y + Math.cos(t * b.speed * 0.7 + b.phase) * 0.08 + (my - 0.5) * -0.03) * H
        const br = b.r * Math.min(W, H)

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0, 'rgba(' + b.color + ',0.12)')
        grad.addColorStop(0.5, 'rgba(' + b.color + ',0.06)')
        grad.addColorStop(1, 'rgba(' + b.color + ',0)')

        ctx.beginPath()
        ctx.arc(bx, by, br, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })

      // Draw particles
      particles.forEach(p => {
        const px = (p.x + Math.sin(t * p.speed + p.phase) * p.floatAmp + (mx - 0.5) * -0.02) * W
        const py = (p.y + Math.cos(t * p.speed * 0.8 + p.phase) * p.floatAmp) * H

        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(' + p.color + ',0.28)'
        ctx.fill()
      })

      // Thin connecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const ax = (a.x + Math.sin(t * a.speed + a.phase) * a.floatAmp) * W
        const ay = (a.y + Math.cos(t * a.speed * 0.8 + a.phase) * a.floatAmp) * H
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const bx2 = (b.x + Math.sin(t * b.speed + b.phase) * b.floatAmp) * W
          const by2 = (b.y + Math.cos(t * b.speed * 0.8 + b.phase) * b.floatAmp) * H
          const dist = Math.sqrt((ax - bx2) ** 2 + (ay - by2) ** 2)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(ax, ay)
            ctx.lineTo(bx2, by2)
            ctx.strokeStyle = 'rgba(180,140,120,' + ((1 - dist / 120) * 0.1) + ')'
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 1,
    }} />
  )
}
