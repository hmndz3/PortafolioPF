import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const layer1 = useRef(null)
  const layer2 = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const mx = (e.clientX - cx) / cx
      const my = (e.clientY - cy) / cy
      if (layer1.current) layer1.current.style.transform = `translate(${mx * -20}px, ${my * -14}px)`
      if (layer2.current) layer2.current.style.transform = `translate(${mx * 28}px, ${my * 18}px)`
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section ref={ref} id="inicio" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 24px',
    }}>
      {/* Parallax blob layer */}
      <div ref={layer1} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'transform 0.15s ease-out' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '25%',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', right: '20%',
          width: '360px', height: '360px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,121,249,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      {/* Grid parallax layer */}
      <div ref={layer2} style={{
        position: 'absolute', inset: '-30px', pointerEvents: 'none',
        transition: 'transform 0.25s ease-out',
        backgroundImage: `
          linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Floating dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[
          { top: '22%', left: '8%', s: 5, c: '6,182,212' },
          { top: '65%', left: '88%', s: 3, c: '232,121,249' },
          { top: '38%', left: '94%', s: 7, c: '6,182,212' },
          { top: '78%', left: '6%', s: 4, c: '232,121,249' },
          { top: '14%', left: '72%', s: 3, c: '6,182,212' },
        ].map((d, i) => (
          <motion.div key={i}
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.8, ease: 'easeInOut', delay: i * 0.5 }}
            style={{
              position: 'absolute', top: d.top, left: d.left,
              width: d.s, height: d.s, borderRadius: '50%',
              background: `rgba(${d.c},0.6)`,
              boxShadow: `0 0 ${d.s * 3}px rgba(${d.c},0.4)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '860px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <span className="mono" style={{
            color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            display: 'inline-block', marginBottom: '28px',
          }}>
            &gt; hola, soy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(60px, 11vw, 120px)', fontWeight: 900,
            lineHeight: 0.92, letterSpacing: '-4px', color: 'var(--text-h)', marginBottom: '0',
          }}
        >
          Harry
          <br />
          <span className="gradient-text">Mendez</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #06b6d4, #e879f9, transparent)',
            margin: '30px auto', maxWidth: '280px',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'var(--text)',
            lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 48px',
          }}
        >
          Estudiante de CS que aprende haciendo, no viendo.{' '}
          <span style={{ color: 'var(--text-h)', fontWeight: 500 }}>Backend, bases de datos y redes</span>{' '}
          son mi mundo. El front tambien me lo tomo en serio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
        >
          <a href="#proyectos" style={{
            padding: '15px 36px', background: 'var(--accent)', borderRadius: '8px',
            color: '#07070f', textDecoration: 'none', fontWeight: 800, fontSize: '14px',
            letterSpacing: '0.02em', transition: 'all 0.25s',
            boxShadow: '0 0 40px rgba(6,182,212,0.35)',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 60px rgba(6,182,212,0.55)' }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 0 40px rgba(6,182,212,0.35)' }}
          >Ver proyectos</a>
          <a href="#contacto" style={{
            padding: '15px 36px', border: '1px solid rgba(232,121,249,0.35)',
            borderRadius: '8px', color: 'var(--text-h)', textDecoration: 'none',
            fontWeight: 600, fontSize: '14px', transition: 'all 0.25s',
            background: 'rgba(232,121,249,0.05)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,121,249,0.7)'; e.currentTarget.style.background = 'rgba(232,121,249,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(232,121,249,0.35)'; e.currentTarget.style.background = 'rgba(232,121,249,0.05)'; e.currentTarget.style.transform = 'none' }}
          >Hablemos</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', gap: '36px', justifyContent: 'center', alignItems: 'center' }}
        >
          {[
            { href: 'https://github.com/hmndz3', label: 'GitHub' },
            { href: 'mailto:harrymndz3@gmail.com', label: 'Email' },
            { href: 'https://wa.me/50256103183', label: 'WhatsApp' },
          ].map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="mono" style={{
              color: 'var(--text)', textDecoration: 'none', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >{label}</a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}>
        <span className="mono" style={{ color: 'var(--text)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--accent), transparent)', position: 'relative' }}>
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: '3px', height: '10px', background: 'var(--accent)', borderRadius: '2px', marginLeft: '-1px', boxShadow: '0 0 8px rgba(6,182,212,0.8)' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
