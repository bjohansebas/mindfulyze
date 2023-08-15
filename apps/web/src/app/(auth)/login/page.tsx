import Logo from '@/components/icons/logo'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { LoginForm } from './form'

export const metadata: Metadata = {
  title: 'Sign in to Mindfulyze',
}

export default function Login() {
  return (
    <div className='z-10 h-fit w-full max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl'>
      <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16'>
        <Link href='/'>
          <Logo className='h-10 w-10' />
        </Link>
        <h3 className='text-xl font-semibold'>Sign in to Mindfulyze</h3>
        <p className='text-sm text-gray-500'>Start writing about your daily life.</p>
      </div>
      <div className='flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16'>
        <Suspense
          fallback={
            <div className='flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16'>
              <Button disabled={true} variant='secondary' className='w-full' size='lg' />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
        <p className='text-center text-sm text-gray-500'>
          Don&#39;t have an account?{' '}
          <Link href='/signup' className='font-semibold text-gray-600 transition-colors hover:text-black'>
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
