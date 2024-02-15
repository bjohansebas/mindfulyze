import { Button } from '@mindfulyze/ui'
import { Separator } from '@ui/separator'
import LogoType from '@ui/shared/icons/logotype'
import { GithubIcon, TwitterIcon } from 'lucide-react'

import Link from 'next/link'

const navigation = {
  product: [{ name: 'Changelog', href: '/changelog' }],
  legal: [{ name: 'Privacy', href: '/privacy' }],
}

export default function Footer() {
  return (
    <footer className="my-10 px-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-4 md:items-center">
      <div className="flex item-center justify-between md:flex-col gap-2">
        <Link href="/">
          <span className="sr-only">Mindfulyze Logo</span>
          <LogoType className="h-12 w-auto" />
        </Link>
        <div className="flex items-center space-x-2">
          <Button asChild shape="circle" variant="ghost">
            <a href="https://twitter.com/mindfulyze" target="_blank" rel="noreferrer">
              <span className="sr-only">Twitter</span>
              <TwitterIcon className="h-5 w-5" />
            </a>
          </Button>
          <Separator className="h-5" orientation="vertical" />
          <Button asChild shape="circle" variant="ghost">
            <a href="https://github.com/bjohansebas/mindfulyze" target="_blank" rel="noreferrer">
              <span className="sr-only">Github</span>
              <GithubIcon className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="mt-10 md:mt-0">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-4">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground text-sm hover:text-emerald-400">
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
                  <Link href={item.href} className="text-muted-foreground text-sm hover:text-emerald-400">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
