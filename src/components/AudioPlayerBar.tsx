import { motion } from 'framer-motion'
import { GlassPanel } from './GlassPanel'
import { formatTime } from '../lib/formatTime'

interface AudioPlayerBarProps {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  onToggle: () => void
  onSeek: (time: number) => void
  onVolumeChange: (value: number) => void
  onRestart: () => void
}

export function AudioPlayerBar({
  isPlaying,
  currentTime,
  duration,
  volume,
  onToggle,
  onSeek,
  onVolumeChange,
  onRestart,
}: AudioPlayerBarProps) {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4"
    >
      <GlassPanel className="flex w-full max-w-md items-center gap-3 px-4 py-3 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orchid to-lilac text-lg text-blossom shadow-[0_0_18px_rgba(180,142,224,0.6)]"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          type="button"
          onClick={onRestart}
          aria-label="Reiniciar canción"
          className="shrink-0 text-lg text-lavender/80 transition hover:text-blossom"
        >
          ⟲
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="w-9 shrink-0 text-right text-xs text-lavender/70">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            className="progress-bar w-full flex-1"
            style={{ ['--range-progress' as string]: `${progress}%` }}
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            aria-label="Progreso de la canción"
          />
          <span className="w-9 shrink-0 text-xs text-lavender/70">{formatTime(duration)}</span>
        </div>

        <input
          type="range"
          className="progress-bar hidden w-16 sm:block"
          style={{ ['--range-progress' as string]: `${volume * 100}%` }}
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          aria-label="Volumen"
        />
      </GlassPanel>
    </motion.div>
  )
}
