import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(10,10,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(30,30,46,0.8)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '18px', letterSpacing: '-0.5px' }}>
          hm<span style={{ color: 'var(--text-h)' }}>.</span>
        </span>
      </a>

      {/* Desktop nav */}
      <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
        {links.map(link => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: 'var(--text)',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--text-h)'}
            onMouseLeave={e => e.target.style.color = 'var(--text)'}
          >
            {link.label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '8px 18px',
            border: '1px solid var(--accent)',
            borderRadius: '6px',
            color: 'var(--accent)',
            textDecoration: 'none',
            fontSize: '13px',
            fontWeight: 600,
            transition: 'all 0.2s',
            letterSpacing: '0.03em',
          }}
          onMouseEnter={e => { e.target.style.background = 'rgba(99,102,241,0.1)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent' }}
        >
          Resume
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-h)', display: 'none' }}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(10,10,15,0.97)',
              borderBottom: '1px solid var(--border)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  color: 'var(--text)',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {link.label}
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
