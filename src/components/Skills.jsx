import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  { label: 'Lenguajes', icon: '{ }', items: [
    { name: 'Python', level: 90 }, { name: 'Java', level: 85 },
    { name: 'Elixir', level: 75 }, { name: 'JavaScript', level: 70 },
    { name: 'C++', level: 55 }, { name: 'Kotlin', level: 55 },
  ]},
  { label: 'Backend & BD', icon: '⚙', items: [
    { name: 'FastAPI', level: 88 }, { name: 'SQLAlchemy', level: 85 },
    { name: 'PostgreSQL', level: 82 }, { name: 'Neo4j', level: 65 },
    { name: 'Alembic', level: 80 }, { name: 'JWT / Auth', level: 78 },
  ]},
  { label: 'Frontend', icon: '◈', items: [
    { name: 'React + Vite', level: 80 }, { name: 'Tailwind CSS', level: 75 },
    { name: 'Framer Motion', level: 65 }, { name: 'Axios', level: 78 },
  ]},
  { label: 'DevOps & Redes', icon: '⬡', items: [
    { name: 'Docker', level: 82 }, { name: 'Railway', level: 78 },
    { name: 'Mikrotik', level: 70 }, { name: 'OTT / IPTV', level: 68 },
    { name: 'Git', level: 85 },
  ]},
]

const certs = [
  { title: 'Curso OTT & IPTV', issuer: 'Wantelco', year: '2022', desc: 'Implementación de plataformas de streaming sobre infraestructura de red.' },
  { title: 'Mikrotik RouterOS', issuer: 'Certificación técnica', year: '2022', desc: 'Configuración y administración de equipos Mikrotik para redes empresariales.' },
]

function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  return (
    <div ref={ref} style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{name}</span>
        <span className="mono" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700 }}>{level}%</span>
      </div>
      <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ height: '100%', background: `linear-gradient(90deg, #6366f1, #8b5cf6)`, borderRadius: '2px' }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      style={{
        background: 'rgba(22,22,31,0.6)', backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px', padding: '28px',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '16px', fontWeight: 700 }}>{cat.icon}</span>
        <h3 style={{ color: 'var(--text-h)', fontSize: '15px', fontWeight: 700, letterSpacing: '-0.3px' }}>{cat.label}</h3>
      </div>
      {cat.items.map((item, i) => <SkillBar key={item.name} name={item.name} level={item.level} delay={i * 0.05} />)}
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="habilidades" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,120px)',
      maxWidth: '1200px', margin: '0 auto',
    }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} style={{ marginBottom: '72px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          03 / habilidades
        </span>
        <h2 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-2px', marginTop: '8px', lineHeight: 1.05 }}>
          Con qué trabajo
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '14px', maxWidth: '480px', lineHeight: 1.6 }}>
          Sin exagerar. Los porcentajes reflejan qué tan cómodo me siento en cada tecnología.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '60px' }}>
        {categories.map((cat, i) => <CategoryCard key={cat.label} cat={cat} index={i} />)}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h3 style={{ color: 'var(--text-h)', fontSize: '16px', fontWeight: 700, letterSpacing: '-0.3px', marginBottom: '20px' }}>
          Certificaciones
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {certs.map((cert, i) => (
            <motion.div key={cert.title}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '20px',
                background: 'rgba(22,22,31,0.6)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '20px 24px',
              }}>
              <div style={{
                width: '42px', height: '42px', flexShrink: 0,
                background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
              }}>🏆</div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <h4 style={{ color: 'var(--text-h)', fontWeight: 700, fontSize: '15px' }}>{cert.title}</h4>
                  <span className="mono" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700 }}>
                    {cert.issuer} · {cert.year}
                  </span>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '13px', lineHeight: 1.6 }}>{cert.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
