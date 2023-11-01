import { LogoType } from '@/components/shared/icons'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CTA() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center space-y-8 text-center mb-36">
      <div>
        <LogoType className="w-auto h-16 text-primary-600" />
      </div>
      <h2 className="font-display text-4xl font-extrabold leading-tigh sm:text-5xl sm:leading-tight">
        <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
          Free your thoughts
        </span>
        <br />
        free your mind
      </h2>
      <Button asChild>
        <Link href="/signup">Try Mindfulyze For Free</Link>
      </Button>
    </MaxWidthWrapper>
  )
}
