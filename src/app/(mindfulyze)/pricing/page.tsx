import { CardsPricing } from '@/components/pricing/cards-pricing'
import { HOME_DOMAIN } from '@/lib/constants'
import { constructMetadata } from '@/lib/metadata'
import { SubscriptionPlan } from '@prisma/client'

export const metadata = constructMetadata({
  title: 'Pricing · Plans for every person – Mindfulyze',
  description:
    'The best journal to begin living a better life by writing your thoughts. Plans start from $0 per month.',
})

async function getPlans() {
  try {
    const res = await fetch(`${HOME_DOMAIN}/api/plans`)

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    return res.json() as Promise<SubscriptionPlan[]>
  } catch {
    throw new Error('Failed to fetch data')
  }
}

export default async function Page() {
  const plans = await getPlans()

  return (
    <>
      <header className="mt-16 mx-auto mb-10  text-center">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Simple, <span className="text-primary-600">affordable</span> pricing
        </h1>
        <h2 className="mt-5 text-gray-300 sm:text-lg">
          Improve your life by practicing journaling. <br />
          Start for free, no credit card required.
        </h2>
      </header>
      <CardsPricing pricingItems={plans} />
    </>
  )
}
