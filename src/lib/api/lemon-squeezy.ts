import { LemonSqueezyVariant } from '@/@types/lemon-squeezy'
import { createUserSubscription, deleteUserSubscription } from '@/app/actions/subscriptions'
import prisma from '@/lib/prisma'
import { SubscriptionCreatedInputType } from '@/schemas/lemonsqueezy'
import { OK_CODE } from '../constants/status-code'
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
      const message = 'user not found'
      return {
        status: 404,
        message,
        data: null,
      }
    }

    // CREATE USER's SUBSCRIPTION

    // Check if subscription plan exists
    const subscriptionPlan = await getSubscriptionPlanByProductId({
      productId,
    })
    if (!subscriptionPlan) {
      const message = 'subscription plan not found'
      return {
        status: 404,
        message,
        data: null,
      }
    }

    // Check if variant exists
    const variant = await getVariantByIdHandler({
      variantId,
    })
    if (!variant) {
      const message = 'variant Not Found'
      return {
        status: 404,
        message,
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
          status: 500,
          message: response.message,
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
      const message = 'api:payment.subscriptionCreated.error.addSubscription'
      return {
        status: 400,
        message,
        data: null,
      }
    }

    return {
      status: 201,
      data: {
        subscription: newSubscription,
      },
      message: '',
    }
  } catch (error: unknown) {
    console.error('subscriptionCreatedHandler.error: ', error)

    const message = 'api:payment.subscriptionCreated.error.invalidInput'

    return {
      status: 400,
      message,
      data: null,
    }
  }
}

export const getVariantByIdHandler = async ({ variantId }: { variantId: string }) => {
  try {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', `Bearer ${process.env.LEMON_SQUEEZY_API_KEY as string}`)

    const response = await fetch(`${process.env.LEMON_SQUEEZY_URL}/v1/variants/${variantId}`, {
      method: 'GET',
      headers,
    })

    const result = (await response.json()) as LemonSqueezyVariant

    return result
  } catch (error) {
    return null
  }
}
