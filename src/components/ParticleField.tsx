import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { randomBetween } from '../lib/random'

interface ParticleConfig {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  drift: number
}

interface ParticleFieldProps {
  count?: number
  dim?: boolean
  className?: string
}

/** Partículas de brillo que ascienden lentamente, como polvo de mariposa. */
export function ParticleField({ count = 26, dim = false, className = '' }: ParticleFieldProps) {
  const particles = useMemo<ParticleConfig[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: randomBetween(0, 100),
        size: randomBetween(2, 5),
        duration: randomBetween(6, 14),
        delay: randomBetween(0, 8),
        drift: randomBetween(-10, 10),
      })),
    [count],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            background:
              'radial-gradient(circle, rgba(230,201,255,0.95) 0%, rgba(180,142,224,0.1) 70%)',
          }}
          animate={{
            y: ['0vh', '-105vh'],
            x: [0, p.drift * 4],
            opacity: dim ? [0, 0.3, 0] : [0, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
