'use client'

import { Feature } from '@/@types/pricing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { parsePlans } from '@/lib/utils'
import { SubscriptionPlan, SubscriptionPlanSlug } from '@prisma/client'
import { CheckCircle, XCircle } from 'lucide-react'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useMemo, useState } from 'react'
import Confetti from 'react-dom-confetti'

export function CardsPricing({ pricingItems }: { pricingItems: SubscriptionPlan[] }) {
  const [annualBilling, setAnnualBilling] = useState(false)
  const period = useMemo(() => (annualBilling ? 'yearly' : 'monthly'), [annualBilling])

  const { data: session } = useSession()

  return (
    <div className="flex w-full flex-col justify-center mb-9">
      <div className="relative mx-auto mb-14 flex max-w-fit items-center space-x-2">
        <p>Billed Monthly</p>
        <Confetti active={period === 'yearly'} config={{ elementCount: 200, spread: 90 }} />
        <Switch checked={annualBilling} onCheckedChange={setAnnualBilling} />
        <p>Billed Annually</p>
        <span className="absolute -right-12 -top-8 rounded-full bg-primary-200 px-3 py-1 text-sm text-primary-700 sm:-right-[9.5rem] sm:-top-2">
          🎁 2 months FREE
        </span>
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:max-w-4xl">
          {pricingItems.map(
            ({
              slug,
              mostPopular,
              priceMonthly,
              priceYearly,
              name,
              description,
              features,
              hrefMonthly,
              hrefYearly,
            }) => {
              return (
                <div
                  key={slug}
                  className={`flex flex-col gap-6 rounded-2xl bg-card max-w-sm lg:max-w-none px-8 py-6 ${
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
                  <div className="flex flex-col gap-3">
                    <p className="font-display text-4xl font-semibold">
                      ${period === 'yearly' ? priceYearly : priceMonthly}
                      <span className="text-lg text-gray-400">/{period === 'yearly' ? 'year' : 'month'}</span>
                    </p>
                    <p className="text-gray-400 text-sm">{description}</p>
                  </div>
                  <ul className="space-y-5 px-4">
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
                  {session == null ? (
                    <Button
                      variant={`${slug === SubscriptionPlanSlug.plus ? 'default' : 'outline'}`}
                      size="lg"
                      onClick={() => {
                        const url = parsePlans(session, slug, `${period === 'yearly' ? hrefYearly : hrefMonthly}`)
                        if (session == null) {
                          signIn('google', {
                            callbackUrl: url,
                          })
                        } else {
                          redirect(url)
                        }
                      }}
                    >
                      Get started
                    </Button>
                  ) : (
                    <Button asChild variant={`${slug === SubscriptionPlanSlug.plus ? 'default' : 'outline'}`} size="lg">
                      <Link href={`${parsePlans(session, slug, `${period === 'yearly' ? hrefYearly : hrefMonthly}`)}`}>
                        Get started
                      </Link>
                    </Button>
                  )}
                </div>
              )
            },
          )}
        </div>
      </div>
    </div>
  )
}
