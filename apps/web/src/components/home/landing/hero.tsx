'use client'

import { Button } from '@mindfulyze/ui'
import { signIn } from 'next-auth/react'

const Hero = () => {
  return (
    <div className="flex justify-center mt-6 sm:mt-10">
      <Button
        shape="rounded"
        size="lg"
        onClick={() => {
          signIn('google', { callbackUrl: '/home' })
        }}
      >
        Start for Free
      </Button>
    </div>
  )
}

export default Hero
