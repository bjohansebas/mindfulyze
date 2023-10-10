import prisma from '@/lib/prisma'

import type { AddUserSubscriptionType, UpdateUserSubscriptionType } from '@/schemas/subscriptions'
import { SubscriptionPlanSlug } from '@prisma/client'
import { User } from 'next-auth'
import { getUserById } from './utils'

export const getSubscriptionByUserId = async ({ userId }: { userId: string }) =>
  await prisma.subscription.findFirst({
    where: {
      userId: userId,
    },
    select: {
      isActive: true,
      subscriptionPlan: true,
    },
  })

export const createUserSubscriptionFree = async (user: User) => {
  try {
    // Connect user with the subscription free plan
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

export const updateUserSubscriptionHandler = async ({
  userId,
  subscriptionPlanId,
  frequency,
  startsAt,
  endsAt,
  renewsAt,
  isActive,
}: UpdateUserSubscriptionType) => {
  try {
    // Check if user exist
    const user = await getUserById({ id: userId })

    if (!user) {
      const message = 'user not found'
      return {
        status: 400,
        message,
      }
    }

    // Check if user already has a subscription
    if (!user.Subscription) {
      const message = 'user has no subscription'
      return {
        status: 400,
        message,
      }
    }

    // Update subscription
    const subscription = await prisma.subscription.update({
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
        renewsAt,
        isActive,
      },
    })

    return {
      status: 200,
      data: {
        subscription,
      },
    }
  } catch (error: unknown) {
    return {
      status: 400,
      message: '',
    }
  }
}

export const deleteUserSubscriptionHandler = async ({ userId }: { userId: string }) => {
  try {
    // Check if user exist
    const user = await getUserById({ id: userId })

    if (!user) {
      const message = 'user not found'
      return {
        status: 400,
        message,
      }
    }

    // Delete subscription
    const deletedSubscription = await prisma.subscription.delete({
      where: {
        userId: user.id,
      },
    })

    return {
      status: 201,
      data: {
        subscription: deletedSubscription,
      },
    }
  } catch (error: unknown) {
    return {
      status: 400,
      message: '',
    }
  }
}
