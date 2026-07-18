import { motion } from 'framer-motion'
import { randomBetween } from '../lib/random'

interface PolaroidCardProps {
  src: string
  alt: string
  index: number
}

export function PolaroidCard({ src, alt, index }: PolaroidCardProps) {
  const baseTilt = [-6, 4, -3, 6][index % 4]
  const floatDuration = randomBetween(6, 9)
  const floatDelay = index * 0.35

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 30, rotate: baseTilt * 2 }}
      whileInView={{ opacity: 1, scale: 1, y: 0, rotate: baseTilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: 'easeOut' }}
      className="relative"
      style={{ transformOrigin: 'center' }}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [baseTilt, baseTilt + (baseTilt > 0 ? 3 : -3), baseTilt],
        }}
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.05, rotate: 0, y: -6 }}
        className="w-44 rounded-sm bg-gradient-to-b from-blossom to-lavender/90 p-3 pb-6 shadow-[0_20px_45px_rgba(36,19,56,0.55)] sm:w-56"
      >
        <div className="overflow-hidden rounded-[2px] bg-night">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="mt-2 flex justify-center">
          <span className="text-xs text-orchid/70" aria-hidden="true">
            ✦ 💜 ✦
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
