import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { Button } from '@mindfulyze/ui'

import { authOptions } from '@lib/auth'

export async function ButtonNav() {
  const session = await getServerSession(authOptions)

  return session ? (
    <Button asChild variant="surface" shape="rounded">
      <Link href="/home">Dashboard</Link>
    </Button>
  ) : (
    <>
      <Button variant="link" shape="rounded" asChild className="text-foreground hover:text-primary">
        <Link href="/login">Log in</Link>
      </Button>
      <Button variant="surface" shape="rounded" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </>
  )
}

export default ButtonNav
