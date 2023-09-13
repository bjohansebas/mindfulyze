import { getSubscriptionPlanById } from '@/lib/api/subscriptionsPlan'
import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id // 'a', 'b', or 'c'

  const res = await getSubscriptionPlanById({ id })

  if (!res) return NextResponse.json({ message: 'Subscriptions plan not found' }, { status: 404 })

  return NextResponse.json(res)
}
