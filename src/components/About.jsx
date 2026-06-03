import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function Section({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

const timeline = [
  { year: '8 años', text: 'Decidí que iba a ser ingeniero en sistemas. Aún lo estoy siendo.' },
  { year: '2022', text: 'Curso certificado de implementación OTT & IPTV en Wantelco.' },
  { year: '2023', text: 'Certificación Mikrotik. Primer proyecto backend en producción.' },
  { year: '2024–', text: 'UVG, tercer año de CS. Proyectos reales: grafos, APIs, Docker, Railway.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 6vw, 120px)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section label */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        style={{ marginBottom: '64px' }}
      >
        <span className="mono" style={{
          color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.15em',
          textTransform: 'uppercase', fontWeight: 500,
        }}>
          01 / about
        </span>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 700,
          color: 'var(--text-h)',
          letterSpacing: '-1.5px',
          marginTop: '8px',
          lineHeight: 1.1,
        }}>
          Who I am
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '64px',
        alignItems: 'start',
      }}>
        {/* Left: photo + bible verse */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Section>
            {/* Profile photo */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                width: '280px',
                height: '280px',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                position: 'relative',
              }}>
                <img
                  src="/photos/profile.jpg"
                  alt="Harry Mendez"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.parentNode.style.background = 'linear-gradient(135deg, #1e1e2e, #2a2a3e)'
                    e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:64px;">👤</div>'
                  }}
                />
              </div>
              {/* Floating accent border */}
              <div style={{
                position: 'absolute',
                top: '12px', left: '12px',
                width: '280px', height: '280px',
                borderRadius: '16px',
                border: '1px solid rgba(99,102,241,0.3)',
                zIndex: -1,
              }} />
            </div>
          </Section>

          {/* Bible verse */}
          <Section delay={0.1}>
            <blockquote style={{
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '20px',
              maxWidth: '340px',
            }}>
              <p style={{
                color: 'var(--text)',
                fontSize: '14px',
                lineHeight: 1.7,
                fontStyle: 'italic',
                marginBottom: '8px',
              }}>
                "Y todo lo que hagan, de palabra o de obra, háganlo en el nombre del Señor Jesús, dando gracias a Dios el Padre por medio de él."
              </p>
              <cite style={{
                color: 'var(--accent)',
                fontSize: '12px',
                fontWeight: 600,
                fontStyle: 'normal',
                letterSpacing: '0.05em',
                fontFamily: 'JetBrains Mono, monospace',
              }}>
                Colosenses 3:17
              </cite>
            </blockquote>
          </Section>
        </div>

        {/* Right: story + timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <Section delay={0.15}>
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              lineHeight: 1.8,
              color: 'var(--text)',
              marginBottom: '20px',
            }}>
              Desde los 8 años supe que quería ser ingeniero en sistemas — y aquí estoy cumpliéndolo.
              Me crie rodeado de tecnología: mi papá tiene un ISP, así que redes, servidores y procesos
              no son solo temas de clase; son parte de mi historia.
            </p>
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              lineHeight: 1.8,
              color: 'var(--text)',
            }}>
              Me gusta aprender haciendo, no viendo. Prefiero el backend y las bases de datos —
              pero si el front tiene que quedar bonito, lo hago quedar bonito. Actualmente en tercer año
              de CS en UVG, Guatemala.
            </p>
          </Section>

          {/* Timeline */}
          <Section delay={0.2}>
            <h3 style={{
              color: 'var(--text-h)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '24px',
              fontFamily: 'JetBrains Mono, monospace',
            }}>
              Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {timeline.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                  {/* Line */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--accent)', flexShrink: 0, marginTop: '6px',
                    }} />
                    {i < timeline.length - 1 && (
                      <div style={{ width: '1px', flexGrow: 1, background: 'var(--border)', minHeight: '32px' }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < timeline.length - 1 ? '24px' : '0' }}>
                    <span className="mono" style={{
                      color: 'var(--accent)', fontSize: '12px', fontWeight: 600,
                      display: 'block', marginBottom: '4px',
                    }}>
                      {item.year}
                    </span>
                    <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.6 }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </section>
  )
}
