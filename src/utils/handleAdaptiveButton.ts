export const handleAdaptiveButton = (width: number): string => {
  return width <= 576 ? 'btn-sm' : width >= 1200 ? 'btn-lg' : ''
}
