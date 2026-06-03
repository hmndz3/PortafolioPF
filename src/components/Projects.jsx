import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    id: '01', name: 'PokerLedger',
    tagline: 'Sin más peleas por quién debe qué.',
    description: 'App web para el control de mesas de póker entre amigos. Registra jugadores, buy-ins, recompras y salidas. Calcula ganancias/pérdidas y genera la forma más eficiente de saldar deudas.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Railway'],
    github: 'https://github.com/hmndz3/PokerDeudasTracker-',
    highlight: 'Algoritmo de deudas mínimas + doble confirmación de pagos',
    color: '#6366f1',
  },
  {
    id: '02', name: 'MySoulMate',
    tagline: 'Matching universitario con grafos.',
    description: 'Sistema de recomendaciones estilo Tinder para estudiantes de UVG. Motor de matching sobre Neo4j con algoritmos de similitud para encontrar compatibilidad real.',
    tech: ['Python', 'Flask', 'Neo4j', 'Graph Algorithms'],
    github: 'https://github.com/joel55p/MySoulMate',
    highlight: 'Base de datos de grafos + algoritmos de recomendación',
    color: '#8b5cf6',
  },
  {
    id: '03', name: 'UVG Market',
    tagline: 'El marketplace que la U necesitaba.',
    description: 'Facebook Marketplace para estudiantes de UVG. Sin spam, sin ruido — solo estudiantes comprando y vendiendo entre ellos. App móvil nativa con categorías, búsqueda y mensajería.',
    tech: ['Kotlin', 'Android', 'Firebase', 'Jetpack Compose'],
    github: 'https://github.com/fatupopzz/uvg-market-mobile',
    highlight: 'App nativa Android para la comunidad universitaria',
    color: '#a78bfa',
  },
  {
    id: '04', name: 'Teleprogreso ERP',
    tagline: 'En producción. Cliente real.',
    description: 'Sistema web para empresa real. Gestiona activos, inventario, empleados y tareas asignadas. Proyecto activo con impacto directo en las operaciones de la empresa.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
    github: 'https://github.com/Gotkissss/Proyecto-Software-Teleprogreso',
    highlight: 'En producción — datos y decisiones reales',
    color: '#c084fc', badge: 'Live',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      style={{
        background: 'rgba(22,22,31,0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '20px',
        padding: '32px',
        display: 'flex', flexDirection: 'column', gap: '20px',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = project.color + '35' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
    >
      {/* Top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)`,
      }} />

      {/* Background number */}
      <div className="mono" style={{
        position: 'absolute', bottom: '-10px', right: '20px',
        fontSize: '100px', fontWeight: 900, color: project.color,
        opacity: 0.04, lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
      }}>{project.id}</div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span className="mono" style={{ color: project.color, fontSize: '11px', fontWeight: 700, opacity: 0.6 }}>{project.id}</span>
            {project.badge && (
              <span style={{
                background: `${project.color}20`, border: `1px solid ${project.color}40`,
                borderRadius: '4px', padding: '2px 8px', fontSize: '10px',
                color: project.color, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'monospace',
              }}>{project.badge}</span>
            )}
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-0.5px', marginBottom: '3px' }}>{project.name}</h3>
          <p style={{ color: project.color, fontSize: '13px', fontWeight: 500 }}>{project.tagline}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '36px', height: '36px', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px', color: 'var(--text)', textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color + '60'; e.currentTarget.style.color = 'var(--text-h)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text)' }}
            ><Github size={15} /></a>
          )}
        </div>
      </div>

      <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.75 }}>{project.description}</p>

      <div style={{
        padding: '10px 14px', borderRadius: '8px',
        background: `${project.color}08`, border: `1px solid ${project.color}18`,
        fontSize: '13px', color: 'var(--text)',
      }}>
        → {project.highlight}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {project.tech.map(t => (
          <span key={t} className="mono" style={{
            padding: '4px 10px', background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '4px', fontSize: '11px', color: 'var(--text)', fontWeight: 500,
          }}>{t}</span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="proyectos" style={{
      padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,120px)',
      maxWidth: '1200px', margin: '0 auto',
    }}>
      <motion.div ref={ref}
        initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }} style={{ marginBottom: '72px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500 }}>
          02 / proyectos
        </span>
        <h2 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-2px', marginTop: '8px', lineHeight: 1.05 }}>
          Lo que he construido
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '14px', maxWidth: '480px', lineHeight: 1.6 }}>
          Proyectos reales con stack completo. Algunos para clase, uno en producción.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
