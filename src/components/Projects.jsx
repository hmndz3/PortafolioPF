import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: '01',
    name: 'PokerLedger',
    tagline: 'No más peleas por quién debe qué.',
    description:
      'Web app para llevar el control de mesas de póker entre amigos. Registra jugadores, buy-ins, recompras y salidas. Calcula ganancias/pérdidas y genera automáticamente la forma más eficiente de saldar deudas (mínimas transacciones).',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT', 'Docker', 'Railway'],
    github: 'https://github.com/hmndz3/PokerDeudasTracker-',
    demo: null,
    highlight: 'Algoritmo de simplificación de deudas + doble confirmación de pagos',
    color: '#6366f1',
  },
  {
    id: '02',
    name: 'MySoulMate',
    tagline: 'Matching universitario con grafos.',
    description:
      'Sistema de recomendaciones tipo Tinder para estudiantes de la Universidad del Valle. Motor de matching basado en base de datos de grafos (Neo4j) con algoritmos de similitud para encontrar compatibilidad real entre usuarios.',
    tech: ['Python', 'Flask', 'Neo4j', 'Graph Algorithms', 'PostgreSQL'],
    github: 'https://github.com/joel55p/MySoulMate',
    demo: null,
    highlight: 'Base de datos de grafos + algoritmos de recomendación',
    color: '#8b5cf6',
  },
  {
    id: '03',
    name: 'UVG Market',
    tagline: 'El marketplace que la U necesitaba.',
    description:
      'Facebook Marketplace para estudiantes de UVG. Sin spam, sin ruido — solo estudiantes comprando y vendiendo entre ellos. App móvil nativa con categorías, búsqueda y mensajería directa.',
    tech: ['Kotlin', 'Android', 'Firebase', 'Jetpack Compose'],
    github: 'https://github.com/fatupopzz/uvg-market-mobile',
    demo: null,
    highlight: 'App nativa Android para la comunidad universitaria',
    color: '#a78bfa',
  },
  {
    id: '04',
    name: 'Teleprogreso ERP',
    tagline: 'Gestión de activos en producción.',
    description:
      'Sistema web para una empresa real. Gestiona activos, inventario, lista de empleados, tareas asignadas por empleado y ubicación. Actualmente en producción — proyecto real con impacto real.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
    github: 'https://github.com/Gotkissss/Proyecto-Software-Teleprogreso',
    demo: null,
    highlight: 'En producción — cliente real, datos reales',
    color: '#c084fc',
    badge: 'Live',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
        cursor: 'default',
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = project.color + '40'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
        opacity: 0.6,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <span className="mono" style={{ color: project.color, fontSize: '11px', fontWeight: 600, opacity: 0.7 }}>
              {project.id}
            </span>
            {project.badge && (
              <span style={{
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: '4px',
                padding: '2px 8px',
                fontSize: '10px',
                color: 'var(--accent)',
                fontWeight: 600,
                letterSpacing: '0.05em',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                {project.badge}
              </span>
            )}
          </div>
          <h3 style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text-h)',
            letterSpacing: '-0.5px',
            marginBottom: '4px',
          }}>
            {project.name}
          </h3>
          <p style={{ color: project.color, fontSize: '13px', fontWeight: 500 }}>
            {project.tagline}
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color + '60'; e.currentTarget.style.color = 'var(--text-h)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            >
              <Github size={15} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.7 }}>
        {project.description}
      </p>

      {/* Highlight */}
      <div style={{
        background: 'rgba(99,102,241,0.06)',
        border: '1px solid rgba(99,102,241,0.12)',
        borderRadius: '8px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <ArrowUpRight size={14} style={{ color: project.color, flexShrink: 0 }} />
        <span style={{ color: 'var(--text)', fontSize: '13px' }}>{project.highlight}</span>
      </div>

      {/* Tech stack */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {project.tech.map(t => (
          <span key={t} className="mono" style={{
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            fontSize: '11px',
            color: 'var(--text)',
            fontWeight: 500,
          }}>
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="projects"
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
          02 / projects
        </span>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: 'var(--text-h)',
          letterSpacing: '-1.5px',
          marginTop: '8px',
          lineHeight: 1.1,
        }}>
          Things I've built
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '12px', maxWidth: '480px' }}>
          Proyectos reales con stack completo. Algunos para clase, uno en producción.
        </p>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '24px',
      }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
