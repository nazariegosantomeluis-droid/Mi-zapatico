import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { StarField } from './StarField'
import { ButterflyField } from './ButterflyField'
import { ParticleField } from './ParticleField'
import { PolaroidGallery } from './PolaroidGallery'
import { AudioPlayerBar } from './AudioPlayerBar'
import { SpecialMomentOverlay } from './SpecialMomentOverlay'
import { PrimaryButton } from './PrimaryButton'
import { siteConfig } from '../config/site'
import type { useAudioController } from '../hooks/useAudioController'

interface ExperienceSceneProps {
  audio: ReturnType<typeof useAudioController>
  started: boolean
  onStart: () => void
}

export function ExperienceScene({ audio, started, onStart }: ExperienceSceneProps) {
  const [specialActive, setSpecialActive] = useState(false)
  const specialShownRef = useRef(false)

  useEffect(() => {
    if (!started || specialShownRef.current || audio.duration <= 0) return
    const threshold = audio.duration * siteConfig.momentoEspecialFraccion
    if (audio.currentTime < threshold) return

    specialShownRef.current = true
    setSpecialActive(true)
    const timer = setTimeout(
      () => setSpecialActive(false),
      siteConfig.momentoEspecialDuracionSegundos * 1000,
    )
    return () => clearTimeout(timer)
  }, [started, audio.currentTime, audio.duration])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-plum via-night to-void pb-28">
      <StarField count={80} dim={specialActive} />
      <ButterflyField
        count={12}
        mode={specialActive ? 'converge' : 'ambient'}
        dim={specialActive}
      />
      <ParticleField count={22} dim={specialActive} />

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center">
        {!started ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center gap-6 px-6 text-center"
          >
            <h2 className="font-display text-2xl text-blossom sm:text-3xl">
              Un pequeño regalo para ti, {siteConfig.apodo} 💜
            </h2>
            <PrimaryButton onClick={onStart}>{siteConfig.textos.playBoton}</PrimaryButton>
          </motion.div>
        ) : (
          <PolaroidGallery visible={!specialActive} />
        )}
      </div>

      <SpecialMomentOverlay active={specialActive} />

      {started && (
        <AudioPlayerBar
          isPlaying={audio.isPlaying}
          currentTime={audio.currentTime}
          duration={audio.duration}
          volume={audio.volume}
          onToggle={audio.toggle}
          onSeek={audio.seek}
          onVolumeChange={audio.setVolume}
          onRestart={audio.restart}
        />
      )}
    </div>
  )
}
