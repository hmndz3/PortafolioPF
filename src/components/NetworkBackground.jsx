import { useEffect, useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function NetworkBackground() {
  const canvasRef = useRef(null)
  const scrollRef = useRef(0)
  const animRef = useRef(null)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', v => { scrollRef.current = v })
    return unsubscribe
  }, [scrollYProgress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate nodes
    const NODE_COUNT = 60
    const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 2 + 1,
      spawnAt: Math.random(), // scroll progress when this node activates
    }))

    const MAX_DIST = 160

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const scroll = scrollRef.current
      const viewportTop = scroll * canvas.height * 2.5

      nodes.forEach(n => {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < viewportTop - 100 || n.y > viewportTop + canvas.height + 100) n.vy *= -1
      })

      const visible = nodes.filter(n => n.spawnAt <= scroll + 0.05)

      // Draw connections
      for (let i = 0; i < visible.length; i++) {
        for (let j = i + 1; j < visible.length; j++) {
          const a = visible[i]
          const b = visible[j]
          const screenAy = a.y - viewportTop
          const screenBy = b.y - viewportTop
          const dx = a.x - b.x
          const dy = screenAy - screenBy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25
            const grad = ctx.createLinearGradient(a.x, screenAy, b.x, screenBy)
            grad.addColorStop(0, `rgba(6,182,212,${alpha})`)
            grad.addColorStop(1, `rgba(232,121,249,${alpha})`)
            ctx.beginPath()
            ctx.moveTo(a.x, screenAy)
            ctx.lineTo(b.x, screenBy)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      visible.forEach(n => {
        const screenY = n.y - viewportTop
        const progress = Math.min((scroll - n.spawnAt + 0.05) / 0.05, 1)
        const cyan = Math.random() > 0.5
        ctx.beginPath()
        ctx.arc(n.x, screenY, n.r * progress, 0, Math.PI * 2)
        ctx.fillStyle = cyan
          ? `rgba(6,182,212,${0.5 * progress})`
          : `rgba(232,121,249,${0.4 * progress})`
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 0.6,
      }}
    />
  )
}
