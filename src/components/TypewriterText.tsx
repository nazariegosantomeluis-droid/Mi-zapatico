import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  text: string
  className?: string
  letterDelayMs?: number
  startDelayMs?: number
  onComplete?: () => void
}

/** Revela un texto letra por letra, con un pequeño cursor parpadeante. */
export function TypewriterText({
  text,
  className = '',
  letterDelayMs = 55,
  startDelayMs = 0,
  onComplete,
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    setVisibleCount(0)
    let cancelled = false
    let index = 0

    const startTimeout = setTimeout(() => {
      const tick = () => {
        if (cancelled) return
        index += 1
        setVisibleCount(index)
        if (index < text.length) {
          setTimeout(tick, letterDelayMs)
        } else {
          onCompleteRef.current?.()
        }
      }
      tick()
    }, startDelayMs)

    return () => {
      cancelled = true
      clearTimeout(startTimeout)
    }
  }, [text, letterDelayMs, startDelayMs])

  const isDone = visibleCount >= text.length

  return (
    <span className={className}>
      {text.slice(0, visibleCount)}
      {!isDone && (
        <motion.span
          aria-hidden="true"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
          className="ml-0.5 inline-block w-[2px] translate-y-[2px] bg-current align-middle"
          style={{ height: '0.9em' }}
        />
      )}
    </span>
  )
}
