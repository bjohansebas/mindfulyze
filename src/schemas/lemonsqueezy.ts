import { SubscriptionPlanStatus } from '@prisma/client'
import { type TypeOf, z } from 'zod'

export const subscriptionCreatedInput = z.object({
  productId: z.string(),
  variantId: z.string(),
  userEmail: z.string(),
  renewsAt: z.string(),
  status: z.nativeEnum(SubscriptionPlanStatus),
  lemonsqueezyId: z.number(),
})
export type SubscriptionCreatedInputType = TypeOf<typeof subscriptionCreatedInput>

export const subscriptionUpdatedInput = z.object({
  productId: z.string(),
  variantId: z.string(),
  userEmail: z.string(),
  renewsAt: z.string(),
  endsAt: z.string().nullable(),
  status: z.nativeEnum(SubscriptionPlanStatus),
  lemonsqueezyId: z.number(),
})
export type SubscriptionUpdatedInputType = TypeOf<typeof subscriptionUpdatedInput>
