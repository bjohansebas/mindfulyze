'use server'

import { BAD_REQUEST_CODE, CREATED_CODE } from '@/lib/constants/status-code'
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'

const ls = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY as string)

export async function cancelSubscription(id: number) {
  try {
    const subscription = await ls.cancelSubscription({ id: id })

    return { data: subscription, message: null, status: CREATED_CODE }
  } catch (e) {
    return { data: null, message: e.message, status: BAD_REQUEST_CODE }
  }
}

export async function resumeSubscription(id: number) {
  try {
    const subscription = await ls.resumeSubscription({ id })

    return { data: subscription, message: null, status: CREATED_CODE }
  } catch (e) {
    return { data: null, message: e.message, status: BAD_REQUEST_CODE }
  }
}

export async function pauseSubscription(id: number) {
  try {
    const subscription = await ls.pauseSubscription({ id })

    return { data: subscription, message: null, status: CREATED_CODE }
  } catch (e) {
    return { data: null, message: e.message, status: BAD_REQUEST_CODE }
  }
}

export async function unpauseSubscription(id: number) {
  try {
    const subscription = await ls.unpauseSubscription({ id })

    return { data: subscription, message: null, status: CREATED_CODE }
  } catch (e) {
    return { data: null, message: e.message, status: BAD_REQUEST_CODE }
  }
}
