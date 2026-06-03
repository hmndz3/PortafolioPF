import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const timeline = [
  { year: '8 anos', text: 'Decidi que iba a ser ingeniero en sistemas. Ahora lo estoy cumpliendo.' },
  { year: '2022', text: 'Certificacion OTT e IPTV en Wantelco. Certificacion Mikrotik.' },
  { year: '2023', text: 'Primer proyecto backend en produccion. Graduacion de bachillerato.' },
  { year: '2024 - hoy', text: 'Tercer ano en UVG. Proyectos con grafos, APIs, Docker y Railway.' },
]

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const photoY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['3%', '-3%'])
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="sobre-mi" ref={sectionRef} style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,120px)', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: '72px' }}>
        <span className="mono" style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>01 / sobre mi</span>
        <h2 style={{ fontSize: 'clamp(36px,6vw,60px)', fontWeight: 800, color: 'var(--text-h)', letterSpacing: '-2px', marginTop: '8px', lineHeight: 1.05 }}>Quien soy</h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>
        <motion.div style={{ y: photoY, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <FadeUp>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                position: 'absolute', inset: '-16px', borderRadius: '24px',
                background: 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)', filter: 'blur(20px)',
              }} />
              <div style={{
                width: '300px', height: '340px', borderRadius: '18px', overflow: 'hidden',
                border: '1px solid var(--border)', position: 'relative', zIndex: 1,
                background: 'var(--surface)', boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              }}>
                <img src="/photos/profile.jpg" alt="Harry Mendez"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  onError={e => e.target.style.display = 'none'}
                />
              </div>
              <div style={{ position: 'absolute', top: '-8px', left: '-8px', width: '24px', height: '24px', borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)', zIndex: 2 }} />
              <div style={{ position: 'absolute', bottom: '-8px', right: '-8px', width: '24px', height: '24px', borderBottom: '2px solid var(--accent2)', borderRight: '2px solid var(--accent2)', zIndex: 2 }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div style={{
              padding: '20px 24px',
              background: 'var(--surface)', backdropFilter: 'blur(16px)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: '0 12px 12px 0',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              maxWidth: '320px',
            }}>
              <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '10px' }}>
                "Y todo lo que hagan, de palabra o de obra, haganlo en el nombre del Senor Jesus, dando gracias a Dios el Padre por medio de el."
              </p>
              <span className="mono" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em' }}>Colosenses 3:17</span>
            </div>
          </FadeUp>
        </motion.div>

        <motion.div style={{ y: textY, display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <FadeUp delay={0.1}>
            <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', lineHeight: 1.85, color: 'var(--text)', marginBottom: '16px' }}>
              Desde los 8 anos supe que queria ser ingeniero en sistemas. Me crie rodeado de tecnologia: mi papa tiene un ISP, asi que redes, servidores y procesos no son solo temas de clase, son parte de mi historia.
            </p>
            <p style={{ fontSize: 'clamp(15px,1.8vw,17px)', lineHeight: 1.85, color: 'var(--text)' }}>
              Me gusta aprender haciendo, no viendo. Experimento, rompo cosas y las arreglo. Actualmente en tercer ano de CS en la Universidad del Valle de Guatemala.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h3 className="mono" style={{ color: 'var(--text-h)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '24px' }}>Trayectoria</h3>
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 + 0.1, type: 'spring' }}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', marginTop: '5px', boxShadow: '0 0 12px rgba(8,145,178,0.4)' }} />
                  {i < timeline.length - 1 && <div style={{ width: '1px', flexGrow: 1, background: 'linear-gradient(to bottom, rgba(8,145,178,0.3), transparent)', minHeight: '36px' }} />}
                </div>
                <div style={{ paddingBottom: i < timeline.length - 1 ? '28px' : '0' }}>
                  <span className="mono" style={{ color: 'var(--accent)', fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>{item.year}</span>
                  <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.65 }}>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </FadeUp>
        </motion.div>
      </div>
    </section>
  )
}
