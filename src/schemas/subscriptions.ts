import { SubscriptionFrequency, SubscriptionPlanStatus } from '@prisma/client'
import z, { TypeOf } from 'zod'

export const AddUserSubscription = z.object({
  userId: z.string(),
  subscriptionPlanId: z.string(),
  frequency: z.nativeEnum(SubscriptionFrequency),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
  renewsAt: z.date(),
  status: z.nativeEnum(SubscriptionPlanStatus),
  idLemonSqueezy: z.number(),
})
export type AddUserSubscriptionType = TypeOf<typeof AddUserSubscription>

export const UpdateUserSubscription = z.object({
  idLemonSqueezy: z.number(),
  userId: z.string(),
  subscriptionPlanId: z.string(),
  frequency: z.nativeEnum(SubscriptionFrequency),
  startsAt: z.date(),
  endsAt: z.date().nullable(),
  renewsAt: z.date(),
  status: z.nativeEnum(SubscriptionPlanStatus),
})

export type UpdateUserSubscriptionType = TypeOf<typeof UpdateUserSubscription>
