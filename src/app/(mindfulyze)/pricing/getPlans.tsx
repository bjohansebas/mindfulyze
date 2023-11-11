import { SubscriptionPlan } from '@prisma/client'

export async function getPlans() {
  try {
    const res = await fetch('https://mindfulyze.com/api/plans', {
      next: {
        revalidate: 60,
      },
    })

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<SubscriptionPlan[]>
  } catch {
    throw new Error('Failed to fetch data')
  }
}
