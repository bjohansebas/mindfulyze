import { authOptions } from '@/lib/auth'
import { HOME_DOMAIN } from '@/lib/constants'
import { SubscriptionPlanSlug } from '@prisma/client'

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  const url = req.nextUrl.searchParams.get('url')

  if (
    session != null &&
    (session.user.subscriptionPlan !== SubscriptionPlanSlug.plus || session.user.subscriptionPlan == null)
  ) {
    const emailParams = `?checkout[email]=${session?.user.email}`

    return NextResponse.redirect(url + emailParams)
  }

  return NextResponse.redirect(`${HOME_DOMAIN}/home`)
}
