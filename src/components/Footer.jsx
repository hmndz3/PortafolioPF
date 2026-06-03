import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '36px clamp(24px,6vw,120px)' }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px',
      }}>
        <div>
          <span className="mono" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '17px' }}>hm.</span>
          <p style={{ color: 'var(--text)', fontSize: '12px', marginTop: '5px' }}>
            React + Vite · Framer Motion · Railway
          </p>
        </div>

        <div style={{ textAlign: 'center', flex: 1, minWidth: '200px' }}>
          <p style={{ color: 'var(--text)', fontSize: '12px', fontStyle: 'italic', lineHeight: 1.7, maxWidth: '280px', margin: '0 auto' }}>
            "Todo lo que hagan, háganlo en el nombre del Señor Jesús"
          </p>
          <p className="mono" style={{ color: 'var(--accent)', fontSize: '11px', marginTop: '4px', fontWeight: 700 }}>Col 3:17</p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          {[
            { href: 'https://github.com/hmndz3', icon: <Github size={17} /> },
            { href: 'mailto:harrymndz3@gmail.com', icon: <Mail size={17} /> },
          ].map(({ href, icon }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--text)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-h)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >{icon}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
