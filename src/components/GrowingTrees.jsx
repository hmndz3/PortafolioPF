// Side decorations — pure CSS animations, zero canvas, zero JS per frame
// Geometric shapes + code symbols that float slowly on both sides

const LEFT_ITEMS = [
  { type: 'symbol', text: '{  }',   top: '8%',  size: 13, delay: 0,    dur: 18, opacity: 0.13 },
  { type: 'dot',    text: '',       top: '15%', size: 7,  delay: 2,    dur: 14, opacity: 0.18 },
  { type: 'symbol', text: '//',     top: '23%', size: 11, delay: 5,    dur: 20, opacity: 0.11 },
  { type: 'hex',    text: '',       top: '33%', size: 28, delay: 1,    dur: 16, opacity: 0.08 },
  { type: 'symbol', text: '=>',     top: '42%', size: 12, delay: 7,    dur: 22, opacity: 0.13 },
  { type: 'dot',    text: '',       top: '51%', size: 5,  delay: 3,    dur: 13, opacity: 0.20 },
  { type: 'ring',   text: '',       top: '60%', size: 36, delay: 0,    dur: 25, opacity: 0.07 },
  { type: 'symbol', text: '< />',   top: '70%', size: 11, delay: 9,    dur: 19, opacity: 0.12 },
  { type: 'dot',    text: '',       top: '79%', size: 9,  delay: 4,    dur: 15, opacity: 0.15 },
  { type: 'symbol', text: '( )',    top: '88%', size: 13, delay: 6,    dur: 21, opacity: 0.11 },
  { type: 'hex',    text: '',       top: '94%', size: 20, delay: 2,    dur: 17, opacity: 0.09 },
]

const RIGHT_ITEMS = [
  { type: 'ring',   text: '',       top: '5%',  size: 40, delay: 3,    dur: 20, opacity: 0.07 },
  { type: 'symbol', text: '[ ]',   top: '13%', size: 12, delay: 0,    dur: 17, opacity: 0.13 },
  { type: 'dot',    text: '',       top: '21%', size: 6,  delay: 5,    dur: 14, opacity: 0.19 },
  { type: 'symbol', text: 'fn()',   top: '30%', size: 11, delay: 8,    dur: 23, opacity: 0.11 },
  { type: 'hex',    text: '',       top: '40%', size: 32, delay: 1,    dur: 18, opacity: 0.08 },
  { type: 'dot',    text: '',       top: '49%', size: 8,  delay: 6,    dur: 16, opacity: 0.17 },
  { type: 'symbol', text: '===',    top: '58%', size: 11, delay: 2,    dur: 20, opacity: 0.12 },
  { type: 'ring',   text: '',       top: '67%', size: 28, delay: 4,    dur: 22, opacity: 0.08 },
  { type: 'symbol', text: '0x1F',   top: '76%', size: 10, delay: 7,    dur: 19, opacity: 0.11 },
  { type: 'dot',    text: '',       top: '85%', size: 11, delay: 1,    dur: 15, opacity: 0.16 },
  { type: 'symbol', text: '&&',     top: '92%', size: 13, delay: 9,    dur: 18, opacity: 0.12 },
]

const COLORS = [
  '#FF8C7A',  // coral
  '#2C5F6F',  // teal
  '#B8E4D3',  // mint
  '#D6C4F0',  // lavender
  '#FFB899',  // peach
]

function SideItem({ item, side, index }) {
  const color = COLORS[index % COLORS.length]
  const x = side === 'left'
    ? `${4 + (index % 3) * 4}%`
    : `${88 - (index % 3) * 4}%`

  const floatName = `sideFloat${side}${index}`

  const baseStyle = {
    position: 'fixed',
    top: item.top,
    left: side === 'left' ? x : undefined,
    right: side === 'right' ? `calc(100% - ${x} - ${item.size}px)`.replace('100% - ', '') : undefined,
    opacity: item.opacity,
    color,
    animation: `${floatName} ${item.dur}s ease-in-out ${item.delay}s infinite`,
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 0,
    willChange: 'transform',
  }

  if (side === 'right') {
    delete baseStyle.left
    baseStyle.right = `${4 + (index % 3) * 4}%`
  }

  const keyframes = `
    @keyframes ${floatName} {
      0%,100% { transform: translateY(0px) rotate(0deg); }
      33%     { transform: translateY(-${8 + (index % 4) * 4}px) rotate(${side === 'left' ? '' : '-'}${(index % 3) * 2}deg); }
      66%     { transform: translateY(${4 + (index % 3) * 3}px) rotate(${side === 'left' ? '-' : ''}${(index % 2) * 3}deg); }
    }
  `

  if (item.type === 'symbol') {
    return (
      <>
        <style>{keyframes}</style>
        <span style={{
          ...baseStyle,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: item.size,
          fontWeight: 500,
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
        }}>
          {item.text}
        </span>
      </>
    )
  }

  if (item.type === 'dot') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={{
          ...baseStyle,
          width: item.size,
          height: item.size,
          borderRadius: '50%',
          background: color,
          opacity: item.opacity,
        }} />
      </>
    )
  }

  if (item.type === 'ring') {
    return (
      <>
        <style>{keyframes}</style>
        <div style={{
          ...baseStyle,
          width: item.size,
          height: item.size,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          background: 'transparent',
        }} />
      </>
    )
  }

  if (item.type === 'hex') {
    return (
      <>
        <style>{keyframes}</style>
        <svg
          width={item.size} height={item.size * 1.15}
          style={{ ...baseStyle, overflow: 'visible' }}
          viewBox="0 0 100 115"
        >
          <polygon
            points="50,0 100,28.75 100,86.25 50,115 0,86.25 0,28.75"
            fill="none"
            stroke={color}
            strokeWidth="6"
          />
        </svg>
      </>
    )
  }

  return null
}

export default function SideDecorations() {
  return (
    <>
      {LEFT_ITEMS.map((item, i) => (
        <SideItem key={`l${i}`} item={item} side="left"  index={i} />
      ))}
      {RIGHT_ITEMS.map((item, i) => (
        <SideItem key={`r${i}`} item={item} side="right" index={i} />
      ))}
    </>
  )
}
