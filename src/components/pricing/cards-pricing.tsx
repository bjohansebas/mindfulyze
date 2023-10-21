'use client'

import { Feature } from '@/@types/pricing'
import { SubscriptionPlan, SubscriptionPlanSlug } from '@prisma/client'
import { CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import Confetti from 'react-dom-confetti'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'

export function CardsPricing({ pricingItems }: { pricingItems: SubscriptionPlan[] }) {
  const [annualBilling, setAnnualBilling] = useState(false)
  const period = useMemo(() => (annualBilling ? 'yearly' : 'monthly'), [annualBilling])

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="relative mx-auto mb-14 flex max-w-fit items-center space-x-2">
        <p>Billed Monthly</p>
        <Confetti active={period === 'yearly'} config={{ elementCount: 200, spread: 90 }} />
        <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
        <p>Billed Annually</p>
        <span className="absolute -right-12 -top-8 rounded-full bg-purple-200 px-3 py-1 text-sm text-purple-700 sm:-right-[9.5rem] sm:-top-2">
          🎁 2 months FREE
        </span>
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:max-w-4xl">
          {pricingItems.map(({ slug, mostPopular, priceMonthly, priceYearly, name, description, features }) => {
            return (
              <div
                key={slug}
                className={`flex flex-col gap-6 rounded-2xl bg-card max-w-sm lg:max-w-none     px-8 py-6 ${
                  slug === SubscriptionPlanSlug.plus ? 'border-2 border-primary-600' : 'border border-gray-600'
                }`}
              >
                <header className="flex items-center justify-between">
                  <h3 className="text-center text-2xl font-bold">{name}</h3>
                  {mostPopular ? (
                    <Badge variant="outline" className="bg-primary-400/30">
                      Popular
                    </Badge>
                  ) : null}
                </header>
                <div>
                  <p className="font-display text-4xl font-semibold">
                    ${period === 'yearly' ? priceYearly : priceMonthly}
                    <span className="text-lg text-gray-400">/{period === 'yearly' ? 'year' : 'month'}</span>
                  </p>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>
                <div className="border-t border-gray-200" />
                <ul className="my-10 space-y-5 px-8">
                  {features.map((value) => {
                    const feature: Feature = JSON.parse(value)
                    return (
                      <li key={feature.name} className="flex space-x-5">
                        <div className="flex-shrink-0">
                          {feature.include ? (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          ) : (
                            <XCircle className="h-6 w-6 text-gray-300" />
                          )}
                        </div>
                        {feature.fqa !== null ? (
                          <div className="flex items-center space-x-1">
                            <p>{feature.name}</p>
                            {/* <Tooltip content={footnote}>
                            <HelpCircle className="h-4 w-4 text-gray-600" />
                          </Tooltip> */}
                          </div>
                        ) : (
                          <p>{feature.name}</p>
                        )}
                      </li>
                    )
                  })}
                </ul>
                <div className="p-5">
                  {/* <Link
                  href={`/register`}
                  className={`${
                    plan === 'Pro'
                      ? 'border border-transparent bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:border-blue-700 hover:bg-white hover:bg-clip-text hover:text-transparent'
                      : 'border border-gray-200 bg-black text-white hover:border-black hover:bg-white hover:text-black'
                  } block w-full rounded-full py-2 font-medium transition-all`}
                >
                  {cta}
                </Link> */}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
