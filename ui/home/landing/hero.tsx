import { Button } from '@/ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className="mx-auto max-w-md px-2.5 text-center sm:max-w-lg sm:px-0 h-[calc(100vh-57px)] flex justify-center flex-col">
      <h1 className="font-display text-4xl font-bold leading-[1.15] sm:text-6xl sm:leading-[1.15]">
        Store moments from your day
        <br />
        <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Securely</span>
      </h1>
      <h2 className="mt-5 text-gray-200 sm:text-xl">
        Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression
        and personal growth
      </h2>
      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <Button asChild className="rounded-full">
          <Link href="/signup">Start For Free</Link>
        </Button>
      </div>
    </div>
  )
}

export default Hero
