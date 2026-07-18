import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Butterfly } from './Butterfly'
import { ParticleField } from './ParticleField'
import { PrimaryButton } from './PrimaryButton'
import { siteConfig } from '../config/site'

interface IntroSceneProps {
  onBegin: () => void
}

type IntroStep = 'flight' | 'greeting' | 'subtitle' | 'button'

export function IntroScene({ onBegin }: IntroSceneProps) {
  const [step, setStep] = useState<IntroStep>('flight')

  useEffect(() => {
    if (step !== 'flight') return
    const timer = setTimeout(() => setStep('greeting'), 4200)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step !== 'greeting') return
    const timer = setTimeout(() => setStep('subtitle'), 1700)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step !== 'subtitle') return
    const timer = setTimeout(() => setStep('button'), 2200)
    return () => clearTimeout(timer)
  }, [step])

  const showText = step === 'greeting' || step === 'subtitle' || step === 'button'

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      <ParticleField count={16} dim />

      <motion.div
        className="absolute"
        initial={{ left: '8%', top: '78%', opacity: 0 }}
        animate={{
          left: ['8%', '38%', '68%', '48%'],
          top: ['78%', '32%', '52%', '20%'],
          opacity: [0, 1, 1, 1],
          rotate: [-8, 6, -4, 4],
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      >
        <Butterfly size={54} color="#e6c9ff" glow flapDuration={0.4} />
      </motion.div>

      <AnimatePresence>
        {showText && (
          <motion.div
            key="intro-copy"
            className="relative z-10 flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="font-display text-3xl text-blossom sm:text-4xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
            >
              {siteConfig.textos.introSaludo}
            </motion.h1>

            {(step === 'subtitle' || step === 'button') && (
              <motion.p
                className="max-w-sm text-base text-lavender/90 sm:text-lg"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                {siteConfig.textos.introSubtitulo}
              </motion.p>
            )}

            {step === 'button' && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-4"
              >
                <PrimaryButton onClick={onBegin}>{siteConfig.textos.botonComenzar}</PrimaryButton>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
