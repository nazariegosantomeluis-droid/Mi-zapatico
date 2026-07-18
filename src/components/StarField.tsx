import { useMemo } from 'react'
import { randomBetween } from '../lib/random'

interface StarConfig {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface StarFieldProps {
  count?: number
  dim?: boolean
  className?: string
}

export function StarField({ count = 90, dim = false, className = '' }: StarFieldProps) {
  const stars = useMemo<StarConfig[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: randomBetween(0, 100),
        y: randomBetween(0, 100),
        size: randomBetween(1, 2.6),
        duration: randomBetween(2, 5),
        delay: randomBetween(0, 4),
      })),
    [count],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute animate-twinkle rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: dim ? 0.3 : 0.8,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            boxShadow: '0 0 6px 1px rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>
  )
}
