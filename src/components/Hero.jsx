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
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2
      const mx = (e.clientX - cx) / cx, my = (e.clientY - cy) / cy
      if (layer1.current) layer1.current.style.transform = `translate(${mx * -18}px, ${my * -12}px)`
      if (layer2.current) layer2.current.style.transform = `translate(${mx * 24}px, ${my * 16}px)`
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <section ref={ref} id="inicio" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', padding: '0 24px',
    }}>
      {/* Soft blobs */}
      <div ref={layer1} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'transform 0.15s ease-out' }}>
        <div style={{
          position: 'absolute', top: '15%', left: '20%', width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 70%)', filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '15%', width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(44,95,111,0.06) 0%, transparent 70%)', filter: 'blur(60px)',
        }} />
      </div>

      {/* Subtle grid */}
      <div ref={layer2} style={{
        position: 'absolute', inset: '-30px', pointerEvents: 'none', transition: 'transform 0.25s ease-out',
        backgroundImage: `
          linear-gradient(rgba(255,140,122,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,140,122,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
      }} />

      {/* Floating dots */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[
          { top: '22%', left: '8%', s: 5, c: '255,140,122' },
          { top: '65%', left: '88%', s: 3, c: '44,95,111' },
          { top: '38%', left: '93%', s: 6, c: '255,140,122' },
          { top: '78%', left: '7%', s: 4, c: '44,95,111' },
          { top: '14%', left: '73%', s: 3, c: '255,140,122' },
        ].map((d, i) => (
          <motion.div key={i}
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 3 + i * 0.8, ease: 'easeInOut', delay: i * 0.5 }}
            style={{
              position: 'absolute', top: d.top, left: d.left,
              width: d.s, height: d.s, borderRadius: '50%',
              background: `rgba(${d.c},0.5)`,
              boxShadow: `0 0 ${d.s * 4}px rgba(${d.c},0.25)`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div style={{ y, opacity, position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '860px' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <span className="mono" style={{
            color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', display: 'inline-block', marginBottom: '28px',
          }}>&gt; hola, soy</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(60px, 11vw, 120px)', fontWeight: 900, lineHeight: 0.92, letterSpacing: '-4px', color: 'var(--text-h)' }}
        >
          Harry<br /><span className="gradient-text">Mendez</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #FF8C7A, #2C5F6F, transparent)', margin: '30px auto', maxWidth: '280px' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(16px, 2.2vw, 20px)', color: 'var(--text)', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 48px' }}
        >
          Del código al servidor, del servidor a la red.{' '}
          <span style={{ color: 'var(--text-h)', fontWeight: 600 }}>Si tiene lógica, lo entiendo.</span>{' '}
          Si tiene bugs, los encuentro.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '56px' }}
        >
          <a href="#proyectos" style={{
            padding: '14px 36px', background: 'var(--accent)', borderRadius: '8px', color: '#fff',
            textDecoration: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '0.01em',
            transition: 'all 0.25s', boxShadow: '0 4px 24px rgba(255,140,122,0.3)',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 40px rgba(255,140,122,0.5)' }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 4px 24px rgba(255,140,122,0.3)' }}
          >Ver proyectos</a>
          <a href="#contacto" style={{
            padding: '14px 36px', border: '1px solid rgba(44,95,111,0.3)', borderRadius: '8px',
            color: 'var(--accent2)', textDecoration: 'none', fontWeight: 600, fontSize: '14px', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(44,95,111,0.06)'; e.currentTarget.style.borderColor = 'rgba(44,95,111,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(44,95,111,0.3)'; e.currentTarget.style.transform = 'none' }}
          >Hablemos</a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}
          style={{ display: 'flex', gap: '36px', justifyContent: 'center' }}
        >
          {['GitHub', 'Email', 'WhatsApp'].map((label, i) => {
            const hrefs = ['https://github.com/hmndz3', 'mailto:harrymndz3@gmail.com', 'https://wa.me/50256103183']
            return (
              <a key={label} href={hrefs[i]} target="_blank" rel="noopener noreferrer" className="mono" style={{
                color: 'var(--text)', textDecoration: 'none', fontSize: '11px',
                fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
              >{label}</a>
            )
          })}
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span className="mono" style={{ color: 'var(--text)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>scroll</span>
        <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--accent), transparent)', position: 'relative' }}>
          <motion.div animate={{ y: [0, 36, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            style={{ width: '3px', height: '10px', background: 'var(--accent)', borderRadius: '2px', marginLeft: '-1px' }} />
        </div>
      </motion.div>
    </section>
  )
}
