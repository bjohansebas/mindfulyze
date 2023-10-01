import { Button } from '@/components/ui/button'
import { constructMetadata } from '@/lib/metadata'
import { PasswordForm } from './form'

import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Password | Mindfulyze',
})

export default function Password() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Suspense
        fallback={
          <div className="flex flex-col space-y-3  px-4 py-8 sm:px-16">
            <Button disabled={true} variant="secondary" className="w-full" size="lg" />
          </div>
        }
      >
        <PasswordForm />
      </Suspense>
    </div>
  )
}
