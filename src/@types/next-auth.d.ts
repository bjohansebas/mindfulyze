import { SubscriptionPlanSlug } from '@prisma/client'
import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      pw?: string | null
      subscriptionPlan: SubscriptionPlanSlug | null
    } & DefaultSession['user']
  }
}
