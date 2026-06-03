import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 clamp(20px, 5vw, 60px)', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,10,15,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(99,102,241,0.1)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <a href="#" style={{ textDecoration: 'none' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '20px', letterSpacing: '-1px' }}>
          hm<span style={{ color: 'rgba(99,102,241,0.4)' }}>.</span>
        </span>
      </a>

      <nav style={{ display: 'flex', gap: '36px', alignItems: 'center' }} className="desktop-nav">
        {links.map((l, i) => (
          <motion.a
            key={l.href} href={l.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s', letterSpacing: '0.01em' }}
            onMouseEnter={e => e.target.style.color = 'var(--text-h)'}
            onMouseLeave={e => e.target.style.color = 'var(--text)'}
          >{l.label}</motion.a>
        ))}
        <motion.a
          href="#contacto"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{
            padding: '8px 20px', border: '1px solid rgba(99,102,241,0.5)',
            borderRadius: '6px', color: 'var(--accent)', textDecoration: 'none',
            fontSize: '13px', fontWeight: 600, transition: 'all 0.2s', letterSpacing: '0.03em',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.12)'; e.target.style.borderColor = 'var(--accent)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(99,102,241,0.5)' }}
        >Contactar</motion.a>
      </nav>

      <button onClick={() => setOpen(!open)} className="mobile-menu-btn"
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-h)', display: 'none', flexDirection: 'column', gap: '5px' }}>
        {[0,1,2].map(i => (
          <motion.span key={i} style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor', borderRadius: '1px' }} />
        ))}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'absolute', top: '64px', left: 0, right: 0,
              background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)', padding: '24px clamp(20px,5vw,60px)',
              display: 'flex', flexDirection: 'column', gap: '20px',
            }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '18px', fontWeight: 500 }}>
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.header>
  )
}
