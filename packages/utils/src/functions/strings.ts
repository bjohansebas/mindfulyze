import { init } from '@paralleldrive/cuid2'

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

export const generateCUID = init({
  // the length of the id
  length: 26,
})
