import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Github, Phone, MessageSquare } from 'lucide-react'

const contacts = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'harrymndz3@gmail.com',
    href: 'mailto:harrymndz3@gmail.com',
    desc: 'Mejor medio para trabajo o proyectos',
  },
  {
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'github.com/hmndz3',
    href: 'https://github.com/hmndz3',
    desc: 'Mira el código, no solo las palabras',
  },
  {
    icon: <Phone size={20} />,
    label: 'Phone / WhatsApp',
    value: '+502 5610 3183',
    href: 'https://wa.me/50256103183',
    desc: 'Guatemala 🇬🇹',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '64px' }}
      >
        <span className="mono" style={{
          color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.15em',
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          04 / contact
        </span>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: 'var(--text-h)',
          letterSpacing: '-1.5px',
          marginTop: '8px',
          lineHeight: 1.1,
        }}>
          Let's talk
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '12px', maxWidth: '480px' }}>
          Abierto a oportunidades, proyectos interesantes o cualquier conversación técnica. Respondo rápido.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {contacts.map((c, i) => (
          <motion.a
            key={c.label}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              padding: '28px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <div style={{
              width: '44px', height: '44px',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--accent)',
            }}>
              {c.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text)', fontSize: '12px', fontWeight: 500, marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {c.label}
              </p>
              <p style={{ color: 'var(--text-h)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                {c.value}
              </p>
              <p style={{ color: 'var(--text)', fontSize: '13px' }}>
                {c.desc}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          marginTop: '60px',
          padding: '48px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))',
          border: '1px solid rgba(99,102,241,0.15)',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <MessageSquare size={32} style={{ color: 'var(--accent)', marginBottom: '16px' }} />
        <h3 style={{
          color: 'var(--text-h)',
          fontSize: 'clamp(22px, 3vw, 30px)',
          fontWeight: 700,
          letterSpacing: '-0.8px',
          marginBottom: '12px',
        }}>
          ¿Tienes un proyecto en mente?
        </h3>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginBottom: '28px', maxWidth: '400px', margin: '0 auto 28px' }}>
          Ya sea una startup, un side project o algo que todavía es solo una idea — me interesa escucharte.
        </p>
        <a
          href="mailto:harrymndz3@gmail.com"
          style={{
            display: 'inline-block',
            padding: '14px 36px',
            background: 'var(--accent)',
            borderRadius: '8px',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '15px',
            boxShadow: '0 0 40px rgba(99,102,241,0.3)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 0 60px rgba(99,102,241,0.5)' }}
          onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 40px rgba(99,102,241,0.3)' }}
        >
          Escríbeme →
        </a>
      </motion.div>
    </section>
  )
}
