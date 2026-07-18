export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}
