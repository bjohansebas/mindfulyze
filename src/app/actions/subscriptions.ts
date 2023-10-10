'use server'

import { getSubscriptionByUserId } from '@/lib/api/subscriptions'
import { SubscriptionPlanSlug } from '@prisma/client'

/**
 * Retrieves a user's subscription plan from the database using Prisma.
 *
 * @param {Object} options - The options object.
 * @param {string} options.userId - The ID of the user whose subscription plan is being retrieved.
 * @returns {Promise<SubscriptionPlanSlug>} The subscription plan of the user.
 *
 * @example
 * const subscription = await getUserSubscription({ userId: '123' })
 * console.log(subscription)
 * // Output: 'free'
 */
export const getUserSubscription = async (userId: string): Promise<SubscriptionPlanSlug | null> => {
  try {
    const subscription = await getSubscriptionByUserId({ userId })

    // check if subscription plan exists
    if (!subscription || !subscription.subscriptionPlan) return null

    return subscription.subscriptionPlan.slug
  } catch (error) {
    console.log(error)
    return null
  }
}
