import { LemonSqueezyVariant } from '@/@types/lemon-squeezy'
import { createUserSubscription, deleteUserSubscription } from '@/app/actions/subscriptions'
import prisma from '@/lib/prisma'
import { SubscriptionCreatedInputType } from '@/schemas/lemonsqueezy'
import {
  SUBSCRIPTION_CREATED_ERROR,
  SUBSCRIPTION_DELETED_ERROR,
  SUBSCRIPTION_NOT_FOUND_ERROR,
  UNKNOWN_ERROR,
  USER_NOT_FOUND_ERROR,
  VARIANT_NOT_FOUND_ERROR,
} from '../constants/errors'
import { CREATED_CODE, INTERNAL_SERVER_ERROR_CODE, NOT_FOUND_CODE, OK_CODE } from '../constants/status-code'
import { env } from '../env'
import { getSubscriptionPlanByProductId } from './subscriptionsPlan'

export const subscriptionCreatedHandler = async ({
  productId,
  variantId,
  userEmail,
  renewsAt,
}: SubscriptionCreatedInputType) => {
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    })
    if (!user) {
      return {
        status: NOT_FOUND_CODE,
        message: USER_NOT_FOUND_ERROR,
        data: null,
      }
    }

    // CREATE USER's SUBSCRIPTION

    // Check if subscription plan exists
    const subscriptionPlan = await getSubscriptionPlanByProductId({
      productId,
    })
    if (!subscriptionPlan) {
      return {
        status: NOT_FOUND_CODE,
        message: SUBSCRIPTION_NOT_FOUND_ERROR,
        data: null,
      }
    }

    // Check if variant exists
    const variant = await getVariantByIdHandler({
      variantId,
    })

    if (!variant) {
      return {
        status: NOT_FOUND_CODE,
        message: VARIANT_NOT_FOUND_ERROR,
        data: null,
      }
    }

    // Check if user has an active subscription
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
      },
    })

    // Delete subscription if exists
    if (subscription) {
      const response = await deleteUserSubscription({
        userId: user.id,
      })

      if (response?.status !== OK_CODE) {
        return {
          status: INTERNAL_SERVER_ERROR_CODE,
          message: response.message || SUBSCRIPTION_DELETED_ERROR,
          data: null,
        }
      }
    }

    // Add subscription
    const newSubscription = await createUserSubscription({
      userId: user.id,
      subscriptionPlanId: subscriptionPlan.id,
      frequency: variant.data.attributes.interval,
      startsAt: new Date(),
      endsAt: null,
      renewsAt: new Date(renewsAt),
    })

    // Check if subscription was added
    if (!newSubscription.data) {
      return {
        status: INTERNAL_SERVER_ERROR_CODE,
        message: SUBSCRIPTION_CREATED_ERROR,
        data: null,
      }
    }

    return {
      status: CREATED_CODE,
      data: newSubscription,
    }
  } catch (error: unknown) {
    console.error('subscriptionCreatedHandler.error: ', error)

    return {
      status: INTERNAL_SERVER_ERROR_CODE,
      message: UNKNOWN_ERROR,
      data: null,
    }
  }
}

/**
 * Retrieves a variant of subscription by its ID from Lemon Squeezy API.
 * @param variantId - The ID of the variant to retrieve.
 * @returns The variant object retrieved from the API.
 */
export const getVariantByIdHandler = async ({
  variantId,
}: { variantId: string }): Promise<LemonSqueezyVariant | null> => {
  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${env.LEMON_SQUEEZY_API_KEY as string}`)

    const response = await fetch(`${env.LEMON_SQUEEZY_URL}/v1/variants/${variantId}`, {
      method: 'GET',
      headers,
    })

    const result = (await response.json()) as LemonSqueezyVariant

    return result
  } catch (error) {
    return null
  }
}
