import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StarField } from './StarField'
import { ButterflyField } from './ButterflyField'
import { PrimaryButton } from './PrimaryButton'
import { siteConfig } from '../config/site'

interface EndingSceneProps {
  onReplay: () => void
}

type EndingStep = 'sky' | 'thanks' | 'smile' | 'button'

export function EndingScene({ onReplay }: EndingSceneProps) {
  const [step, setStep] = useState<EndingStep>('sky')

  useEffect(() => {
    if (step !== 'sky') return
    const timer = setTimeout(() => setStep('thanks'), 2200)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step !== 'thanks') return
    const timer = setTimeout(() => setStep('smile'), 2600)
    return () => clearTimeout(timer)
  }, [step])

  useEffect(() => {
    if (step !== 'smile') return
    const timer = setTimeout(() => setStep('button'), 2400)
    return () => clearTimeout(timer)
  }, [step])

  const showThanks = step === 'thanks' || step === 'smile' || step === 'button'
  const showSmile = step === 'smile' || step === 'button'

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      <StarField count={140} />
      <ButterflyField count={10} mode="rise" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        <AnimatePresence>
          {showThanks && (
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="font-display max-w-md text-2xl text-blossom sm:text-3xl"
            >
              {siteConfig.textos.finalTitulo}
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSmile && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              className="max-w-sm text-lg text-lavender/90"
            >
              {siteConfig.textos.finalSubtitulo}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step === 'button' && (
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-4"
            >
              <PrimaryButton onClick={onReplay}>{siteConfig.textos.finalBoton}</PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
