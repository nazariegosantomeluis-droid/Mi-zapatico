import { useCallback, useEffect, useRef, useState } from 'react'

interface UseAudioControllerOptions {
  src: string
  onEnded?: () => void
}

export function useAudioController({ src, onEnded }: UseAudioControllerOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.8)

  const onEndedRef = useRef(onEnded)
  onEndedRef.current = onEnded
  const initialVolumeRef = useRef(volume)

  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'metadata'
    audio.volume = initialVolumeRef.current
    audioRef.current = audio

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => setDuration(audio.duration)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      onEndedRef.current?.()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
      audioRef.current = null
    }
  }, [src])

  const play = useCallback(() => {
    void audioRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback(() => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      void audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (!audioRef.current) return
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }, [])

  const restart = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    void audioRef.current.play()
  }, [])

  const setVolume = useCallback((value: number) => {
    if (!audioRef.current) return
    audioRef.current.volume = value
    setVolumeState(value)
  }, [])

  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    toggle,
    seek,
    restart,
    setVolume,
  }
}
