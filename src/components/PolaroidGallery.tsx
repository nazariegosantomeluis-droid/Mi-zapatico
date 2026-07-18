import { AnimatePresence, motion } from 'framer-motion'
import { PolaroidCard } from './PolaroidCard'
import { siteConfig } from '../config/site'

interface PolaroidGalleryProps {
  visible: boolean
}

export function PolaroidGallery({ visible }: PolaroidGalleryProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.4 } }}
          transition={{ duration: 1 }}
          className="flex w-full flex-wrap items-center justify-center gap-8 px-6 py-10 sm:gap-12"
        >
          {siteConfig.fotos.map((foto, index) => (
            <PolaroidCard key={foto.src} src={foto.src} alt={foto.alt} index={index} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
