import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IntroScene } from './components/IntroScene'
import { PasswordGate } from './components/PasswordGate'
import { ExperienceScene } from './components/ExperienceScene'
import { EndingScene } from './components/EndingScene'
import { useAudioController } from './hooks/useAudioController'
import { siteConfig } from './config/site'

type Phase = 'intro' | 'password' | 'experience' | 'ending'

function App() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [started, setStarted] = useState(false)

  const handleEnded = useCallback(() => setPhase('ending'), [])
  const audio = useAudioController({ src: siteConfig.audioSrc, onEnded: handleEnded })

  const handleStart = useCallback(() => {
    setStarted(true)
    audio.play()
  }, [audio])

  const handleReplay = useCallback(() => {
    audio.restart()
    setPhase('experience')
  }, [audio])

  return (
    <AnimatePresence mode="wait">
      {phase === 'intro' && (
        <motion.div key="intro" exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
          <IntroScene onBegin={() => setPhase('password')} />
        </motion.div>
      )}

      {phase === 'password' && (
        <motion.div key="password" exit={{ opacity: 0 }} transition={{ duration: 1.2 }}>
          <PasswordGate onSuccess={() => setPhase('experience')} />
        </motion.div>
      )}

      {phase === 'experience' && (
        <motion.div
          key="experience"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4 }}
        >
          <ExperienceScene audio={audio} started={started} onStart={handleStart} />
        </motion.div>
      )}

      {phase === 'ending' && (
        <motion.div
          key="ending"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
        >
          <EndingScene onReplay={handleReplay} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
