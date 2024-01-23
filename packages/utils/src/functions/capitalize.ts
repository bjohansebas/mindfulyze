export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
