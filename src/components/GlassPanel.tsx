import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div
      className={`rounded-3xl border border-white/15 bg-white/8 shadow-[0_8px_40px_rgba(124,77,189,0.35)] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  )
}
