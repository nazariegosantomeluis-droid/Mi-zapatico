import { AnimatePresence, motion } from 'framer-motion'
import { TypewriterText } from './TypewriterText'
import { siteConfig } from '../config/site'

interface SpecialMomentOverlayProps {
  active: boolean
}

export function SpecialMomentOverlay({ active }: SpecialMomentOverlayProps) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-void/55 px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.8 } }}
          transition={{ duration: 1.2 }}
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 1 }}
            className="font-display text-2xl text-blossom drop-shadow-[0_0_18px_rgba(230,201,255,0.6)] sm:text-4xl"
          >
            <TypewriterText text={siteConfig.textos.momentoEspecialMensaje} letterDelayMs={65} />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
