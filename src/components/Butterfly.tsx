import { motion } from 'framer-motion'

interface ButterflyProps {
  size?: number
  color?: string
  glow?: boolean
  flapDuration?: number
}

/**
 * Mariposa vectorial original (no basada en ningún personaje protegido),
 * con aleteo animado mediante escala horizontal de cada par de alas.
 */
export function Butterfly({
  size = 48,
  color = '#c9a6f5',
  glow = false,
  flapDuration = 0.5,
}: ButterflyProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="-70 -60 140 120"
      style={glow ? { filter: `drop-shadow(0 0 10px ${color})` } : undefined}
    >
      <motion.g
        style={{ transformOrigin: '0px 0px' }}
        animate={{ scaleX: [1, 0.55, 1] }}
        transition={{ duration: flapDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,-4 C -14,-46 -58,-52 -66,-14 C -70,10 -46,26 -8,10 C -2,7 0,2 0,-4 Z"
          fill={color}
          opacity={0.95}
        />
        <path
          d="M0,6 C -10,34 -40,44 -50,24 C -55,12 -34,10 0,22 Z"
          fill={color}
          opacity={0.7}
        />
      </motion.g>
      <motion.g
        style={{ transformOrigin: '0px 0px' }}
        animate={{ scaleX: [1, 0.55, 1] }}
        transition={{ duration: flapDuration, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0,-4 C 14,-46 58,-52 66,-14 C 70,10 46,26 8,10 C 2,7 0,2 0,-4 Z"
          fill={color}
          opacity={0.95}
        />
        <path
          d="M0,6 C 10,34 40,44 50,24 C 55,12 34,10 0,22 Z"
          fill={color}
          opacity={0.7}
        />
      </motion.g>
      <rect x={-2.5} y={-30} width={5} height={40} rx={2.5} fill="#2a1740" />
      <circle cx={0} cy={-30} r={4} fill="#2a1740" />
    </svg>
  )
}
