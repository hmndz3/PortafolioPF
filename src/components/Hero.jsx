import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export default function Hero() {
  const ref = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const layer1 = useRef(null)
  const layer2 = useRef(null)
  const layer3 = useRef(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      mouseX.current = (e.clientX - cx) / cx
      mouseY.current = (e.clientY - cy) / cy

      if (layer1.current) {
        layer1.current.style.transform = `translate(${mouseX.current * -18}px, ${mouseY.current * -12}px)`
      }
      if (layer2.current) {
        layer2.current.style.transform = `translate(${mouseX.current * 30}px, ${mouseY.current * 20}px)`
      }
      if (layer3.current) {
        layer3.current.style.transform = `translate(${mouseX.current * -10}px, ${mouseY.current * -6}px)`
      }
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section ref={ref} id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '0 24px',
    }}>
      {/* Parallax layer 1 - deep blobs */}
      <div ref={layer1} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transition: 'transform 0.15s ease-out',
      }}>
        <div style={{
          position: 'absolute', top: '15%', left: '20%',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }} />
      </div>

      {/* Parallax layer 2 - grid */}
      <div ref={layer2} style={{
        position: 'absolute', inset: '-20px',
        pointerEvents: 'none',
        transition: 'transform 0.25s ease-out',
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Parallax layer 3 - floating dots */}
      <div ref={layer3} style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        transition: 'transform 0.1s ease-out',
      }}>
        {[
          { top: '25%', left: '10%', size: 6, opacity: 0.3 },
          { top: '60%', left: '85%', size: 4, opacity: 0.2 },
          { top: '40%', left: '92%', size: 8, opacity: 0.15 },
          { top: '75%', left: '8%', size: 5, opacity: 0.25 },
          { top: '15%', left: '75%', size: 3, opacity: 0.3 },
        ].map((d, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.7, ease: 'easeInOut', delay: i * 0.4 }}
            style={{
              position: 'absolute', top: d.top, left: d.left,
              width: d.size, height: d.size, borderRadius: '50%',
              background: 'var(--accent)', opacity: d.opacity,
            }}
          />
        ))}
      </div>

      {/* Main content with scroll parallax */}
      <motion.div style={{ y, opacity, scale, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '860px' }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="mono" style={{
            color: 'var(--accent)', fontSize: '13px', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            display: 'inline-block', marginBottom: '28px',
          }}>
            &gt; hola, soy
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(56px, 10vw, 110px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-4px',
            color: 'var(--text-h)',
            marginBottom: '0',
          }}
        >
          Harry
          <br />
          <span className="gradient-text">Mendez</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent)',
            margin: '28px auto',
            maxWidth: '300px',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            color: 'var(--text)',
            lineHeight: 1.65,
            maxWidth: '540px',
            margin: '0 auto 44px',
          }}
        >
          Estudiante de CS que aprende haciendo, no viendo.{' '}
          <span style={{ color: 'var(--text-h)', fontWeight: 500 }}>Backend, bases de datos y redes</span>{' '}
          son mi mundo — pero el front también me lo tomo en serio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
        >
          <a href="#proyectos" style={{
            padding: '15px 36px', background: 'var(--accent)', borderRadius: '8px',
            color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            boxShadow: '0 0 40px rgba(99,102,241,0.35)', transition: 'all 0.25s',
            letterSpacing: '-0.2px',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px) scale(1.02)'; e.target.style.boxShadow = '0 8px 60px rgba(99,102,241,0.55)' }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 0 40px rgba(99,102,241,0.35)' }}
          >
            Ver proyectos
          </a>
          <a href="#contacto" style={{
            padding: '15px 36px', border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '8px', color: 'var(--text-h)', textDecoration: 'none',
            fontWeight: 600, fontSize: '15px', transition: 'all 0.25s', backdropFilter: 'blur(8px)',
            background: 'rgba(99,102,241,0.05)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.7)'; e.currentTarget.style.background = 'rgba(99,102,241,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.05)'; e.currentTarget.style.transform = 'none' }}
          >
            Hablemos
          </a>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: 'flex', gap: '32px', justifyContent: 'center', alignItems: 'center' }}
        >
          {[
            { href: 'https://github.com/hmndz3', label: 'GitHub' },
            { href: 'mailto:harrymndz3@gmail.com', label: 'Email' },
            { href: 'https://wa.me/50256103183', label: 'WhatsApp' },
          ].map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="mono" style={{
              color: 'var(--text)', textDecoration: 'none', fontSize: '12px',
              fontWeight: 500, letterSpacing: '0.05em', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
        }}
      >
        <span className="mono" style={{ color: 'var(--text)', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--accent), transparent)' }}>
          <motion.div
            animate={{ y: [0, 36, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: '3px', height: '12px', background: 'var(--accent)', borderRadius: '2px', marginLeft: '-1px' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
