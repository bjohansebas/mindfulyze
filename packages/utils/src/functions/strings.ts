export function stringAvatar(name: string): string {
  const nameDivided = name.split(' ')
  let result = ''

  if (!nameDivided[0]?.[0]) {
    return 'SB'
  }

  result += nameDivided[0][0]

  if (nameDivided[1]?.length) {
    result += nameDivided[1][0]
  }

  return result
}
