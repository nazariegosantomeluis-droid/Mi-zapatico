# Mi Zapatico 💜

Una experiencia web interactiva, cinematográfica y muy personal, hecha como
regalo digital para Hillary ("Laly"). Construida con **React + Vite +
TypeScript + Tailwind CSS + Framer Motion**.

La experiencia incluye:

- Introducción cinematográfica con una mariposa luminosa.
- Puerta con contraseña (frase secreta) configurable.
- Fotografías estilo Polaroid flotando con profundidad y sombra.
- Reproductor de música con play/pausa, volumen, barra de progreso y reinicio.
- Un "momento especial" con mensaje escrito letra por letra, sincronizado con
  la canción.
- Cierre emotivo con cielo estrellado y botón para volver a escuchar.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre la URL que te muestre la terminal (por defecto `http://localhost:5173`).

## Compilar para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para publicar. Puedes previsualizar el
resultado de producción localmente con:

```bash
npm run preview
```

## Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com/) → **Add New Project** → importa
   el repositorio.
3. Vercel detectará automáticamente que es un proyecto Vite (el archivo
   `vercel.json` ya incluido deja configurados el comando de build
   `npm run build` y la carpeta de salida `dist`). No necesitas cambiar nada.
4. Haz clic en **Deploy**. Al terminar obtendrás un enlace público para
   compartir con Hillary.

También puedes publicar en **GitHub Pages** o cualquier hosting estático:
solo necesitas subir el contenido de `dist/` después de correr
`npm run build`.

## Personalización

Todo el contenido editable vive en **`src/config/site.ts`**.

### Cambiar la contraseña

```ts
// src/config/site.ts
export const siteConfig = {
  password: 'Te amo Luisito', // cámbiala por la frase que quieras
  // ...
}
```

La comparación es exacta (respeta mayúsculas, minúsculas y espacios), así que
escribe la frase tal cual quieres que se teclee.

### Cambiar los textos

En el mismo archivo, dentro de `textos`, puedes editar cada mensaje que
aparece en la experiencia (saludo, subtítulo, mensaje del momento especial,
textos del final, etc.).

### Reemplazar las fotografías

1. Coloca tus 4 imágenes en `public/images/`.
2. Nómbralas exactamente `foto-1.jpg`, `foto-2.jpg`, `foto-3.jpg` y
   `foto-4.jpg` (sobrescribiendo los archivos de ejemplo), o usa los nombres
   que prefieras y actualiza las rutas en `src/config/site.ts`:

```ts
fotos: [
  { src: '/images/foto-1.jpg', alt: 'Recuerdo especial 1' },
  { src: '/images/foto-2.jpg', alt: 'Recuerdo especial 2' },
  { src: '/images/foto-3.jpg', alt: 'Recuerdo especial 3' },
  { src: '/images/foto-4.jpg', alt: 'Recuerdo especial 4' },
],
```

> Las imágenes incluidas por defecto son ilustraciones de marcador de
> posición (lavanda + mariposas) generadas para que el proyecto funcione de
> inmediato. Reemplázalas por las fotos reales antes de compartir el enlace.

### Reemplazar el audio

1. Coloca tu archivo de audio en `public/audio/` (por ejemplo
   `sorpresa.mp3`).
2. Actualiza la ruta en `src/config/site.ts`:

```ts
audioSrc: '/audio/sorpresa.mp3',
```

### Ajustar el "momento especial"

El mensaje especial aparece automáticamente a un porcentaje de la duración
total de la canción (no a un segundo fijo), para que funcione sin importar
qué canción uses:

```ts
momentoEspecialFraccion: 0.6, // aparece al 60% de la canción
momentoEspecialDuracionSegundos: 7, // cuánto tiempo permanece en pantalla
```

## Estructura del proyecto

```
src/
  components/   Componentes de la experiencia (escenas, mariposas, tarjetas...)
  config/       site.ts: contraseña, textos y rutas de medios
  hooks/        useAudioController: control del reproductor de audio
  lib/          utilidades pequeñas (formateo de tiempo, aleatorios)
public/
  images/       Fotografías (Polaroid)
  audio/        Pista de audio principal
```

## Calidad

- TypeScript en modo estricto, sin errores de compilación.
- `npm run lint` (oxlint) sin advertencias.
- Responsive: probado en tamaños de escritorio y móvil.
- Respeta `prefers-reduced-motion` para quienes prefieren menos animación.
