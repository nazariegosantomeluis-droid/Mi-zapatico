import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Butterfly } from './Butterfly'
import { randomBetween, randomItem } from '../lib/random'

const PALETTE = ['#c9a6f5', '#b48ee0', '#d9c2f5', '#9b6fd4', '#e6c9ff'] as const

export type ButterflyFieldMode = 'ambient' | 'converge' | 'rise'

interface ButterflyConfig {
  id: number
  baseX: number
  baseY: number
  driftX: number
  driftY: number
  size: number
  color: string
  flapDuration: number
  duration: number
  delay: number
  riseDelay: number
}

interface ButterflyFieldProps {
  count?: number
  mode?: ButterflyFieldMode
  dim?: boolean
  className?: string
}

export function ButterflyField({
  count = 10,
  mode = 'ambient',
  dim = false,
  className = '',
}: ButterflyFieldProps) {
  const butterflies = useMemo<ButterflyConfig[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        baseX: randomBetween(4, 92),
        baseY: randomBetween(6, 88),
        driftX: randomBetween(-14, 14),
        driftY: randomBetween(-16, 16),
        size: randomBetween(28, 56),
        color: randomItem(PALETTE),
        flapDuration: randomBetween(0.35, 0.7),
        duration: randomBetween(7, 13),
        delay: randomBetween(0, 4),
        riseDelay: randomBetween(0, 1.4),
      })),
    [count],
  )

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {butterflies.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.baseX}%`, top: `${b.baseY}%` }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={
            mode === 'ambient'
              ? {
                  opacity: dim ? 0.35 : 0.9,
                  scale: 1,
                  left: [`${b.baseX}%`, `${b.baseX + b.driftX}%`, `${b.baseX}%`],
                  top: [`${b.baseY}%`, `${b.baseY + b.driftY}%`, `${b.baseY}%`],
                  rotate: [-6, 6, -6],
                }
              : mode === 'converge'
                ? {
                    opacity: 0.55,
                    scale: 0.7,
                    left: `${50 + randomBetween(-6, 6)}%`,
                    top: `${44 + randomBetween(-4, 4)}%`,
                    rotate: 0,
                  }
                : {
                    opacity: [0.9, 0.6, 0],
                    scale: [1, 0.9, 0.7],
                    top: '-15%',
                    left: `${b.baseX + randomBetween(-10, 10)}%`,
                  }
          }
          transition={
            mode === 'ambient'
              ? {
                  duration: b.duration,
                  delay: b.delay,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                }
              : mode === 'converge'
                ? { duration: 3.2, ease: 'easeInOut' }
                : { duration: randomBetween(4.5, 7.5), delay: b.riseDelay, ease: 'easeIn' }
          }
        >
          <Butterfly size={b.size} color={b.color} glow flapDuration={b.flapDuration} />
        </motion.div>
      ))}
    </div>
  )
}
