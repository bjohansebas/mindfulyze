'use client'

import { Button } from '@ui/button'

import { signIn } from 'next-auth/react'

const Hero = () => {
  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <Button
        size="lg"
        onClick={() => {
          signIn('google', { callbackUrl: '/home' })
        }}
      >
        Start For Free
      </Button>
    </div>
  )
}

export default Hero