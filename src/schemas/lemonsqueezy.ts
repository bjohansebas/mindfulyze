import { type TypeOf, z } from 'zod'

export const subscriptionCreatedInput = z.object({
  productId: z.string(),
  variantId: z.string(),
  userEmail: z.string(),
  renewsAt: z.string(),
})
export type SubscriptionCreatedInputType = TypeOf<typeof subscriptionCreatedInput>
