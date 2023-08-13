import { PrismaClient } from '@prisma/client'

declare global {
  // rome-ignore lint/style/noVar: <explanation>
  var prisma: PrismaClient | undefined
}

// rome-ignore lint/suspicious/noRedeclare: <explanation>
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') global.prisma = prisma

export default prisma
