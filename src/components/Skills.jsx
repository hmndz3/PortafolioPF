import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const categories = [
  {
    label: 'Languages',
    icon: '{ }',
    items: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Elixir', level: 75 },
      { name: 'JavaScript', level: 70 },
      { name: 'C++', level: 55 },
      { name: 'Kotlin', level: 55 },
    ],
  },
  {
    label: 'Backend & DB',
    icon: '⚙',
    items: [
      { name: 'FastAPI', level: 88 },
      { name: 'SQLAlchemy', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'Neo4j', level: 65 },
      { name: 'Alembic', level: 80 },
      { name: 'JWT / Auth', level: 78 },
    ],
  },
  {
    label: 'Frontend',
    icon: '◈',
    items: [
      { name: 'React + Vite', level: 80 },
      { name: 'Tailwind CSS', level: 75 },
      { name: 'Framer Motion', level: 65 },
      { name: 'Axios', level: 78 },
    ],
  },
  {
    label: 'DevOps & Networks',
    icon: '⬡',
    items: [
      { name: 'Docker', level: 82 },
      { name: 'Railway', level: 78 },
      { name: 'Mikrotik', level: 70 },
      { name: 'OTT / IPTV', level: 68 },
      { name: 'Git', level: 85 },
    ],
  },
]

const certs = [
  {
    title: 'Curso OTT & IPTV',
    issuer: 'Wantelco',
    year: '2022',
    desc: 'Implementación de plataformas de streaming OTT/IPTV sobre infraestructura de red.',
  },
  {
    title: 'Mikrotik RouterOS',
    issuer: 'Certificación técnica',
    year: '2022',
    desc: 'Configuración y administración de equipos Mikrotik para redes empresariales.',
  },
]

function SkillBar({ name, level, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <div ref={ref} style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{name}</span>
        <span className="mono" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{
        height: '4px',
        background: 'var(--border)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, #6366f1, #8b5cf6)`,
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  )
}

function CategoryCard({ cat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: 'var(--accent)',
          fontSize: '16px',
          fontWeight: 600,
        }}>{cat.icon}</span>
        <h3 style={{
          color: 'var(--text-h)',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '-0.3px',
        }}>{cat.label}</h3>
      </div>
      {cat.items.map((item, i) => (
        <SkillBar key={item.name} name={item.name} level={item.level} delay={i * 0.06} />
      ))}
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="skills"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
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
          03 / skills
        </span>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: 'var(--text-h)',
          letterSpacing: '-1.5px',
          marginTop: '8px',
          lineHeight: 1.1,
        }}>
          What I work with
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '12px', maxWidth: '480px' }}>
          No exageré nada. Los porcentajes reflejan con qué tan cómodo me siento en cada tecnología.
        </p>
      </motion.div>

      {/* Skills grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        marginBottom: '64px',
      }}>
        {categories.map((cat, i) => (
          <CategoryCard key={cat.label} cat={cat} index={i} />
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <h3 style={{
          color: 'var(--text-h)',
          fontSize: '18px',
          fontWeight: 700,
          letterSpacing: '-0.5px',
          marginBottom: '24px',
        }}>
          Certifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {certs.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '20px 24px',
              }}
            >
              <div style={{
                width: '40px', height: '40px',
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '18px' }}>🏆</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h4 style={{ color: 'var(--text-h)', fontWeight: 600, fontSize: '15px' }}>
                    {cert.title}
                  </h4>
                  <span style={{
                    color: 'var(--accent)', fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                  }}>
                    {cert.issuer} · {cert.year}
                  </span>
                </div>
                <p style={{ color: 'var(--text)', fontSize: '13px', marginTop: '4px', lineHeight: 1.6 }}>
                  {cert.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
