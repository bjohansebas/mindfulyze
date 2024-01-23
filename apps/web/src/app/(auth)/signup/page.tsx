import Logo from '@/components/shared/icons/logo'
import { Button } from '@mindfulyze/ui'
import { constructMetadata } from '@mindfulyze/utils'
import Link from 'next/link'
import { Suspense } from 'react'
import { SignUpForm } from './form'

export const metadata = constructMetadata({
  title: 'Sign up to Mindfulyze',
})

export default function SignUp() {
  return (
    <div className="z-10 h-fit w-full max-w-md overflow-hidden border sm:rounded-2xl sm:shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center sm:px-16">
        <Link href="/">
          <Logo className="h-10 w-10" />
        </Link>
        <h3 className="text-xl font-semibold text-primary-600">Create your Mindfulyze account</h3>
        <p className="text-sm">Start writing about your daily life.</p>
      </div>
      <div className="flex flex-col space-y-3 bg-card px-4 py-8 sm:px-16">
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3 bg-card px-4 py-8 sm:px-16">
              <Button disabled={true} variant="secondary" className="w-full" size="lg" />
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary-400">
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
