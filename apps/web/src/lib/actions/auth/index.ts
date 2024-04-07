'use server'

import { signIn as signInAuth, signOut as signOutAuth } from '@lib/auth'

export async function signIn() {
  await signInAuth('google')
}

export async function signOut() {
  await signOutAuth({
    redirectTo: '/login',
  })
}
