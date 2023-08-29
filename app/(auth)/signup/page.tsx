import Logo from '@/components/shared/icons/logo'
import { constructMetadata } from '@/lib/metadata'
import { Button } from '@/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'
import { SignUpForm } from './form'

export const metadata = constructMetadata({
  title: 'Sign up to Mindfulyze',
})

export default function SignUp() {
  return (
    <div className="z-10 h-fit w-full max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl">
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <Link href="/">
          <Logo className="h-10 w-10" />
        </Link>
        <h3 className="text-xl font-semibold">Create your Mindfulyze account</h3>
        <p className="text-sm text-gray-500">Start writing about your daily life.</p>
      </div>
      <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
        <Suspense
          fallback={
            <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
              <Button disabled={true} variant="secondary" className="w-full" size="lg" />
            </div>
          }
        >
          <SignUpForm />
        </Suspense>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-gray-500 transition-colors hover:text-black">
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
