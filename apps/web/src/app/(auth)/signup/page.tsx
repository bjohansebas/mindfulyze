import { MindfulyzeIcon } from '@mindfulyze/ui'
import { constructMetadata } from '@mindfulyze/utils'

import { OAuthForm, OAuthFormPlaceholder } from '@ui/auth/oauth-form'

import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Sign up to Mindfulyze',
})

export default function SignUp() {
  return (
    <div className="z-10 h-fit w-full max-w-md overflow-hidden border rounded-2xl shadow-xl">
      <div className="flex flex-col items-center justify-center gap-2 border-b bg-background px-4 py-6 pt-8 text-center sm:px-16">
        <Link href="/">
          <MindfulyzeIcon className="h-10 w-10" />
        </Link>
        <h1 className="mt-4 text-xl font-semibold text-emerald-600 text-balance">Create your Mindfulyze account</h1>
        <h2 className="text-sm text-balance">Start writing about your daily life.</h2>
      </div>
      <div className="flex flex-col gap-5 bg-card px-4 py-8 sm:px-16">
        <Suspense fallback={<OAuthFormPlaceholder />}>
          <OAuthForm />
        </Suspense>
        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-emerald-400">
            Sign in
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
