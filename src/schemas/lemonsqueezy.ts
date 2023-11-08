import { type TypeOf, z } from 'zod'

export const subscriptionCreatedInput = z.object({
  productId: z.string(),
  variantId: z.string(),
  userEmail: z.string(),
  renewsAt: z.string(),
})
export type SubscriptionCreatedInputType = TypeOf<typeof subscriptionCreatedInput>

export const subscriptionUpdatedInput = z.object({
  productId: z.string(),
  variantId: z.string(),
  userEmail: z.string(),
  renewsAt: z.string(),
  endsAt: z.string().nullable(),
})
export type SubscriptionUpdatedInputType = TypeOf<typeof subscriptionUpdatedInput>
