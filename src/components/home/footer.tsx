import { Twitter } from '@/components/shared/icons'
import Github from '@/components/shared/icons/github'
import LogoType from '@/components/shared/icons/logotype'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'

import Link from 'next/link'

const navigation = {
  product: [
    { name: 'Changelog', href: '/changelog' },
    { name: 'Pricing', href: '/pricing' },
  ],
  legal: [{ name: 'Privacy', href: '/privacy' }],
}

export default function Footer() {
  return (
    <footer className="z-10 border-t bg-card py-8 backdrop-blur-lg">
      <MaxWidthWrapper className="pt-10">
        <div className="xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <Link href="/">
              <span className="sr-only">Mindfulyze Logo</span>
              <LogoType className="h-12 w-auto" />
            </Link>
            <p className="max-w-xs text-sm">A modern diary, for your day-to-day</p>
            <div className="flex items-center space-x-2">
              <a
                href="https://twitter.com/mindfulyze"
                target="_blank"
                rel="noreferrer"
                className="group rounded-md p-2 transition-colors hover:bg-background"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <div className="h-8 border-l border-gray-200" />
              <a
                href="https://github.com/bjohansebas/mindfulyze"
                target="_blank"
                rel="noreferrer"
                className="rounded-md p-2 transition-colors hover:bg-background"
              >
                <span className="sr-only">Github</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Product</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm hover:text-primary-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm hover:text-primary-400">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}
