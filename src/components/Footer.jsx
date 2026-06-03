import { motion } from 'framer-motion'
import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '40px clamp(24px, 6vw, 120px)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {/* Left */}
        <div>
          <span className="mono" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '16px' }}>
            hm.
          </span>
          <p style={{ color: 'var(--text)', fontSize: '13px', marginTop: '6px' }}>
            Built with React + Vite. Deployed on Railway.
          </p>
        </div>

        {/* Center: Bible verse */}
        <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
          <p style={{
            color: 'var(--text)',
            fontSize: '12px',
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxWidth: '320px',
            margin: '0 auto',
          }}>
            "Y todo lo que hagan, háganlo en el nombre del Señor Jesús"
          </p>
          <p className="mono" style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px', fontWeight: 600 }}>
            Col 3:17
          </p>
        </div>

        {/* Right: links */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="https://github.com/hmndz3" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--text)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-h)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
          >
            <Github size={18} />
          </a>
          <a href="mailto:harrymndz3@gmail.com"
            style={{ color: 'var(--text)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-h)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
