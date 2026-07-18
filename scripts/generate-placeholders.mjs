// Script de un solo uso: genera 4 imágenes placeholder (lavanda + mariposas)
// para /public/images. No es parte del build de producción.
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../public/images')
mkdirSync(outDir, { recursive: true })

const palettes = [
  ['#3b1f52', '#7c4dbd', '#c9a6f5'],
  ['#2c1742', '#8a5fc7', '#e2c6ff'],
  ['#412a5e', '#9b6fd4', '#d8b8ff'],
  ['#331b4d', '#7a4bb8', '#c3a2f0'],
]

const butterfly = (cx, cy, scale, color, opacity) => `
  <g transform="translate(${cx} ${cy}) scale(${scale})" opacity="${opacity}">
    <path d="M0,0 C -40,-70 -110,-70 -120,-10 C -125,30 -70,45 0,15 Z" fill="${color}"/>
    <path d="M0,0 C 40,-70 110,-70 120,-10 C 125,30 70,45 0,15 Z" fill="${color}"/>
    <path d="M0,10 C -30,50 -80,60 -90,30 C -95,10 -55,15 0,32 Z" fill="${color}" opacity="0.85"/>
    <path d="M0,10 C 30,50 80,60 90,30 C 95,10 55,15 0,32 Z" fill="${color}" opacity="0.85"/>
    <rect x="-3" y="-15" width="6" height="45" rx="3" fill="#2a1740"/>
  </g>
`

function svgFor(i, [dark, mid, light]) {
  const w = 1080
  const h = 1350
  return `
  <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg" cx="50%" cy="35%" r="80%">
        <stop offset="0%" stop-color="${light}" stop-opacity="0.55"/>
        <stop offset="45%" stop-color="${mid}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${dark}"/>
      </radialGradient>
      <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="14"/>
      </filter>
    </defs>
    <rect width="${w}" height="${h}" fill="${dark}"/>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${Array.from({ length: 26 })
      .map(() => {
        const x = Math.round(Math.random() * w)
        const y = Math.round(Math.random() * h)
        const r = (Math.random() * 1.6 + 0.4).toFixed(2)
        const o = (Math.random() * 0.6 + 0.2).toFixed(2)
        return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" opacity="${o}"/>`
      })
      .join('')}
    <g filter="url(#soft)">
      ${butterfly(w * 0.22, h * 0.28, 1.1, light, 0.5)}
      ${butterfly(w * 0.78, h * 0.68, 0.8, mid, 0.4)}
    </g>
    ${butterfly(w * 0.5, h * 0.46, 1.6, light, 0.9)}
    <text x="50%" y="82%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#ffffff" fill-opacity="0.92" letter-spacing="2">
      Recuerdo ${i}
    </text>
    <text x="50%" y="87%" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#ffffff" fill-opacity="0.6">
      reemplaza esta imagen · public/images/foto-${i}.jpg
    </text>
  </svg>`
}

for (let i = 1; i <= 4; i++) {
  const svg = svgFor(i, palettes[i - 1])
  const out = path.join(outDir, `foto-${i}.jpg`)
  await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out)
  console.log('generado', out)
}
