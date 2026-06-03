import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, MessageCircle } from 'lucide-react'

const contacts = [
  { icon: <Mail size={20} />, label: 'Correo', value: 'harrymndz3@gmail.com', href: 'mailto:harrymndz3@gmail.com', desc: 'Para trabajo o proyectos' },
  { icon: <Github size={20} />, label: 'GitHub', value: 'github.com/hmndz3', href: 'https://github.com/hmndz3', desc: 'Mira el código, no solo las palabras' },
  { icon: <MessageCircle size={20} />, label: 'WhatsApp', value: '+502 5610 3183', href: 'https://wa.me/50256103183', desc: 'Guatemala 🇬🇹 — respondo rápido' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="contacto" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,120px)',
      maxWidth: '1200px', margin: '0 auto',
    }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} style={{ marginBottom: '72px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          04 / contacto
        </span>
        <h2 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-2px', marginTop: '8px', lineHeight: 1.05 }}>
          Hablemos
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '14px', maxWidth: '480px', lineHeight: 1.6 }}>
          Abierto a oportunidades, proyectos o cualquier conversación técnica.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        {contacts.map((c, i) => (
          <motion.a key={c.label} href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{
              display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px',
              background: 'var(--surface)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border)', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
              textDecoration: 'none', transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,140,122,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{
              width: '44px', height: '44px',
              background: 'rgba(255,140,122,0.12)', border: '1px solid rgba(255,140,122,0.25)',
              borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)',
            }}>{c.icon}</div>
            <div>
              <p style={{ color: 'var(--text)', fontSize: '11px', fontWeight: 600, marginBottom: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{c.label}</p>
              <p style={{ color: 'var(--text-h)', fontSize: '14px', fontWeight: 700, marginBottom: '5px' }}>{c.value}</p>
              <p style={{ color: 'var(--text)', fontSize: '13px' }}>{c.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          padding: 'clamp(36px,5vw,56px)',
          background: 'linear-gradient(135deg, rgba(255,140,122,0.08), rgba(44,95,111,0.05))',
          border: '1px solid rgba(255,140,122,0.12)', borderRadius: '20px', textAlign: 'center',
        }}>
        <h3 style={{ color: 'var(--text-h)', fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '12px' }}>
          ¿Tienes un proyecto en mente?
        </h3>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Ya sea una startup, un side project o solo una idea — me interesa escucharte.
        </p>
        <a href="mailto:harrymndz3@gmail.com"
          style={{
            display: 'inline-block', padding: '15px 40px',
            background: 'var(--accent)', borderRadius: '8px', color: '#fff',
            textDecoration: 'none', fontWeight: 700, fontSize: '15px',
            boxShadow: '0 0 40px rgba(255,140,122,0.3)', transition: 'all 0.25s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 60px rgba(255,140,122,0.5)' }}
          onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 0 40px rgba(255,140,122,0.3)' }}
        >
          Escríbeme →
        </a>
      </motion.div>
    </section>
  )
}
