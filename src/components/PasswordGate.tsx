import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { GlassPanel } from './GlassPanel'
import { PrimaryButton } from './PrimaryButton'
import { ButterflyField } from './ButterflyField'
import { StarField } from './StarField'
import { siteConfig } from '../config/site'

interface PasswordGateProps {
  onSuccess: () => void
}

type Status = 'idle' | 'error' | 'success'

export function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [value, setValue] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  const shakeControls = useAnimation()

  useEffect(() => {
    if (status !== 'success') return
    const timer = setTimeout(onSuccess, 2900)
    return () => clearTimeout(timer)
  }, [status, onSuccess])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (status === 'success') return

    if (value === siteConfig.password) {
      setStatus('success')
      return
    }

    setStatus('error')
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([40, 60, 40])
    }
    inputRef.current?.focus()
    await shakeControls.start({
      x: [0, -10, 10, -8, 8, -4, 4, 0],
      transition: { duration: 0.5 },
    })
  }

  return (
    <div className="relative flex h-full min-h-screen w-full items-center justify-center overflow-hidden bg-void px-6 py-16">
      <StarField count={70} dim={status !== 'success'} />

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-orchid/20 via-plum/40 to-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {status === 'success' && <ButterflyField count={22} mode="ambient" />}

      <AnimatePresence>
        {status !== 'success' && (
          <motion.div
            key="gate"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18, scale: 0.96 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-sm"
          >
            <GlassPanel className="px-7 py-9 sm:px-9">
              <motion.form
                animate={shakeControls}
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-5 text-center"
              >
                <span className="text-3xl" aria-hidden="true">
                  🦋
                </span>
                <h2 className="font-display text-2xl text-blossom">
                  {siteConfig.textos.passwordTitulo}
                </h2>
                <p className="text-sm text-lavender/70">{siteConfig.textos.passwordAyuda}</p>

                <input
                  ref={inputRef}
                  type="password"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value)
                    if (status === 'error') setStatus('idle')
                  }}
                  placeholder={siteConfig.textos.passwordPlaceholder}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-center text-blossom placeholder:text-lavender/50 outline-none focus-visible:border-lilac focus-visible:ring-2 focus-visible:ring-lilac/60"
                />

                <PrimaryButton type="submit" className="w-full">
                  {siteConfig.textos.passwordBoton}
                </PrimaryButton>

                <div className="h-5">
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        role="alert"
                        className="text-sm text-glow"
                      >
                        {siteConfig.textos.passwordError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.form>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
