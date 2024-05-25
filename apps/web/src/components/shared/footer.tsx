import { legal } from '@content'
import { Button, MindfulyzeIconWithText, Separator } from '@mindfulyze/ui'
import { GithubIcon, TwitterIcon } from 'lucide-react'

import Link from 'next/link'

const navigation = {
  legal: legal.map(({ title, slug }) => {
    return { name: title, href: `/legal/${slug}` }
  }),
}

export default function Footer() {
  return (
    <footer className="mx-auto my-10 flex max-w-4xl flex-col justify-between gap-4 px-8 md:flex-row md:items-center">
      <div className="item-center flex justify-between gap-2 md:flex-col">
        <Link href="/">
          <span className="sr-only">Mindfulyze Logo</span>
          <MindfulyzeIconWithText className="h-12 w-auto" />
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
            <h3 className="font-semibold text-sm">Legal</h3>
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
