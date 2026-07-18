/**
 * Configuración central de la experiencia "Mi Zapatico".
 * Edita este archivo para personalizar la contraseña, los textos y los tiempos
 * sin tocar el resto del código.
 */

export const siteConfig = {
  /**
   * Frase exacta que debe escribir la persona para entrar.
   * La comparación respeta mayúsculas, minúsculas y espacios tal cual.
   */
  password: 'Te amo Luisito',

  /** Nombre con el que se dirige la experiencia. */
  nombre: 'Hillary',
  apodo: 'Laly',

  textos: {
    introSaludo: 'Hola, Hillary 💜',
    introSubtitulo: 'Preparé algo muy especial para ti…',
    botonComenzar: '✨ Comenzar',

    passwordTitulo: 'Antes de continuar…',
    passwordPlaceholder: 'Escribe la frase secreta',
    passwordBoton: 'Entrar',
    passwordError: 'Mmm… esa no es la frase correcta 💜',
    passwordAyuda: 'Pista: es algo que me dices seguido.',

    playBoton: '▶️ Reproducir sorpresa',

    momentoEspecialMensaje: 'Te amo mutisimo, mi Laly. 💜🦋',

    finalTitulo: 'Gracias por escuchar esta pequeña sorpresa.',
    finalSubtitulo: 'Espero haberte sacado una sonrisa. 💜',
    finalBoton: 'Volver a escuchar',
  },

  /**
   * Fracción (0 a 1) de la duración total de la canción en la que ocurre
   * el "momento especial". 0.6 significa que ocurrirá al 60% de la canción.
   */
  momentoEspecialFraccion: 0.6,

  /** Cuántos segundos dura el mensaje del momento especial en pantalla. */
  momentoEspecialDuracionSegundos: 7,

  /** Ruta del audio principal (colócalo en /public/audio). */
  audioSrc: '/audio/sorpresa.mp3',

  /**
   * Fotografías del recuerdo. Reemplaza los archivos en /public/images
   * manteniendo estos mismos nombres, o cambia las rutas aquí.
   */
  fotos: [
    { src: '/images/foto-1.jpg', alt: 'Recuerdo especial 1' },
    { src: '/images/foto-2.jpg', alt: 'Recuerdo especial 2' },
    { src: '/images/foto-3.jpg', alt: 'Recuerdo especial 3' },
    { src: '/images/foto-4.jpg', alt: 'Recuerdo especial 4' },
  ],
} as const

export type SiteConfig = typeof siteConfig
