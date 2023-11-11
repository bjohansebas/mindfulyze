'use server'

import { getSubscriptionByUserId } from '@/lib/api/subscriptions'
import { getUserById } from '@/lib/api/utils'
import {
  UNKNOWN_ERROR,
  USER_HAD_SUBSCRIPTION_ERROR,
  USER_HAS_NOT_SUBSCRIPTION_ERROR,
  USER_NOT_FOUND_ERROR,
} from '@/lib/constants/errors'
import { BAD_REQUEST_CODE, CONFLICT_CODE, CREATED_CODE, NOT_FOUND_CODE, OK_CODE } from '@/lib/constants/status-code'
import { AddUserSubscriptionType, UpdateUserSubscriptionType } from '@/schemas/subscriptions'

import prisma from '@/lib/prisma'
import { Subscription, SubscriptionPlanSlug } from '@prisma/client'
import { User } from 'next-auth'

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

/**
 * Creates a new subscription for a user.
 * @param {AddUserSubscriptionType} params - The parameters for creating a new subscription.
 * @returns {Promise<{ status: number, data: Subscription | null, message?: string }>} - The response object containing the status code, subscription data, and an optional message.
 */
export const createUserSubscription = async ({
  userId,
  subscriptionPlanId,
  frequency,
  startsAt,
  endsAt,
  status,
  renewsAt,
  idLemonSqueezy,
}: AddUserSubscriptionType): Promise<{ status: number; data: Subscription | null; message?: string }> => {
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
        status: CONFLICT_CODE,
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
        lemonSqueezyId: idLemonSqueezy,
        renewsAt,
        status,
      },
    })

    return {
      status: CREATED_CODE,
      data: subscription,
    }
  } catch (e) {
    console.log(e)
    return {
      status: BAD_REQUEST_CODE,
      message: UNKNOWN_ERROR,
      data: null,
    }
  }
}

/**
 * Creates a new subscription record for a user with a free subscription plan.
 * @param user - The user object containing the user's information.
 */
export const createUserSubscriptionFree = async (user: User) => {
  try {
    await prisma.subscription.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        subscriptionPlan: {
          connect: {
            slug: SubscriptionPlanSlug.free,
          },
        },
        endsAt: null,
        renewsAt: null,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

/**
 * Updates a user's subscription
 */
export const updateUserSubscription = async (params: UpdateUserSubscriptionType) => {
  try {
    const { userId, subscriptionPlanId, frequency, startsAt, endsAt, renewsAt, status, idLemonSqueezy } = params

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
    if (!user.Subscription) {
      return {
        status: CONFLICT_CODE,
        data: null,
        message: USER_HAS_NOT_SUBSCRIPTION_ERROR,
      }
    }

    // Update subscription
    const updatedSubscription = await prisma.subscription.update({
      where: {
        userId: user.id,
      },
      data: {
        subscriptionPlan: {
          connect: {
            id: subscriptionPlanId,
          },
        },
        frequency,
        startsAt,
        endsAt,
        status,
        renewsAt,
        lemonSqueezyId: idLemonSqueezy,
      },
    })

    return {
      status: CREATED_CODE,
      data: updatedSubscription,
    }
  } catch (error: unknown) {
    return {
      status: BAD_REQUEST_CODE,
      data: null,
      message: UNKNOWN_ERROR,
    }
  }
}

/**
 * Delete user subscription
 * @param {string} options.userId - The ID of the user whose subscription plan is being deleted.
 * @returns Subscription
 */
export const deleteUserSubscription = async ({ userId }: { userId: string }) => {
  try {
    // Check if user exist
    const user = await getUserById({ id: userId })

    if (!user) {
      return {
        status: NOT_FOUND_CODE,
        message: USER_NOT_FOUND_ERROR,
        data: null,
      }
    }

    // Delete subscription
    const deletedSubscription = await prisma.subscription.delete({
      where: {
        userId: user.id,
      },
    })

    return {
      status: OK_CODE,
      data: deletedSubscription,
    }
  } catch (error: unknown) {
    return {
      status: BAD_REQUEST_CODE,
      message: UNKNOWN_ERROR,
    }
  }
}
