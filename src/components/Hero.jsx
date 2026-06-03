import { motion } from 'framer-motion'
import { ArrowDown, Github, Mail, Phone } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background blobs */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '10%',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
      </div>

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '800px' }}>
        <motion.div {...fadeUp(0.1)}>
          <span className="mono" style={{
            color: 'var(--accent)',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'inline-block',
            marginBottom: '24px',
          }}>
            &gt; Hello, world
          </span>
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} style={{
          fontSize: 'clamp(48px, 8vw, 88px)',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-3px',
          color: 'var(--text-h)',
          marginBottom: '8px',
        }}>
          Harry
          <br />
          <span className="gradient-text">Mendez</span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} style={{
          fontSize: 'clamp(18px, 2.5vw, 22px)',
          color: 'var(--text)',
          fontWeight: 400,
          marginTop: '20px',
          marginBottom: '32px',
          lineHeight: 1.5,
          maxWidth: '560px',
          margin: '20px auto 40px',
        }}>
          CS student who learns by building.{' '}
          <span style={{ color: 'var(--text-h)' }}>Backend, databases & networks</span>{' '}
          are where I live — but I'll make the front look good too.
        </motion.p>

        <motion.div {...fadeUp(0.4)} style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '60px',
        }}>
          <a
            href="#projects"
            style={{
              padding: '14px 32px',
              background: 'var(--accent)',
              borderRadius: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'all 0.2s',
              boxShadow: '0 0 30px rgba(99,102,241,0.3)',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 50px rgba(99,102,241,0.5)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 30px rgba(99,102,241,0.3)' }}
          >
            See my work
          </a>
          <a
            href="#contact"
            style={{
              padding: '14px 32px',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--text-h)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '15px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(99,102,241,0.5)'; e.target.style.background = 'rgba(99,102,241,0.05)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.background = 'transparent' }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div {...fadeUp(0.5)} style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {[
            { href: 'https://github.com/hmndz3', icon: <Github size={18} />, label: 'GitHub' },
            { href: 'mailto:harrymndz3@gmail.com', icon: <Mail size={18} />, label: 'Email' },
            { href: 'tel:+50256103183', icon: <Phone size={18} />, label: 'Phone' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                Array.from(e.currentTarget.children).forEach(c => c.style && (c.style.color = 'var(--accent)'))
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text)'
              }}
            >
              {icon}
              <span>{label}</span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
