import { MindfulyzeIcon } from '@mindfulyze/ui'
import { constructMetadata } from '@mindfulyze/utils'

import { OAuthForm, OAuthFormPlaceholder } from '@ui/auth/oauth-form'

import Link from 'next/link'
import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Sign in to Mindfulyze',
})

export default function Login() {
  return (
    <div className="z-10 h-fit w-full max-w-md overflow-hidden rounded-2xl border sm:shadow-xl">
      <div className="flex flex-col items-center justify-center gap-2 border-b bg-background px-4 py-6 pt-8 text-center sm:px-16">
        <Link href="/">
          <MindfulyzeIcon className="h-10 w-10" />
        </Link>
        <h3 className="mt-4 text-balance font-semibold text-emerald-600 text-xl">Sign in to Mindfulyze</h3>
        <p className="text-balance text-sm">Start writing about your daily life.</p>
      </div>
      <div className="flex flex-col gap-5 bg-card px-4 py-8 sm:px-16">
        <Suspense fallback={<OAuthFormPlaceholder />}>
          <OAuthForm />
        </Suspense>
        <p className="text-center text-sm">
          Don&#39;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-emerald-400">
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
