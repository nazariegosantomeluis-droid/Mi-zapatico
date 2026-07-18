import { motion, type HTMLMotionProps } from 'framer-motion'

type PrimaryButtonProps = HTMLMotionProps<'button'>

export function PrimaryButton({ className = '', children, ...props }: PrimaryButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full border border-white/25 bg-gradient-to-br from-orchid to-lilac px-8 py-3.5 font-display text-lg tracking-wide text-blossom shadow-[0_0_30px_rgba(180,142,224,0.55)] transition-shadow hover:shadow-[0_0_45px_rgba(217,194,245,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lavender ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
