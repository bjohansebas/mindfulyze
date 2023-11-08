import { SubscriptionFrequency } from '@prisma/client'
import z, { TypeOf } from 'zod'

export const AddUserSubscription = z.object({
  userId: z.string(),
  subscriptionPlanId: z.string(),
  frequency: z.nativeEnum(SubscriptionFrequency),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
  renewsAt: z.date(),
})
export type AddUserSubscriptionType = TypeOf<typeof AddUserSubscription>

export const UpdateUserSubscription = z.object({
  userId: z.string(),
  subscriptionPlanId: z.string(),
  frequency: z.nativeEnum(SubscriptionFrequency),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
  renewsAt: z.date(),
})

export type UpdateUserSubscriptionType = TypeOf<typeof UpdateUserSubscription>
