import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github } from 'lucide-react'

const projects = [
  {
    id: '01', name: 'PokerLedger', color: '#06b6d4',
    tagline: 'Sin mas peleas por quien debe que.',
    description: 'App web para el control de mesas de poker entre amigos. Registra jugadores, buy-ins, recompras y salidas. Calcula ganancias y perdidas, y genera la forma mas eficiente de saldar deudas.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'Railway'],
    github: 'https://github.com/hmndz3/PokerDeudasTracker-',
    highlight: 'Algoritmo de deudas minimas con doble confirmacion de pagos',
    preview: [
      '# Debt minimization algorithm',
      'def minimize_debts(balances):',
      '    creditors = sorted(...)',
      '    debtors = sorted(...)',
      '    transactions = []',
      '    while debtors and creditors:',
      '        settle(debtors, creditors)',
    ],
  },
  {
    id: '02', name: 'MySoulMate', color: '#e879f9',
    tagline: 'Matching universitario con grafos.',
    description: 'Sistema de recomendaciones estilo Tinder para estudiantes de UVG. Motor de matching sobre Neo4j con algoritmos de similitud para encontrar compatibilidad real entre usuarios.',
    tech: ['Python', 'Flask', 'Neo4j', 'Graph Algorithms'],
    github: 'https://github.com/joel55p/MySoulMate',
    highlight: 'Base de datos de grafos con algoritmos de recomendacion',
    preview: [
      'MATCH (u:User {id: $uid})',
      '-[:LIKES]->(:Tag)<-[:LIKES]-',
      '(other:User)',
      'WHERE NOT (u)-[:SEEN]->(other)',
      'WITH other,',
      '  count(*) AS common',
      'RETURN other ORDER BY common DESC',
    ],
  },
  {
    id: '03', name: 'UVG Market', color: '#a855f7',
    tagline: 'El marketplace que la U necesitaba.',
    description: 'Facebook Marketplace para estudiantes de UVG. Sin spam, sin ruido. Solo estudiantes comprando y vendiendo entre ellos. App movil nativa con categorias, busqueda y mensajeria directa.',
    tech: ['Kotlin', 'Android', 'Firebase', 'Jetpack Compose'],
    github: 'https://github.com/fatupopzz/uvg-market-mobile',
    highlight: 'App nativa Android para la comunidad universitaria',
    preview: [
      '@Composable',
      'fun ProductCard(item: Item) {',
      '  Card(modifier = Modifier',
      '    .fillMaxWidth()',
      '    .clickable { onOpen(item) }',
      '  ) {',
      '    AsyncImage(item.imageUrl)',
    ],
  },
  {
    id: '04', name: 'Teleprogreso ERP', color: '#06b6d4',
    tagline: 'En produccion. Cliente real.',
    description: 'Sistema web para empresa real. Gestiona activos, inventario, empleados y tareas asignadas. Proyecto activo con impacto directo en las operaciones de la empresa.',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Docker', 'SQLAlchemy'],
    github: 'https://github.com/Gotkissss/Proyecto-Software-Teleprogreso',
    highlight: 'En produccion con datos y decisiones reales',
    badge: 'Live',
    preview: [
      'router.get("/assets")',
      'async def list_assets(',
      '  db: Session = Depends(get_db),',
      '  current = Depends(get_user)',
      '):',
      '  return db.query(Asset)',
      '    .filter(Asset.active).all()',
    ],
  },
]

function CodePreview({ lines, color }) {
  return (
    <div style={{
      background: 'rgba(220,222,240,0.4)', backdropFilter: 'blur(8px)', borderRadius: '10px',
      padding: '16px', border: `1px solid ${color}20`,
      fontFamily: 'JetBrains Mono, monospace', fontSize: '11px',
      lineHeight: 1.7, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c, opacity: 0.8 }} />
        ))}
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{
          color: i === 0 ? `${color}` : i % 3 === 0 ? 'rgba(232,121,249,0.7)' : 'rgba(80,80,120,0.6)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          <span style={{ color: 'rgba(160,160,200,0.7)', marginRight: '12px', userSelect: 'none' }}>{i + 1}</span>
          {line}
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      style={{
        background: 'var(--surface)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--border)', borderRadius: '20px',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'relative', transition: 'all 0.3s', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}30` }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)' }}
    >
      {/* Top accent */}
      <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)` }} />

      {/* Code preview */}
      <div style={{ padding: '20px 20px 0' }}>
        <CodePreview lines={project.preview} color={project.color} />
      </div>

      {/* Content */}
      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="mono" style={{ color: project.color, fontSize: '10px', fontWeight: 700, opacity: 0.6 }}>{project.id}</span>
              {project.badge && (
                <span style={{
                  background: `${project.color}18`, border: `1px solid ${project.color}35`,
                  borderRadius: '4px', padding: '1px 7px', fontSize: '9px',
                  color: project.color, fontWeight: 700, letterSpacing: '0.1em', fontFamily: 'monospace',
                }}>{project.badge}</span>
              )}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-0.5px', marginBottom: '2px' }}>{project.name}</h3>
            <p style={{ color: project.color, fontSize: '12px', fontWeight: 500 }}>{project.tagline}</p>
          </div>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', border: '1px solid var(--border)',
                borderRadius: '8px', color: 'var(--text)', textDecoration: 'none', transition: 'all 0.2s', flexShrink: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${project.color}50`; e.currentTarget.style.color = project.color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)' }}
            ><Github size={14} /></a>
          )}
        </div>

        <p style={{ color: 'var(--text)', fontSize: '13px', lineHeight: 1.7 }}>{project.description}</p>

        <div style={{ padding: '8px 12px', borderRadius: '7px', background: `${project.color}06`, border: `1px solid ${project.color}15`, fontSize: '12px', color: 'var(--text)' }}>
          {project.highlight}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: 'auto' }}>
          {project.tech.map(t => (
            <span key={t} className="mono" style={{
              padding: '3px 9px', background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)', borderRadius: '4px',
              fontSize: '10px', color: 'var(--text)', fontWeight: 500,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="proyectos" style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,120px)', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '72px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
          02 / proyectos
        </span>
        <h2 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-2px', marginTop: '8px', lineHeight: 1.05 }}>
          Lo que he construido
        </h2>
        <p style={{ color: 'var(--text)', fontSize: '16px', marginTop: '14px', maxWidth: '480px', lineHeight: 1.6 }}>
          Proyectos reales con stack completo. Algunos para clase, uno en produccion.
        </p>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
      </div>
    </section>
  )
}
