import Link from 'next/link'

import { signIn } from '@lib/actions/auth'
import { auth } from '@lib/auth'
import { Button } from '@mindfulyze/ui'

export async function ButtonNav() {
  const session = await auth()

  return session ? (
    <Button asChild variant="surface" shape="rounded">
      <Link href="/home">Dashboard</Link>
    </Button>
  ) : (
    <form action={signIn}>
      <Button variant="link" shape="rounded" className="text-foreground hover:text-primary" type="submit">
        Log in
      </Button>
      <Button variant="surface" shape="rounded" type="submit">
        <Link href="/signup">Sign Up</Link>
      </Button>
    </form>
  )
}

export default ButtonNav
