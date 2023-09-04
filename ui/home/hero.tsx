import Link from 'next/link'
import { Button } from '../button'

const Hero = () => {
  return (
    <div className="mx-auto mb-10 max-w-md px-2.5 text-center sm:max-w-lg sm:px-0">
      <h1 className="mt-5 font-display text-4xl font-bold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
        Store moments from your day
        <br />
        <span className="bg-gradient-to-r from-primary-800 via-primary-600 to-primary-800 bg-clip-text text-transparent">
          Securely
        </span>
      </h1>
      <h2 className="mt-5 text-gray-600 sm:text-xl">
        Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression
        and personal growth
      </h2>

      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <Button asChild>

          <Link
            href="/signup"
          >
            Start For Free
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Hero
