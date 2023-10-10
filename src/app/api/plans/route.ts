import { getAllSubscriptionPlans } from '@/lib/api/subscriptionsPlan'

import { NextResponse } from 'next/server'

export async function GET() {
  const res = await getAllSubscriptionPlans()

  return NextResponse.json(res)
}
