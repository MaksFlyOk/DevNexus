export const handleAdaptiveButton = (width: number): string => {
  return width <= 390 ? 'btn-sm' : width > 390 && width <= 800 ? '' : 'btn-lg'
}
