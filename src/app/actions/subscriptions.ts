'use server'

import { getSubscriptionByUserId } from '@/lib/api/subscriptions'
import { getUserById } from '@/lib/api/utils'
import { UNKNOWN_ERROR, USER_HAD_SUBSCRIPTION_ERROR, USER_NOT_FOUND_ERROR } from '@/lib/constants/errors'
import { BAD_REQUEST_CODE, CREATED_CODE, NOT_FOUND_CODE } from '@/lib/constants/status-code'
import prisma from '@/lib/prisma'
import { AddUserSubscriptionType } from '@/schemas/subscriptions'
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

export const createUserSubscription = async ({
  userId,
  subscriptionPlanId,
  frequency,
  startsAt,
  endsAt,
  renewsAt,
}: AddUserSubscriptionType) => {
  try {
    // Check if user exists
    const user = await getUserById({ id: userId })

    if (!user) {
      return {
        status: NOT_FOUND_CODE,
        data: null,
        message: USER_NOT_FOUND_ERROR,
      }
    }

    // Check if user already has a subscription
    if (user.Subscription !== null) {
      return {
        status: 400,
        message: USER_HAD_SUBSCRIPTION_ERROR,
        data: null,
      }
    }

    // Add subscription
    const subscription = await prisma.subscription.create({
      data: {
        userId,
        subscriptionPlanId,
        frequency,
        startsAt,
        endsAt,
        renewsAt,
      },
    })

    return {
      status: CREATED_CODE,
      data: subscription,
    }
  } catch (e) {
    return {
      status: BAD_REQUEST_CODE,
      message: UNKNOWN_ERROR,
      data: null,
    }
  }
}
